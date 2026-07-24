import Anthropic from '@anthropic-ai/sdk'
import type { AIConfig, ChatMessage } from '../types'
import { PRESET_THEORIES } from '../data/theories'

// ============ 咪儿 System Prompt ============

const SYSTEM_PROMPT = `你是「慧咪」，一只帮人做决策的猫。你不是冷冰冰的 AI 顾问——你是一只会认真听、慢慢问、最后轻声说出建议的猫。

## 你的性格
- 温暖、好奇、不评判。像朋友聊天，不像专家诊断。
- 口语化中文，偶用「喵」「咪儿觉得…」「唔…」，但别每句都喵。
- 不要学术术语。沉没成本→"已经搭进去的"，认知偏误→"脑子容易偷懒"。
- 短句为主，每次 2-4 句。别长篇大论。

## 你的工作方式
1. **听 + 共情**：用户说了困境，先表示你听到了，再确认理解对不对。
2. **问诊**：像医生一样了解会影响建议的具体事实。时间线？涉及到谁？有什么硬约束？最坏能接受什么？别一口气问太多，每次 1-2 个问题。
3. **搜索理论**：了解基本情况后，用 search_theories 工具从理论库里找跟这个困境相关的决策原则。别凭记忆瞎猜。
4. **情景探测**：找到相关理论后，挑 1-2 条最相关的，用 generate_scenario 生成具体情景让用户选。每次只发一个 scenario，等用户选完再继续。
5. **分析**：信息够了，用 generate_analysis 给出结构化建议。用户选了 scenario 之后要解读他的选择——"你选了这个，说明你其实…"

## 重要
- 先 search_theories 再 generate_scenario，别跳过搜索直接编情景
- 不要在聊天里说"我帮你搜一下"之类的元对话，直接用工具
- 保持猫的温度。你不是权威，你是一只想帮忙的猫。`

// ============ Tool Definitions ============

const TOOLS = [
  {
    name: 'search_theories',
    description: '从252条决策理论库中搜索与用户困境最相关的理论。每次调用返回最匹配的几条。',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: { type: 'string' as const, description: '用户困境的关键词或简短描述，中文' },
        count: { type: 'number' as const, description: '返回数量，默认5' },
      },
      required: ['query'],
    },
  },
  {
    name: 'generate_scenario',
    description: '为一条理论生成微型情景题——给用户一个具体的选择来探测他的真实倾向。每次只发一个。',
    input_schema: {
      type: 'object' as const,
      properties: {
        theoryId: { type: 'string' as const, description: '理论的ID' },
        theoryContent: { type: 'string' as const, description: '理论全文' },
        dilemma: { type: 'string' as const, description: '用户的困境简述' },
      },
      required: ['theoryId', 'theoryContent', 'dilemma'],
    },
  },
  {
    name: 'generate_analysis',
    description: '信息收集够了，给用户一份结构化、可落地的决策分析和建议。',
    input_schema: {
      type: 'object' as const,
      properties: {
        summary: { type: 'string' as const, description: '一句话核心判断' },
        analysis: { type: 'string' as const, description: '2-3段个性化分析，结合用户的具体情况和探测结果，语气温暖如朋友' },
        actionItems: { type: 'array' as const, items: { type: 'string' as const }, description: '3-5条具体可执行的下一步' },
        counterpoint: { type: 'string' as const, description: '值得考虑的反面视角，1-2句话' },
      },
      required: ['summary', 'analysis', 'actionItems'],
    },
  },
]

// ============ Tool Implementation ============

function toolSearchTheories(query: string, count: number = 5) {
  const lower = query.toLowerCase()
  const scored = PRESET_THEORIES.map((t) => {
    let score = 0
    // Tag overlap
    for (const tag of t.tags) {
      if (lower.includes(tag) || tag.includes(lower)) score += 3
    }
    // Content match
    if (t.content.toLowerCase().includes(lower)) score += 2
    // Name match
    if (t.name && t.name.toLowerCase().includes(lower)) score += 2
    return { theory: t, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, count).filter((s) => s.score > 0).map((s) => ({
    id: s.theory.id,
    name: s.theory.name || s.theory.content.slice(0, 20),
    content: s.theory.content,
    domain: s.theory.domain,
    tags: s.theory.tags,
  }))
}

function toolGenerateScenario(theoryId: string, theoryContent: string, dilemma: string) {
  const theory = PRESET_THEORIES.find((t) => t.id === theoryId)
  if (!theory) return { error: '理论未找到' }

  // Generate 2 contrasting options based on the theory
  return {
    theoryId: theory.id,
    theoryName: theory.name || theory.content.slice(0, 20),
    theoryContent: theory.content,
    options: [
      { label: '选项A（偏认同该理论的方向）', value: 'agree' },
      { label: '选项B（偏不认同该理论的方向）', value: 'disagree' },
    ],
    // Instruction for the AI to write the actual scenario text
    instruction: `请基于理论「${theory.content}」和困境「${dilemma}」，用口语化的中文写一段2-3句的情景，然后给出两个具体的选项。`,
  }
}

function toolGenerateAnalysis(params: {
  summary: string
  analysis: string
  actionItems: string[]
  counterpoint?: string
}) {
  return {
    type: 'analysis',
    ...params,
  }
}

// ============ Agent Loop with Tool Calling ============

export interface AgentEvent {
  type: 'text' | 'scenario' | 'analysis' | 'done' | 'error'
  text?: string
  scenario?: {
    situation: string
    options: { label: string; value: string }[]
    theoryName: string
    theoryId: string
    theoryContent: string
  }
  analysis?: {
    summary: string
    analysis: string
    actionItems: string[]
    counterpoint?: string
  }
  error?: string
}

export async function runAgentLoop(params: {
  config: AIConfig
  messages: ChatMessage[]
  onEvent: (event: AgentEvent) => void
}): Promise<void> {
  const { config, messages, onEvent } = params

  if (config.provider === 'deepseek') {
    // DeepSeek doesn't support native tool calling — fallback to simple streaming
    await streamDeepSeekSimple(config, messages, onEvent)
    return
  }

  // Claude with tool calling
  await claudeAgentLoop(config, messages, onEvent)
}

async function claudeAgentLoop(
  config: AIConfig,
  messages: ChatMessage[],
  onEvent: (event: AgentEvent) => void
) {
  const anthropic = new Anthropic({
    apiKey: config.apiKey,
    dangerouslyAllowBrowser: true,
  })

  // Convert to Anthropic format
  const anthropicMessages: { role: 'user' | 'assistant'; content: Anthropic.ContentBlockParam[] }[] = []

  for (const msg of messages) {
    if (msg.role === 'user') {
      anthropicMessages.push({
        role: 'user',
        content: [{ type: 'text', text: msg.content }],
      })
    } else {
      // Parse assistant messages — they may contain scenario/analysis markers
      anthropicMessages.push({
        role: 'assistant',
        content: [{ type: 'text', text: msg.content }],
      })
    }
  }

  // Max tool-calling rounds to prevent infinite loops
  const MAX_ROUNDS = 5

  async function runRound(
    msgs: { role: 'user' | 'assistant'; content: Anthropic.ContentBlockParam[] }[],
    round: number
  ): Promise<void> {
    if (round > MAX_ROUNDS) {
      onEvent({ type: 'error', error: '推理轮次过多，请刷新重试' })
      return
    }

    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      tools: TOOLS,
      messages: msgs,
    })

    // Collect content blocks as they arrive
    let textBlock = ''
    const toolUseBlocks: { id: string; name: string; input: string }[] = []
    let currentToolId = ''
    let currentToolName = ''
    let currentToolInput = ''

    for await (const event of stream) {
      switch (event.type) {
        case 'content_block_start':
          if (event.content_block.type === 'text') {
            textBlock = ''
          } else if (event.content_block.type === 'tool_use') {
            currentToolId = event.content_block.id
            currentToolName = event.content_block.name
            currentToolInput = ''
          }
          break

        case 'content_block_delta':
          if (event.delta.type === 'text_delta') {
            textBlock += event.delta.text
            onEvent({ type: 'text', text: event.delta.text })
          } else if (event.delta.type === 'input_json_delta') {
            currentToolInput += event.delta.partial_json
          }
          break

        case 'content_block_stop':
          if (currentToolId) {
            toolUseBlocks.push({
              id: currentToolId,
              name: currentToolName,
              input: currentToolInput,
            })
            currentToolId = ''
            currentToolName = ''
            currentToolInput = ''
          }
          break
      }
    }

    // Get final message for stop_reason
    const finalMsg = await stream.finalMessage()

    // If AI used tools, execute them
    if (toolUseBlocks.length > 0) {
      const toolResults: Anthropic.ToolResultBlockParam[] = []

      for (const tool of toolUseBlocks) {
        let input: Record<string, unknown> = {}
        try { input = JSON.parse(tool.input) } catch { /* keep empty */ }

        if (tool.name === 'search_theories') {
          const results = toolSearchTheories(input.query as string, (input.count as number) || 5)
          toolResults.push({
            type: 'tool_result',
            tool_use_id: tool.id,
            content: JSON.stringify(results),
          })
        } else if (tool.name === 'generate_scenario') {
          // Return a marker that the frontend will render as a scenario card
          const scenario = toolGenerateScenario(
            input.theoryId as string,
            input.theoryContent as string,
            input.dilemma as string
          )
          // Tell the AI to write the actual scenario text in its next response
          const prompt = `用户需要你做一道情景探测题。基于理论「${scenario.theoryContent}」，给用户出一个微型情景——2-3句话描述一个跟ta困境相关的具体场景，然后给出 [{ "label": "...", "value": "a" }, { "label": "...", "value": "b" }] 两个选项。\n\n在文本回复中用 <scenario name="${scenario.theoryName}" id="${scenario.theoryId}"> 包裹情景描述和选项JSON。用户会看到选项卡片并作出选择。`
          toolResults.push({
            type: 'tool_result',
            tool_use_id: tool.id,
            content: prompt,
          })
        } else if (tool.name === 'generate_analysis') {
          const analysis = toolGenerateAnalysis(input as Parameters<typeof toolGenerateAnalysis>[0])
          toolResults.push({
            type: 'tool_result',
            tool_use_id: tool.id,
            content: JSON.stringify(analysis),
          })
          // Also emit the analysis event
          onEvent({
            type: 'analysis',
            analysis: {
              summary: input.summary as string,
              analysis: input.analysis as string,
              actionItems: input.actionItems as string[],
              counterpoint: input.counterpoint as string,
            },
          })
        }
      }

      // Add assistant tool_use + tool results to messages
      const assistantBlock: Anthropic.ContentBlockParam[] = []
      for (const tool of toolUseBlocks) {
        assistantBlock.push({
          type: 'tool_use',
          id: tool.id,
          name: tool.name,
          input: JSON.parse(tool.input) as Record<string, unknown>,
        })
      }

      msgs.push({ role: 'assistant', content: assistantBlock })
      msgs.push({ role: 'user', content: toolResults })

      // Continue the loop
      await runRound(msgs, round + 1)
    }
  }

  await runRound(anthropicMessages, 1)
}

// ============ DeepSeek Fallback (no tool calling) ============

async function streamDeepSeekSimple(
  config: AIConfig,
  messages: ChatMessage[],
  onEvent: (event: AgentEvent) => void
) {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 2048,
      temperature: 0.7,
      stream: true,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: { message?: string } })?.error?.message || `DeepSeek API 错误 (${response.status})`)
  }

  const reader = response.body?.getReader()
  if (!reader) throw new Error('无法读取流式响应')

  const decoder = new TextDecoder()
  let buffer = ''
  let fullText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || !trimmed.startsWith('data: ')) continue
      const data = trimmed.slice(6)
      if (data === '[DONE]') continue
      try {
        const parsed = JSON.parse(data)
        const content = parsed.choices?.[0]?.delta?.content
        if (content) {
          fullText += content
          onEvent({ type: 'text', text: content })
        }
      } catch { /* skip */ }
    }
  }
}
