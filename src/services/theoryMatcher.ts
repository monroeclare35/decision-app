import type { Theory, Category, MatchedTheory } from '../types'
import {
  TOP_THEORIES_COUNT,
  NEUTRAL_THEORIES_COUNT,
  CONTRADICTION_THEORIES_COUNT,
} from '../constants/config'

export interface ScoredTheory {
  theory: Theory
  userRating: number
  score: number
  alignment: 'aligned' | 'neutral' | 'contradiction'
}

export function matchTheories(
  theories: Theory[],
  userRatings: Record<string, number>,
  category: Category,
  decisionText: string,
  beliefs: string[]
): {
  topTheories: ScoredTheory[]
  neutralTheories: ScoredTheory[]
  contradictionTheories: ScoredTheory[]
} {
  // Score all theories
  const scored: ScoredTheory[] = theories
    .map((theory) => {
      const userRating = userRatings[theory.id] ?? 3
      const score = computeScore(theory, userRating, category, decisionText, beliefs)

      let alignment: ScoredTheory['alignment'] = 'neutral'
      if (userRating >= 4) alignment = 'aligned'
      else if (userRating <= 1) alignment = 'contradiction'

      return { theory, userRating, score, alignment }
    })
    .sort((a, b) => b.score - a.score)

  // Split into groups
  const aligned = scored.filter((s) => s.alignment === 'aligned')
  const neutral = scored.filter((s) => s.alignment === 'neutral')
  const contradictions = scored.filter((s) => s.alignment === 'contradiction')

  return {
    topTheories: aligned.slice(0, TOP_THEORIES_COUNT),
    neutralTheories: neutral.slice(0, NEUTRAL_THEORIES_COUNT),
    contradictionTheories: contradictions.slice(0, CONTRADICTION_THEORIES_COUNT),
  }
}

function computeScore(
  theory: Theory,
  userRating: number,
  category: Category,
  decisionText: string,
  beliefs: string[]
): number {
  // 1. Base score from user rating (normalized to 0-1)
  const baseScore = userRating / 5

  // 2. Category relevance boost
  const categoryBoost = getCategoryBoost(theory.domain, category)

  // 3. Keyword / tag overlap boost
  const tagBoost = getTagOverlapBoost(theory, decisionText, beliefs)

  return baseScore + categoryBoost + tagBoost
}

function getCategoryBoost(domain: string, category: Category): number {
  // Map domains to their most relevant categories
  const domainCategoryMap: Record<string, Category[]> = {
    relationships: ['emotional', 'general'],
    career: ['financial', 'general'],
    family: ['emotional', 'general'],
    growth: ['general'],
    finance: ['financial', 'general'],
    productivity: ['general'],
    cognition: ['emotional', 'general'],
    decision: ['financial', 'general'],
    health: ['meal', 'general'],
    philosophy: ['emotional', 'general'],
    wisdom: ['emotional', 'general', 'financial'],
    trends: ['general', 'outfit', 'meal', 'emotional'],
  }

  const relevantCategories = domainCategoryMap[domain] || ['general']
  if (relevantCategories.includes(category)) {
    return category === 'general' ? 0.1 : 0.3
  }
  return 0
}

function getTagOverlapBoost(
  theory: Theory,
  decisionText: string,
  beliefs: string[]
): number {
  let overlap = 0

  // Check tags against decision text
  const lowerText = decisionText.toLowerCase()
  for (const tag of theory.tags) {
    if (lowerText.includes(tag.toLowerCase())) {
      overlap += 1
    }
  }

  // Check tags against beliefs
  for (const belief of beliefs) {
    const lowerBelief = belief.toLowerCase()
    for (const tag of theory.tags) {
      if (lowerBelief.includes(tag.toLowerCase()) || tag.toLowerCase().includes(lowerBelief)) {
        overlap += 0.5
      }
    }
  }

  return Math.min(overlap * 0.05, 0.3)
}

export function formatTheoriesForPrompt(
  top: ScoredTheory[],
  neutral: ScoredTheory[],
  contradictions: ScoredTheory[]
): string {
  const lines: string[] = []

  lines.push('## 高度认同的理论（评分 4-5）')
  if (top.length === 0) {
    lines.push('（无）')
  } else {
    top.forEach((s) => {
      lines.push(
        `- [评分 ${s.userRating}] ${s.theory.content} (领域: ${s.theory.domain}, 标签: ${s.theory.tags.join(', ')})`
      )
    })
  }

  lines.push('\n## 中性理论（评分 2-3）')
  if (neutral.length === 0) {
    lines.push('（无）')
  } else {
    neutral.forEach((s) => {
      lines.push(
        `- [评分 ${s.userRating}] ${s.theory.content} (领域: ${s.theory.domain})`
      )
    })
  }

  lines.push('\n## 不太认同的理论（评分 0-1，作为反面视角参考）')
  if (contradictions.length === 0) {
    lines.push('（无）')
  } else {
    contradictions.forEach((s) => {
      lines.push(
        `- [评分 ${s.userRating}] ${s.theory.content} (领域: ${s.theory.domain})`
      )
    })
  }

  return lines.join('\n')
}
