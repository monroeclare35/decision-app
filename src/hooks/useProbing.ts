import { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from './useAppContext'
import { generateFollowUpScenarios } from '../services/ai'
import { PROBE_SCENARIO_COUNT, FOLLOW_UP_COUNT } from '../constants/config'
import type { ProbeScenario, ScenarioAnswer, Category } from '../types'

export function useProbing() {
  const navigate = useNavigate()
  const { state, recordScenarioAnswer, setProbeState, advanceProbeIndex, clearProbeState, showToast } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const probeState = state.probing.currentState

  // Current scenario based on phase and index
  const currentScenario = useMemo(() => {
    if (!probeState) return null
    const { phase, probeScenarios, followUpScenarios, currentIndex } = probeState
    const scenarios = phase === 'probing' ? probeScenarios : followUpScenarios
    return scenarios[currentIndex] || null
  }, [probeState])

  const totalScenarios = useMemo(() => {
    if (!probeState) return 0
    return probeState.phase === 'probing'
      ? probeState.probeScenarios.length
      : probeState.followUpScenarios.length
  }, [probeState])

  const progress = useMemo(() => {
    if (!probeState || totalScenarios === 0) return 0
    return probeState.currentIndex / totalScenarios
  }, [probeState, totalScenarios])

  const currentPhase = probeState?.phase || 'probing'

  const answerCurrent = useCallback(
    (optionValue: string) => {
      if (!probeState || !currentScenario) return

      const answer: ScenarioAnswer = {
        scenarioId: currentScenario.id,
        selectedOption: optionValue,
        theoryId: currentScenario.theoryId,
        phase: probeState.phase as 'probing' | 'followup',
        timestamp: new Date().toISOString(),
      }
      recordScenarioAnswer(answer)

      const nextIndex = probeState.currentIndex + 1
      const scenarios = probeState.phase === 'probing'
        ? probeState.probeScenarios
        : probeState.followUpScenarios

      if (nextIndex < scenarios.length) {
        advanceProbeIndex(nextIndex)
      } else if (probeState.phase === 'probing') {
        // All probe scenarios done → start follow-up with the just-recorded answer included
        startFollowUp([...probeState.scenarioAnswers, answer])
      } else {
        // All follow-up scenarios done → mark complete
        setProbeState({ ...probeState, phase: 'complete', currentIndex: nextIndex })
      }
    },
    [probeState, currentScenario, recordScenarioAnswer, advanceProbeIndex]
  )

  const skipCurrent = useCallback(() => {
    if (!probeState || !currentScenario) return

    const answer: ScenarioAnswer = {
      scenarioId: currentScenario.id,
      selectedOption: 'skipped',
      theoryId: '',
      phase: probeState.phase as 'probing' | 'followup',
      timestamp: new Date().toISOString(),
    }
    recordScenarioAnswer(answer)

    const nextIndex = probeState.currentIndex + 1
    const scenarios = probeState.phase === 'probing'
      ? probeState.probeScenarios
      : probeState.followUpScenarios

    if (nextIndex < scenarios.length) {
      advanceProbeIndex(nextIndex)
    } else if (probeState.phase === 'probing') {
      startFollowUp([...probeState.scenarioAnswers, answer])
    } else {
      setProbeState({ ...probeState, phase: 'complete', currentIndex: nextIndex })
    }
  }, [probeState, currentScenario, recordScenarioAnswer, advanceProbeIndex])

  const startFollowUp = useCallback(async (allAnswers: ScenarioAnswer[]) => {
    if (!probeState) return
    const { apiKey, provider } = state.settings
    if (!apiKey) return

    setIsLoading(true)
    setError(null)

    try {
      // Build a summary of answers for the AI
      const answerSummary = allAnswers
        .filter((a) => a.phase === 'probing')
        .map((a) => {
          const scenario = probeState.probeScenarios.find((s) => s.id === a.scenarioId)
          const optionLabel = scenario?.options.find((o) => o.value === a.selectedOption)?.label || '跳过'
          return `情景：${scenario?.situation || ''}\n选择了：${optionLabel}\n关联理论：${scenario?.theoryContent || ''}`
        })
        .join('\n\n')

      const followUpScenarios = await generateFollowUpScenarios({
        config: { provider, apiKey },
        dilemma: probeState.dilemma,
        category: probeState.category,
        previousAnswers: answerSummary,
        count: FOLLOW_UP_COUNT,
      })

      setProbeState({
        ...probeState,
        phase: 'followup',
        followUpScenarios,
        scenarioAnswers: allAnswers,
        currentIndex: 0,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : '生成追问失败'
      setError(message)
      showToast(message, 'error')
    } finally {
      setIsLoading(false)
    }
  }, [probeState, state.settings])

  const submitFinal = useCallback(async (): Promise<string | undefined> => {
    // This is called by ProbingPage after Phase C completes.
    // The actual submission will be handled via useDecisionSubmit in ProbingPage.
    // This method is a bridge for tracking loading state.
    return undefined
  }, [])

  return {
    probeState,
    currentScenario,
    currentPhase,
    totalScenarios,
    progress,
    isLoading,
    error,
    answerCurrent,
    skipCurrent,
    submitFinal,
  }
}
