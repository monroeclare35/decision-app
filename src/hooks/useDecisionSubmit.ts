import { useState } from 'react'
import { useAppContext } from './useAppContext'
import { generateDecisionAdvice } from '../services/ai'
import { buildSystemPrompt, buildAdvicePrompt } from '../services/promptTemplates'
import {
  matchTheories,
  formatTheoriesForPrompt,
} from '../services/theoryMatcher'
import type { Category } from '../types'

export function useDecisionSubmit() {
  const { state, saveDecision, showToast } = useAppContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (description: string, category: Category): Promise<string | undefined> => {
    const { apiKey, provider } = state.settings
    if (!apiKey) {
      setError('请先在设置页面填写 API Key')
      showToast('请先设置 API Key', 'error')
      return
    }

    if (!description.trim()) {
      setError('请描述你的决策困境')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const beliefs = state.user.profile?.beliefs || []
      const theories = state.theories.library
      const ratings = state.theories.userRatings

      // Match theories
      const { topTheories, neutralTheories, contradictionTheories } = matchTheories(
        theories,
        ratings,
        category,
        description,
        beliefs
      )

      const theoriesSection = formatTheoriesForPrompt(
        topTheories,
        neutralTheories,
        contradictionTheories
      )

      // Build knowledge section for prompt
      const knowledgeItems = state.knowledge
      const beliefItems = knowledgeItems.filter((k) => k.type === 'belief')
      const otherItems = knowledgeItems.filter((k) => k.type !== 'belief')
      const beliefsFromKnowledge = beliefItems.map((k) => k.content)

      let knowledgeSection = ''
      if (otherItems.length > 0) {
        knowledgeSection = '\n## 用户知识库收藏\n' +
          otherItems.map((k) =>
            `- [${k.type === 'quote' ? '金句' : '文章'}] ${k.content.slice(0, 150)}${k.tags.length ? ' | 标签: ' + k.tags.join(', ') : ''}`
          ).join('\n')
      }

      // Build prompts
      const allBeliefs = [...beliefs, ...beliefsFromKnowledge]
      const systemPrompt = buildSystemPrompt(allBeliefs)
      const userPrompt = buildAdvicePrompt({
        decisionText: description,
        category,
        theoriesSection,
        beliefs: allBeliefs,
        knowledgeSection: otherItems.length > 0 ? knowledgeSection : undefined,
      })

      // Call AI
      const result = await generateDecisionAdvice({
        config: { provider, apiKey },
        systemPrompt,
        userPrompt,
      })

      // Save and get the decision ID
      const decisionId = saveDecision(description, result, category)
      return decisionId
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '未知错误，请重试'
      setError(message)
      showToast(message, 'error')
    } finally {
      setIsSubmitting(false)
    }
    return undefined
  }

  return { submit, isSubmitting, error, clearError: () => setError(null) }
}
