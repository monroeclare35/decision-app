import type { Category } from '../types'
import { CATEGORY_LABELS } from '../types'

export function buildSystemPrompt(beliefs: string[]): string {
  const beliefSection =
    beliefs.length > 0
      ? `\n\n用户的核心信念（必须在所有分析中融入）：\n${beliefs.map((b) => `- ${b}`).join('\n')}`
      : ''

  return `你是一位深思熟虑的决策顾问。你的任务是根据用户提供的决策困境，结合用户已经评分的理论体系和个人核心信念，给出个性化、结构化的建议。

## 重要原则

1. 用户对不同理论有 0-5 的评分。评分 4-5 的理论是用户高度认同的，应作为决策的主要依据。评分 0-1 的理论是用户不认同的，可以作为反面视角提供对照参考。
2. 不同理论之间可能存在矛盾（例如"冒险才有回报" vs "稳扎稳打"），你必须根据用户的评分来决定哪种哲学占主导地位。
3. 用户的核心信念是绝对的，必须融入所有分析中——即使某些理论与此信念冲突，也要以核心信念为优先。
4. 给出具体、可操作的建议，而非抽象的说教。
5. 始终保持尊重、温暖的语气。你不是在评判用户的决策，而是在帮助他们理清思路。
6. 全部回复使用中文。${beliefSection}

## 回复格式

请严格按照以下 JSON 格式返回你的分析：

\`\`\`json
{
  "matchedTheories": [
    {
      "theoryId": "理论的简短名称",
      "content": "理论原文",
      "userRating": 5,
      "relevance": "为什么这个理论适用于当前决策（1-2句话）",
      "weight": 0.8
    }
  ],
  "personalizedAnalysis": "2-3 段的个人化分析，融合用户的理论偏好和核心信念，给出具体的思考方向和建议。语气温暖如朋友对话。使用 Markdown 格式。",
  "counterpoint": "从用户不太认同的理论角度，提供一个值得考虑的反面视角。如果这次反面视角确实不太适用，请诚实说明。",
  "actionItems": ["具体可执行的下一步行动1", "行动2", "行动3"],
  "similarCases": [
    {
      "scenario": "一个与当前困境结构相似的假设场景",
      "outcome": "不同决策路径可能导致的结果",
      "appliedTheories": ["分散投资", "损失厌恶"]
    }
  ],
  "beliefReflections": [
    {
      "belief": "用户的核心信念原文",
      "influence": "这个信念如何影响了本次决策分析"
    }
  ],
  "matchedKnowledge": [
    {
      "itemId": "收藏条目ID或标题",
      "content": "收藏内容摘要",
      "type": "quote或article",
      "relevance": "为什么这个收藏与当前决策相关"
    }
  ]
}
\`\`\`

确保 JSON 有效且完整。personalizedAnalysis 和 counterpoint 使用中文，至少 150 字。`
}

export function buildAdvicePrompt(params: {
  decisionText: string
  category: Category
  theoriesSection: string
  beliefs: string[]
  knowledgeSection?: string
}): string {
  const categoryLabel = CATEGORY_LABELS[params.category]

  return `## 决策困境
**类别**：${categoryLabel}
**描述**：${params.decisionText}

${params.theoriesSection}

${params.beliefs.length > 0 ? `## 用户核心信念\n${params.beliefs.map((b) => `- ${b}`).join('\n')}` : '## 用户核心信念\n（用户暂未设置核心信念）'}

${params.knowledgeSection || ''}

## 任务
请仔细分析这个决策困境，综合考虑用户的理论偏好、核心信念${params.knowledgeSection ? '和知识库收藏' : ''}，给出个性化的决策建议。${params.knowledgeSection ? '如果用户的知识库收藏中有与当前困境相关的，在matchedKnowledge中引用它们。' : ''}请严格按照 JSON 格式返回。`
}
