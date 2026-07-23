import Anthropic from '@anthropic-ai/sdk'
import type { DecisionResult, ProbeScenario, Category } from '../types'

// ============ Types ============

export type AIProvider = 'claude' | 'deepseek'

export interface AIConfig {
  provider: AIProvider
  apiKey: string
}

interface AIParams {
  config: AIConfig
  systemPrompt: string
  userPrompt: string
}

// ============ Claude ============

async function callClaude(params: AIParams): Promise<string> {
  const anthropic = new Anthropic({
    apiKey: params.config.apiKey,
    dangerouslyAllowBrowser: true,
  })

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    temperature: 0.7,
    system: params.systemPrompt,
    messages: [{ role: 'user', content: params.userPrompt }],
  })

  return (response.content[0] as { type: 'text'; text: string }).text
}

// ============ DeepSeek ============

async function callDeepSeek(params: AIParams): Promise<string> {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.config.apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.userPrompt },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      (err as { error?: { message?: string } })?.error?.message ||
        `DeepSeek API 错误 (${response.status})`
    )
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

// ============ Unified API ============

export async function generateDecisionAdvice(params: AIParams): Promise<DecisionResult> {
  const { config } = params

  let text: string
  if (config.provider === 'deepseek') {
    text = await callDeepSeek(params)
  } else {
    text = await callClaude(params)
  }

  return parseResponse(text)
}

// ============ Article Summarization ============

export async function summarizeArticle(params: {
  config: { provider: string; apiKey: string }
  rawText: string
}): Promise<{ summary: string; tags: string[]; title: string }> {
  const prompt = `请阅读以下用户收藏的文章，然后做三件事：
1. 用2-3句话提炼核心要点（中文，保留精华，去掉废话）
2. 给出标题（简短）
3. 打3-5个标签（便于未来检索匹配）

文章内容：
${params.rawText.slice(0, 8000)}

直接返回JSON，不要markdown：
{"title": "标题", "summary": "2-3句核心要点", "tags": ["标签1", "标签2", "标签3"]}`

  let text: string
  if (params.config.provider === 'deepseek') {
    const r = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.config.apiKey}` },
      body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }], max_tokens: 500, temperature: 0.5 }),
    })
    const d = await r.json()
    text = d.choices?.[0]?.message?.content || ''
  } else {
    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const a = new Anthropic({ apiKey: params.config.apiKey, dangerouslyAllowBrowser: true })
    const r = await a.messages.create({ model: 'claude-sonnet-4-20250514', max_tokens: 500, temperature: 0.5, messages: [{ role: 'user', content: prompt }] })
    text = (r.content[0] as { type: 'text'; text: string }).text
  }

  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const j = m ? m[1] : text
  try {
    const p = JSON.parse(j.trim())
    return { summary: p.summary || '摘要生成失败', tags: p.tags || [], title: p.title || '未命名' }
  } catch { return { summary: text.slice(0, 500), tags: [], title: '未命名' } }
}

// ============ Theory Auto-Complete ============

interface TheoryCompletion {
  content: string
  domain: string
  tags: string[]
}

export async function autoCompleteTheory(params: {
  config: AIConfig
  concept: string
}): Promise<TheoryCompletion> {
  const prompt = `用户想添加一条决策理论，只提供了概念名："${params.concept}"

请根据这个概念，补齐这条理论。要求：
1. 用自然的、像是民间俗语/生活智慧的口吻表达，不要学术化、不说教、不"爹味"
2. 用口语化的中文，1-2句话即可
3. 判断它属于哪个领域（finance/psychology/folk/decision_science/sociology/behavioral/meme）
4. 给出3-5个相关标签

直接返回JSON，不要markdown：
{"content": "理论内容（口语化中文）", "domain": "领域", "tags": ["标签1", "标签2", "标签3"]}`

  let text: string
  if (params.config.provider === 'deepseek') {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.config.apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一个帮助用户把零散想法整理成决策理论的助手。回复简洁自然，有生活气息。只返回JSON。' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API 错误 (${response.status})`)
    }
    const data = await response.json()
    text = data.choices?.[0]?.message?.content || ''
  } else {
    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const anthropic = new Anthropic({
      apiKey: params.config.apiKey,
      dangerouslyAllowBrowser: true,
    })
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      temperature: 0.8,
      system: '你是一个帮助用户把零散想法整理成决策理论的助手。回复简洁自然，有生活气息。只返回JSON。',
      messages: [{ role: 'user', content: prompt }],
    })
    text = (response.content[0] as { type: 'text'; text: string }).text
  }

  // Parse JSON from response
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonStr = fenceMatch ? fenceMatch[1] : text

  try {
    const parsed = JSON.parse(jsonStr.trim())
    return {
      content: parsed.content || `关于"${params.concept}"的理论`,
      domain: parsed.domain || 'folk',
      tags: parsed.tags || [params.concept],
    }
  } catch {
    return {
      content: `关于"${params.concept}"的理论`,
      domain: 'folk',
      tags: [params.concept],
    }
  }
}

// ============ Probe Scenario Generation ============

export async function generateProbeScenarios(params: {
  config: AIConfig
  dilemma: string
  category: Category
  theoriesSummary: string
  count?: number
}): Promise<ProbeScenario[]> {
  const count = params.count || 8
  const prompt = `你是一位决策教练。用户面临一个具体的困境，你需要生成 ${count} 个微型情景来探测他的真实决策倾向。

## 用户困境
**描述**：${params.dilemma}

## 可选理论库
${params.theoriesSummary}

## 你的任务
从上述理论库中选出与用户困境最相关的 ${count} 条理论。对每条理论，编写一个：
1. 与用户困境紧密相关的微型情景（2-3句话，真实、具体，用"你"开头）
2. 2-3个选项，每个选项导向不同的理论倾向
3. 选项用口语化中文，不要太长

## 要点
- 情景要像真实发生在用户身上的
- 选项之间要有真正的张力——不是"正确"和"错误"的二分
- 每个选项应该暗示不同的理论倾向，但不要在选项中直接说理论名字
- 把理论内容放在 theoryContent 字段

## 返回格式
直接返回 JSON 数组（不要 markdown 代码块）：
[
  {
    "theoryId": "理论ID",
    "theoryContent": "理论原文",
    "situation": "情景描述",
    "options": [{"label": "选项1", "value": "opt_a"}, {"label": "选项2", "value": "opt_b"}]
  }
]
返回 ${count} 道情景，确保 JSON 有效。`

  let text: string
  if (params.config.provider === 'deepseek') {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.config.apiKey}` },
      body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }], max_tokens: 4096, temperature: 0.8 }),
    })
    if (!response.ok) throw new Error(`DeepSeek API 错误 (${response.status})`)
    const data = await response.json()
    text = data.choices?.[0]?.message?.content || ''
  } else {
    const anthropic = new Anthropic({ apiKey: params.config.apiKey, dangerouslyAllowBrowser: true })
    const response = await anthropic.messages.create({ model: 'claude-sonnet-4-20250514', max_tokens: 4096, temperature: 0.8, messages: [{ role: 'user', content: prompt }] })
    text = (response.content[0] as { type: 'text'; text: string }).text
  }

  return parseScenarioArray(text, count)
}

export async function generateFollowUpScenarios(params: {
  config: AIConfig
  dilemma: string
  category: Category
  previousAnswers: string
  count?: number
}): Promise<ProbeScenario[]> {
  const count = params.count || 5
  const prompt = `你是一位温暖而犀利的决策教练。用户刚刚完成了一轮情景探测——通过在不同情景下的选择，你已经对他的倾向有了初步了解。现在要进入更深的阶段：不再问"如果是你，你会怎么选"，而是直接问他本人。

## 用户困境
**描述**：${params.dilemma}

## 他在第一轮探测中的选择
${params.previousAnswers}

## 你的任务
你已经看到了他的选择。现在你需要问他 ${count} 个问题，目的是：
1. **了解他这个人**：不是测试他的原则，是理解他的处境、性格、恐惧和渴望
2. **追问矛盾背后的原因**：比如他在这边选了冒险、那边选了保守——这两面都是真实的他。不要评判，去理解。
3. **触碰困境的深层根源**：表面是"不知道怎么选"，底下可能是什么？是怕辜负谁？是不确定自己要什么？是缺乏安全感？

## 要求
- 直接对他提问，像朋友聊天一样，不要用情景假设
- 每个问题都应该是开放式的，引导他说更多
- 语气温暖、好奇、不评判

## 返回格式
直接返回 JSON 数组（不要 markdown）：
[
  {
    "theoryId": "followup_1",
    "theoryContent": "这个追问想了解的是什么（简短，10字以内）",
    "situation": "对他本人提出的问题（用你开头，像朋友聊天）",
    "options": [{"label": "选项1", "value": "opt_a"}, {"label": "选项2", "value": "opt_b"}]
  }
]
返回 ${count} 道追问，确保 JSON 有效。`

  let text: string
  if (params.config.provider === 'deepseek') {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${params.config.apiKey}` },
      body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }], max_tokens: 4096, temperature: 0.8 }),
    })
    if (!response.ok) throw new Error(`DeepSeek API 错误 (${response.status})`)
    const data = await response.json()
    text = data.choices?.[0]?.message?.content || ''
  } else {
    const anthropic = new Anthropic({ apiKey: params.config.apiKey, dangerouslyAllowBrowser: true })
    const response = await anthropic.messages.create({ model: 'claude-sonnet-4-20250514', max_tokens: 4096, temperature: 0.8, messages: [{ role: 'user', content: prompt }] })
    text = (response.content[0] as { type: 'text'; text: string }).text
  }

  return parseScenarioArray(text, count)
}

function parseScenarioArray(text: string, expectedCount: number): ProbeScenario[] {
  // Strip markdown fences
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonStr = fenceMatch ? fenceMatch[1] : text

  try {
    const arr = JSON.parse(jsonStr.trim())
    if (!Array.isArray(arr)) return []
    return arr.slice(0, expectedCount).map((item: Record<string, unknown>, i: number) => ({
      id: `probe_${Date.now()}_${i}`,
      theoryId: String(item.theoryId || ''),
      theoryContent: String(item.theoryContent || ''),
      situation: String(item.situation || ''),
      options: Array.isArray(item.options) ? item.options.map((o: Record<string, unknown>) => ({
        label: String(o.label || ''),
        value: String(o.value || ''),
      })) : [],
    }))
  } catch {
    return []
  }
}

// ============ Response Parser ============

function parseResponse(text: string): DecisionResult {
  let jsonStr = text

  // Extract JSON from markdown code fences
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenceMatch) {
    jsonStr = fenceMatch[1]
  }

  try {
    const parsed = JSON.parse(jsonStr.trim())
    return {
      matchedTheories: parsed.matchedTheories || [],
      matchedKnowledge: parsed.matchedKnowledge || [],
      personalizedAnalysis: parsed.personalizedAnalysis || '无法生成分析，请重试。',
      counterpoint: parsed.counterpoint || '',
      actionItems: parsed.actionItems || [],
      similarCases: parsed.similarCases || [],
      beliefReflections: parsed.beliefReflections || [],
    }
  } catch {
    return {
      matchedTheories: [],
      matchedKnowledge: [],
      personalizedAnalysis: text,
      counterpoint: '',
      actionItems: [],
      similarCases: [],
      beliefReflections: [],
    }
  }
}
