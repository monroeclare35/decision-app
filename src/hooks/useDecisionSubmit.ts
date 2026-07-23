import { useState } from 'react'
import { useAppContext } from './useAppContext'
import { generateDecisionAdvice, generateProbeScenarios } from '../services/ai'
import { buildSystemPrompt, buildAdvicePromptWithScenarios } from '../services/promptTemplates'
import {
  matchTheories,
  formatTheoriesForPrompt,
} from '../services/theoryMatcher'
import { PROBE_SCENARIO_COUNT } from '../constants/config'
import type { Category, ProbeScenario, DecisionProbeState } from '../types'

export function useDecisionSubmit() {
  const { state, saveDecision, showToast, setProbeState, clearProbeState } = useAppContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Step 1: Generate probe scenarios and navigate to probing page
  const submitDilemma = async (description: string, category: Category): Promise<boolean> => {
    const { apiKey, provider } = state.settings
    if (!apiKey) {
      setError('请先在设置页面填写 API Key')
      showToast('请先设置 API Key', 'error')
      return false
    }

    if (!description.trim()) {
      setError('请描述你的决策困境')
      return false
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Build a condensed theory summary for the AI
      const theories = state.theories.library
      const theoriesSummary = theories
        .slice(0, 50) // Send top 50 to avoid overwhelming the prompt
        .map((t) => `[${t.id}] ${t.content} (领域: ${t.domain})`)
        .join('\n')

      const probeScenarios = await generateProbeScenarios({
        config: { provider, apiKey },
        dilemma: description,
        category,
        theoriesSummary,
        count: PROBE_SCENARIO_COUNT,
      })

      // Create probe state
      const probeState: DecisionProbeState = {
        phase: 'probing',
        probeScenarios,
        followUpScenarios: [],
        scenarioAnswers: [],
        currentIndex: 0,
        dilemma: description,
        category,
      }

      setProbeState(probeState)
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : '生成探测情景失败，请重试'
      setError(message)
      showToast(message, 'error')
    } finally {
      setIsSubmitting(false)
    }
    return false
  }

  // Step 2: Submit final analysis after all probing is complete
  const submitFinalAnalysis = async (): Promise<string | undefined> => {
    const probeState = state.probing.currentState
    if (!probeState) {
      setError('探测状态丢失，请重新开始')
      return
    }

    const { apiKey, provider } = state.settings
    if (!apiKey) {
      setError('请先在设置页面填写 API Key')
      showToast('请先设置 API Key', 'error')
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
        probeState.category,
        probeState.dilemma,
        beliefs
      )

      const theoriesSection = formatTheoriesForPrompt(
        topTheories,
        neutralTheories,
        contradictionTheories
      )

      // Build knowledge section
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

      // Build scenario answers section
      const allAnswers = [
        ...probeState.scenarioAnswers.filter((a) => a.phase === 'probing'),
        ...probeState.scenarioAnswers.filter((a) => a.phase === 'followup'),
      ]

      const scenarioAnswersSection = allAnswers
        .map((a) => {
          const allScenarios = [...probeState.probeScenarios, ...probeState.followUpScenarios]
          const scenario = allScenarios.find((s) => s.id === a.scenarioId)
          const phaseLabel = a.phase === 'probing' ? '第一轮探测' : '深化追问'
          const optionLabel = scenario?.options.find((o) => o.value === a.selectedOption)?.label || '跳过'
          return `[${phaseLabel}] 情景：${scenario?.situation || ''}\n选择：${optionLabel}\n关联理论：${scenario?.theoryContent || ''}`
        })
        .join('\n\n')

      // Build prompts
      const allBeliefs = [...beliefs, ...beliefsFromKnowledge]
      const systemPrompt = buildSystemPrompt(allBeliefs)
      const userPrompt = buildAdvicePromptWithScenarios({
        decisionText: probeState.dilemma,
        category: probeState.category,
        theoriesSection,
        beliefs: allBeliefs,
        knowledgeSection: otherItems.length > 0 ? knowledgeSection : undefined,
        scenarioAnswersSection: scenarioAnswersSection || '（用户跳过了情景探测）',
      })

      // Call AI
      const result = await generateDecisionAdvice({
        config: { provider, apiKey },
        systemPrompt,
        userPrompt,
      })

      // Save and clean up
      const decisionId = saveDecision(probeState.dilemma, result, probeState.category)
      clearProbeState()
      return decisionId
    } catch (err) {
      const message = err instanceof Error ? err.message : '分析失败，请重试'
      setError(message)
      showToast(message, 'error')
    } finally {
      setIsSubmitting(false)
    }
    return undefined
  }

  return {
    submitDilemma,
    submitFinalAnalysis,
    isSubmitting,
    error,
    clearError: () => setError(null),
  }
}
