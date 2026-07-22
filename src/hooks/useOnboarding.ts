import { useCallback } from 'react'
import { useAppContext } from './useAppContext'
import { ONBOARDING_TOTAL } from '../constants/config'
import { ONBOARDING_THEORIES } from '../data/theories'

export function useOnboarding() {
  const { state, dispatch, rateTheory } = useAppContext()
  const { onboardingIndex } = state.ui
  const { userRatings } = state.theories

  // Use the 10 onboarding theories, shuffled
  const theories = ONBOARDING_THEORIES
  const currentTheory = theories[onboardingIndex] || null
  const progress = theories.length > 0 ? onboardingIndex / theories.length : 0
  const ratedCount = Object.keys(userRatings).length
  const isComplete = onboardingIndex >= ONBOARDING_THEORIES.length

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

  // Rate without advancing (for batch operations like 交卷)
  const rateOnly = useCallback(
    (theoryId: string, score: number) => {
      rateTheory(theoryId, score)
    },
    [rateTheory]
  )

  // Rate and auto-advance
  const rateAndNext = useCallback(
    (theoryId: string, score: number) => {
      rateTheory(theoryId, score)
      setTimeout(() => {
        // Use functional dispatch pattern? No, we need current state.
        // The setTimeout closure uses stale onboardingIndex... but that's OK here
        // because each rating is a single user action, not a batch.
        // For the final question, jump to ONBOARDING_TOTAL
        dispatch({
          type: 'SET_ONBOARDING_INDEX',
          payload: onboardingIndex < ONBOARDING_TOTAL - 1
            ? onboardingIndex + 1
            : ONBOARDING_TOTAL,
        })
      }, 350)
    },
    [rateTheory, onboardingIndex, dispatch]
  )

  const skipAndNext = useCallback(
    (theoryId: string) => {
      rateAndNext(theoryId, 3)
    },
    [rateAndNext]
  )

  const complete = useCallback(() => {
    dispatch({ type: 'COMPLETE_ONBOARDING' })
  }, [dispatch])

  return {
    currentTheory,
    progress,
    ratedCount,
    isComplete,
    onboardingIndex,
    goToIndex,
    next,
    prev,
    rateOnly,
    rateAndNext,
    skipAndNext,
    complete,
  }
}
