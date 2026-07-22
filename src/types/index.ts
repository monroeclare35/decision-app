// ============ Domain & Category ============

export type Domain =
  | 'relationships'   // 人际关系
  | 'career'           // 职场事业
  | 'family'           // 亲密家庭
  | 'growth'           // 成长校园
  | 'finance'          // 财富消费
  | 'productivity'     // 效率习惯
  | 'cognition'        // 心智认知
  | 'decision'         // 决策工具
  | 'health'           // 健康身心
  | 'philosophy'       // 生活哲学
  | 'wisdom'           // 处世智慧
  | 'trends'           // 网络思潮

export type Category = 'love' | 'money' | 'study_work' | 'social' | 'daily'

export const DOMAIN_LABELS: Record<Domain, string> = {
  relationships: '人际关系',
  career: '职场事业',
  family: '亲密家庭',
  growth: '成长校园',
  finance: '财富消费',
  productivity: '效率习惯',
  cognition: '心智认知',
  decision: '决策工具',
  health: '健康身心',
  philosophy: '生活哲学',
  wisdom: '处世智慧',
  trends: '网络思潮',
}

export const DOMAIN_ICONS: Record<Domain, string> = {
  relationships: '👥',
  career: '💼',
  family: '💕',
  growth: '🌱',
  finance: '💰',
  productivity: '⚡',
  cognition: '🧠',
  decision: '🔧',
  health: '💪',
  philosophy: '🏛️',
  wisdom: '🏮',
  trends: '🌐',
}

export const CATEGORY_LABELS: Record<Category, string> = {
  love: '感情',
  money: '钱',
  study_work: '学业/事业',
  social: '人际关系',
  daily: '日常困扰',
}

export const CATEGORY_ICONS: Record<Category, string> = {
  love: '❤️',
  money: '💰',
  study_work: '🎓',
  social: '👥',
  daily: '📦',
}

// Fallback for old category values in history
export function getCategoryLabel(cat: string): string {
  return CATEGORY_LABELS[cat as Category] || '通用'
}
export function getCategoryIcon(cat: string): string {
  return CATEGORY_ICONS[cat as Category] || '🤔'
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

// ============ Knowledge ============

export type KnowledgeType = 'belief' | 'quote' | 'article'

export interface KnowledgeItem {
  id: string
  type: KnowledgeType
  content: string       // the core text (article = AI summary)
  rawContent?: string   // original full text for articles
  source?: string       // link or description
  tags: string[]
  createdAt: string
}

// ============ User ============

export interface UserProfile {
  ratings: Record<string, number> // theoryId -> 0-5
  beliefs: string[]               // deprecated — migrated to knowledge items
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

export interface MatchedKnowledge {
  itemId: string
  content: string
  type: KnowledgeType
  relevance: string
}

export interface DecisionResult {
  matchedTheories: MatchedTheory[]
  matchedKnowledge?: MatchedKnowledge[]
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
  knowledge: KnowledgeItem[]
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
