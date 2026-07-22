import type { AppState, Theory, Decision, DecisionResult, DecisionDraft, UserProfile, ToastMessage } from '../types'

export type AppAction =
  // User
  | { type: 'SET_USER_PROFILE'; payload: UserProfile }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'ADD_BELIEF'; payload: string }
  | { type: 'REMOVE_BELIEF'; payload: number }
  | { type: 'UPDATE_BELIEF'; payload: { index: number; text: string } }
  // Theories
  | { type: 'LOAD_THEORIES'; payload: Theory[] }
  | { type: 'RATE_THEORY'; payload: { theoryId: string; score: number } }
  | { type: 'ADD_CUSTOM_THEORY'; payload: Theory }
  | { type: 'REMOVE_CUSTOM_THEORY'; payload: string }
  // Decisions
  | { type: 'SET_DRAFT'; payload: DecisionDraft | null }
  | { type: 'SAVE_DECISION'; payload: Decision }
  | { type: 'SET_CURRENT_RESULT'; payload: DecisionResult | null }
  | { type: 'LOAD_HISTORY'; payload: Decision[] }
  | { type: 'DELETE_DECISION'; payload: string }
  // Settings
  | { type: 'SET_API_KEY'; payload: string }
  | { type: 'SET_PROVIDER'; payload: 'claude' | 'deepseek' }
  // UI
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ONBOARDING_INDEX'; payload: number }
  | { type: 'SHOW_TOAST'; payload: ToastMessage }
  | { type: 'DISMISS_TOAST' }

export const initialState: AppState = {
  user: {
    profile: null,
  },
  theories: {
    library: [],
    userRatings: {},
  },
  decisions: {
    history: [],
    currentDraft: null,
    currentResult: null,
  },
  settings: {
    provider: 'deepseek' as const,
    apiKey: '',
  },
  ui: {
    isLoading: false,
    error: null,
    onboardingIndex: 0,
    toast: null,
  },
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // --- User ---
    case 'SET_USER_PROFILE':
      return {
        ...state,
        user: { ...state.user, profile: action.payload },
      }

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ratings: state.user.profile?.ratings || {},
            beliefs: state.user.profile?.beliefs || [],
            completedOnboarding: true,
            createdAt: state.user.profile?.createdAt || new Date().toISOString(),
          },
        },
      }

    case 'ADD_BELIEF': {
      if (!state.user.profile) return state
      const beliefs = [...state.user.profile.beliefs, action.payload]
      return {
        ...state,
        user: {
          ...state.user,
          profile: { ...state.user.profile, beliefs },
        },
      }
    }

    case 'REMOVE_BELIEF': {
      if (!state.user.profile) return state
      const beliefs = state.user.profile.beliefs.filter((_, i) => i !== action.payload)
      return {
        ...state,
        user: {
          ...state.user,
          profile: { ...state.user.profile, beliefs },
        },
      }
    }

    case 'UPDATE_BELIEF': {
      if (!state.user.profile) return state
      const beliefs = state.user.profile.beliefs.map((b, i) =>
        i === action.payload.index ? action.payload.text : b
      )
      return {
        ...state,
        user: {
          ...state.user,
          profile: { ...state.user.profile, beliefs },
        },
      }
    }

    // --- Theories ---
    case 'LOAD_THEORIES':
      return {
        ...state,
        theories: { ...state.theories, library: action.payload },
      }

    case 'RATE_THEORY':
      return {
        ...state,
        theories: {
          ...state.theories,
          userRatings: {
            ...state.theories.userRatings,
            [action.payload.theoryId]: action.payload.score,
          },
        },
      }

    case 'ADD_CUSTOM_THEORY':
      return {
        ...state,
        theories: {
          ...state.theories,
          library: [...state.theories.library, action.payload],
        },
      }

    case 'REMOVE_CUSTOM_THEORY':
      return {
        ...state,
        theories: {
          ...state.theories,
          library: state.theories.library.filter((t) => t.id !== action.payload),
        },
      }

    // --- Decisions ---
    case 'SET_DRAFT':
      return {
        ...state,
        decisions: { ...state.decisions, currentDraft: action.payload },
      }

    case 'SAVE_DECISION':
      return {
        ...state,
        decisions: {
          ...state.decisions,
          history: [action.payload, ...state.decisions.history],
          currentResult: action.payload.result,
          currentDraft: null,
        },
      }

    case 'SET_CURRENT_RESULT':
      return {
        ...state,
        decisions: { ...state.decisions, currentResult: action.payload },
      }

    case 'LOAD_HISTORY':
      return {
        ...state,
        decisions: { ...state.decisions, history: action.payload },
      }

    case 'DELETE_DECISION':
      return {
        ...state,
        decisions: {
          ...state.decisions,
          history: state.decisions.history.filter((d) => d.id !== action.payload),
        },
      }

    // --- Settings ---
    case 'SET_API_KEY':
      return {
        ...state,
        settings: { ...state.settings, apiKey: action.payload },
      }

    case 'SET_PROVIDER':
      return {
        ...state,
        settings: { ...state.settings, provider: action.payload },
      }

    // --- UI ---
    case 'SET_LOADING':
      return {
        ...state,
        ui: { ...state.ui, isLoading: action.payload },
      }

    case 'SET_ERROR':
      return {
        ...state,
        ui: { ...state.ui, error: action.payload },
      }

    case 'SET_ONBOARDING_INDEX':
      return {
        ...state,
        ui: { ...state.ui, onboardingIndex: action.payload },
      }

    case 'SHOW_TOAST':
      return {
        ...state,
        ui: { ...state.ui, toast: action.payload },
      }

    case 'DISMISS_TOAST':
      return {
        ...state,
        ui: { ...state.ui, toast: null },
      }

    default:
      return state
  }
}
