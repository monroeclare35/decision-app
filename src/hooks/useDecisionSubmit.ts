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

      // Build prompts
      const systemPrompt = buildSystemPrompt(beliefs)
      const userPrompt = buildAdvicePrompt({
        decisionText: description,
        category,
        theoriesSection,
        beliefs,
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
