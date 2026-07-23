import { useCallback } from 'react'
import { useAppContext } from './useAppContext'
import { ONBOARDING_TOTAL } from '../constants/config'
import { ONBOARDING_SCENARIOS } from '../data/theories'

export function useOnboarding() {
  const { state, dispatch, recordScenarioAnswer } = useAppContext()
  const { onboardingIndex } = state.ui
  const { onboardingAnswers } = state.probing

  const scenarios = ONBOARDING_SCENARIOS
  const currentScenario = scenarios[onboardingIndex] || null
  const progress = scenarios.length > 0 ? onboardingIndex / scenarios.length : 0
  const answeredCount = onboardingAnswers.filter((a) => a.phase === 'onboarding').length
  const isComplete = onboardingIndex >= ONBOARDING_SCENARIOS.length

  const goToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, ONBOARDING_TOTAL))
      dispatch({ type: 'SET_ONBOARDING_INDEX', payload: clamped })
    },
    [dispatch]
  )

  const next = useCallback(() => {
    if (onboardingIndex < ONBOARDING_TOTAL) {
      dispatch({ type: 'SET_ONBOARDING_INDEX', payload: onboardingIndex + 1 })
    }
  }, [onboardingIndex, dispatch])

  const prev = useCallback(() => {
    if (onboardingIndex > 0) {
      dispatch({ type: 'SET_ONBOARDING_INDEX', payload: onboardingIndex - 1 })
    }
  }, [onboardingIndex, dispatch])

  // Record scenario answer and auto-advance
  const answerAndNext = useCallback(
    (scenarioId: string, optionValue: string) => {
      const scenario = ONBOARDING_SCENARIOS.find((s) => s.id === scenarioId)
      const theoryId = scenario?.theoryMapping[optionValue] || ''

      recordScenarioAnswer({
        scenarioId,
        selectedOption: optionValue,
        theoryId,
        phase: 'onboarding',
        timestamp: new Date().toISOString(),
      })

      setTimeout(() => {
        dispatch({
          type: 'SET_ONBOARDING_INDEX',
          payload: onboardingIndex < ONBOARDING_TOTAL - 1
            ? onboardingIndex + 1
            : ONBOARDING_TOTAL,
        })
      }, 350)
    },
    [recordScenarioAnswer, onboardingIndex, dispatch]
  )

  const skipAndNext = useCallback(
    (scenarioId: string) => {
      recordScenarioAnswer({
        scenarioId,
        selectedOption: 'skipped',
        theoryId: '',
        phase: 'onboarding',
        timestamp: new Date().toISOString(),
      })

      setTimeout(() => {
        dispatch({
          type: 'SET_ONBOARDING_INDEX',
          payload: onboardingIndex < ONBOARDING_TOTAL - 1
            ? onboardingIndex + 1
            : ONBOARDING_TOTAL,
        })
      }, 350)
    },
    [recordScenarioAnswer, onboardingIndex, dispatch]
  )

  const complete = useCallback(() => {
    dispatch({ type: 'COMPLETE_ONBOARDING' })
  }, [dispatch])

  return {
    currentScenario,
    progress,
    answeredCount,
    isComplete,
    onboardingIndex,
    goToIndex,
    next,
    prev,
    answerAndNext,
    skipAndNext,
    complete,
  }
}
