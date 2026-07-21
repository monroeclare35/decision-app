import Anthropic from '@anthropic-ai/sdk'
import type { DecisionResult } from '../types'

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
      personalizedAnalysis: parsed.personalizedAnalysis || '无法生成分析，请重试。',
      counterpoint: parsed.counterpoint || '',
      actionItems: parsed.actionItems || [],
      similarCases: parsed.similarCases || [],
      beliefReflections: parsed.beliefReflections || [],
    }
  } catch {
    return {
      matchedTheories: [],
      personalizedAnalysis: text,
      counterpoint: '',
      actionItems: [],
      similarCases: [],
      beliefReflections: [],
    }
  }
}
