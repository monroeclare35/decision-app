// ============ Domain & Category ============

export type Domain =
  | 'finance'
  | 'psychology'
  | 'folk'
  | 'decision_science'
  | 'sociology'
  | 'behavioral'
  | 'meme'

export type Category = 'emotional' | 'financial' | 'meal' | 'outfit' | 'general'

export const DOMAIN_LABELS: Record<Domain, string> = {
  finance: '理财',
  psychology: '心理学',
  folk: '民间智慧',
  decision_science: '决策学',
  sociology: '社会学',
  behavioral: '行为学',
  meme: '网络智慧',
}

export const CATEGORY_LABELS: Record<Category, string> = {
  emotional: '情感决策',
  financial: '理财决策',
  meal: '吃饭决策',
  outfit: '穿搭决策',
  general: '通用决策',
}

export const CATEGORY_ICONS: Record<Category, string> = {
  emotional: '💗',
  financial: '💰',
  meal: '🍜',
  outfit: '👔',
  general: '🤔',
}

// ============ Theory ============

export interface Theory {
  id: string
  content: string
  domain: Domain
  tags: string[]
  source: 'preset' | 'ai' | 'user'
  createdAt?: string
}

// ============ User ============

export interface UserProfile {
  ratings: Record<string, number> // theoryId -> 0-5
  beliefs: string[]
  completedOnboarding: boolean
  createdAt: string
}

// ============ Decision ============

export interface MatchedTheory {
  theoryId: string
  content: string
  userRating: number
  relevance: string
  weight: number
}

export interface SimilarCase {
  scenario: string
  outcome: string
  appliedTheories: string[]
}

export interface BeliefReflection {
  belief: string
  influence: string
}

export interface DecisionResult {
  matchedTheories: MatchedTheory[]
  personalizedAnalysis: string
  counterpoint: string
  actionItems: string[]
  similarCases: SimilarCase[]
  beliefReflections: BeliefReflection[]
}

export interface Decision {
  id: string
  description: string
  category: Category
  result: DecisionResult
  createdAt: string
}

export interface DecisionDraft {
  description: string
  category: Category
}

// ============ App State ============

export interface ToastMessage {
  id: string
  text: string
  type: 'success' | 'error' | 'info'
}

export interface AppState {
  user: {
    profile: UserProfile | null
  }
  theories: {
    library: Theory[]
    userRatings: Record<string, number>
  }
  decisions: {
    history: Decision[]
    currentDraft: DecisionDraft | null
    currentResult: DecisionResult | null
  }
  settings: {
    provider: AIProvider
    apiKey: string
  }
  ui: {
    isLoading: boolean
    error: string | null
    onboardingIndex: number
    toast: ToastMessage | null
  }
}

// ============ API ============

export type AIProvider = 'claude' | 'deepseek'

export interface AIConfig {
  provider: AIProvider
  apiKey: string
}
