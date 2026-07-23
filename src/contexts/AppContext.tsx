import React, { createContext, useReducer, useEffect, useCallback } from 'react'
import { appReducer, initialState } from './appReducer'
import type { AppAction } from './appReducer'
import type { AppState, UserProfile, Theory, Decision, DecisionResult, DecisionDraft, ToastMessage, AIProvider, KnowledgeItem, ScenarioAnswer, DecisionProbeState } from '../types'
import * as storage from '../services/storage'
import { STORAGE_KEYS } from '../constants/storage'
import { STORAGE_VERSION } from '../constants/config'
import { PRESET_THEORIES, ONBOARDING_SCENARIOS } from '../data/theories'

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  // Convenience methods
  rateTheory: (theoryId: string, score: number) => void
  addBelief: (text: string) => void
  removeBelief: (index: number) => void
  updateBelief: (index: number, text: string) => void
  saveDecision: (description: string, result: DecisionResult, category: DecisionDraft['category']) => string
  addKnowledge: (item: KnowledgeItem) => void
  removeKnowledge: (id: string) => void
  setApiKey: (key: string) => void
  setProvider: (provider: AIProvider) => void
  showToast: (text: string, type?: ToastMessage['type']) => void
  recordScenarioAnswer: (answer: ScenarioAnswer) => void
  setProbeState: (state: DecisionProbeState | null) => void
  advanceProbeIndex: (index: number) => void
  clearProbeState: () => void
}

export const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // --- Load persisted data on mount ---
  useEffect(() => {
    // Version check / migration
    const savedVersion = storage.get<number>(STORAGE_KEYS.VERSION, 0)
    if (savedVersion !== STORAGE_VERSION) {
      // Future: handle migrations here
      storage.set(STORAGE_KEYS.VERSION, STORAGE_VERSION)
    }

    // Load all 252 theories into the library (for decision matching)
    dispatch({ type: 'LOAD_THEORIES', payload: PRESET_THEORIES })

    // Load user ratings
    const ratings = storage.get<Record<string, number>>(STORAGE_KEYS.USER_RATINGS, {})
    for (const [theoryId, score] of Object.entries(ratings)) {
      dispatch({ type: 'RATE_THEORY', payload: { theoryId, score } })
    }

    // Load user profile
    const profile = storage.get<UserProfile | null>(STORAGE_KEYS.USER_PROFILE, null)
    if (profile) {
      dispatch({ type: 'SET_USER_PROFILE', payload: profile })
    }

    // Load decisions
    const decisions = storage.get<Decision[]>(STORAGE_KEYS.DECISIONS, [])
    dispatch({ type: 'LOAD_HISTORY', payload: decisions })

    // Load onboarding index
    const idx = storage.get<number>(STORAGE_KEYS.ONBOARDING_INDEX, 0)
    dispatch({ type: 'SET_ONBOARDING_INDEX', payload: idx })

    // Load API key
    const apiKey = storage.get<string>(STORAGE_KEYS.API_KEY, '')
    dispatch({ type: 'SET_API_KEY', payload: apiKey })

    // Load provider
    const provider = storage.get<AIProvider>('decision_app_provider', 'deepseek')
    dispatch({ type: 'SET_PROVIDER', payload: provider })

    // Load knowledge
    const knowledge = storage.get<KnowledgeItem[]>('decision_app_knowledge', [])
    dispatch({ type: 'LOAD_KNOWLEDGE', payload: knowledge })

    // Load probe state
    const probeState = storage.get<DecisionProbeState | null>(STORAGE_KEYS.PROBE_STATE, null)
    if (probeState) {
      dispatch({ type: 'SET_PROBE_STATE', payload: probeState })
    }

    // Load onboarding answers
    const onboardingAnswers = storage.get<ScenarioAnswer[]>(STORAGE_KEYS.ONBOARDING_ANSWERS, [])
    dispatch({ type: 'LOAD_ONBOARDING_ANSWERS', payload: onboardingAnswers })
  }, [])

  // --- Persist on change ---
  useEffect(() => {
    if (Object.keys(state.theories.userRatings).length > 0) {
      storage.set(STORAGE_KEYS.USER_RATINGS, state.theories.userRatings)
    }
  }, [state.theories.userRatings])

  useEffect(() => {
    if (state.user.profile) {
      storage.set(STORAGE_KEYS.USER_PROFILE, state.user.profile)
    }
  }, [state.user.profile])

  useEffect(() => {
    if (state.decisions.history.length > 0) {
      storage.set(STORAGE_KEYS.DECISIONS, state.decisions.history)
    }
  }, [state.decisions.history])

  useEffect(() => {
    storage.set(STORAGE_KEYS.ONBOARDING_INDEX, state.ui.onboardingIndex)
  }, [state.ui.onboardingIndex])

  useEffect(() => {
    storage.set(STORAGE_KEYS.API_KEY, state.settings.apiKey)
  }, [state.settings.apiKey])

  useEffect(() => {
    storage.set('decision_app_knowledge', state.knowledge)
  }, [state.knowledge])

  useEffect(() => {
    storage.set('decision_app_provider', state.settings.provider)
  }, [state.settings.provider])

  useEffect(() => {
    if (state.probing.currentState) {
      storage.set(STORAGE_KEYS.PROBE_STATE, state.probing.currentState)
    } else {
      storage.remove(STORAGE_KEYS.PROBE_STATE)
    }
  }, [state.probing.currentState])

  useEffect(() => {
    if (state.probing.onboardingAnswers.length > 0) {
      storage.set(STORAGE_KEYS.ONBOARDING_ANSWERS, state.probing.onboardingAnswers)
    }
  }, [state.probing.onboardingAnswers])

  // --- Convenience methods ---
  const rateTheory = useCallback(
    (theoryId: string, score: number) => {
      dispatch({ type: 'RATE_THEORY', payload: { theoryId, score } })
    },
    []
  )

  const addBelief = useCallback((text: string) => {
    if (!text.trim()) return
    dispatch({ type: 'ADD_BELIEF', payload: text.trim() })
  }, [])

  const removeBelief = useCallback((index: number) => {
    dispatch({ type: 'REMOVE_BELIEF', payload: index })
  }, [])

  const updateBelief = useCallback((index: number, text: string) => {
    if (!text.trim()) return
    dispatch({ type: 'UPDATE_BELIEF', payload: { index, text: text.trim() } })
  }, [])

  const saveDecision = useCallback(
    (description: string, result: DecisionResult, category: DecisionDraft['category']): string => {
      const decision: Decision = {
        id: `dec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        description,
        category,
        result,
        createdAt: new Date().toISOString(),
      }
      dispatch({ type: 'SAVE_DECISION', payload: decision })
      return decision.id
    },
    []
  )

  const addKnowledge = useCallback((item: KnowledgeItem) => {
    dispatch({ type: 'ADD_KNOWLEDGE', payload: item })
  }, [])

  const removeKnowledge = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_KNOWLEDGE', payload: id })
  }, [])

  const setApiKey = useCallback((key: string) => {
    dispatch({ type: 'SET_API_KEY', payload: key })
  }, [])

  const setProvider = useCallback((provider: AIProvider) => {
    dispatch({ type: 'SET_PROVIDER', payload: provider })
  }, [])

  const showToast = useCallback((text: string, type: ToastMessage['type'] = 'info') => {
    const toast: ToastMessage = {
      id: `toast_${Date.now()}`,
      text,
      type,
    }
    dispatch({ type: 'SHOW_TOAST', payload: toast })
    setTimeout(() => dispatch({ type: 'DISMISS_TOAST' }), 3000)
  }, [])

  const recordScenarioAnswer = useCallback((answer: ScenarioAnswer) => {
    dispatch({ type: 'RECORD_SCENARIO_ANSWER', payload: answer })
  }, [])

  const setProbeState = useCallback((probeState: DecisionProbeState | null) => {
    dispatch({ type: 'SET_PROBE_STATE', payload: probeState })
  }, [])

  const advanceProbeIndex = useCallback((index: number) => {
    dispatch({ type: 'ADVANCE_PROBE_INDEX', payload: index })
  }, [])

  const clearProbeState = useCallback(() => {
    dispatch({ type: 'CLEAR_PROBE_STATE' })
  }, [])

  const value: AppContextValue = {
    state,
    dispatch,
    rateTheory,
    addBelief,
    removeBelief,
    updateBelief,
    addKnowledge,
    removeKnowledge,
    saveDecision,
    setApiKey,
    setProvider,
    showToast,
    recordScenarioAnswer,
    setProbeState,
    advanceProbeIndex,
    clearProbeState,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
