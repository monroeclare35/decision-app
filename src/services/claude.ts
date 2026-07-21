import Anthropic from '@anthropic-ai/sdk'
import type { DecisionResult } from '../types'

let client: Anthropic | null = null

function getClient(apiKey: string): Anthropic {
  if (!client || (client as unknown as { apiKey: string }).apiKey !== apiKey) {
    client = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true, // MVP — frontend-only
    })
  }
  return client
}

export async function generateDecisionAdvice(params: {
  apiKey: string
  systemPrompt: string
  userPrompt: string
}): Promise<DecisionResult> {
  const anthropic = getClient(params.apiKey)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    temperature: 0.7,
    system: params.systemPrompt,
    messages: [{ role: 'user', content: params.userPrompt }],
  })

  const text = (response.content[0] as { type: 'text'; text: string }).text
  return parseResponse(text)
}

function parseResponse(text: string): DecisionResult {
  // Try to extract JSON from the response
  // Claude may wrap it in markdown code fences
  let jsonStr = text

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
    // If JSON parsing fails, treat the whole response as analysis
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
