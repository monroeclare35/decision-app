import type { MatchedTheory } from '../../types'
import { RatingStars } from '../shared/RatingStars'

interface MatchedTheoryCardProps {
  matched: MatchedTheory
}

export function MatchedTheoryCard({ matched }: MatchedTheoryCardProps) {
  return (
    <div className="card rounded-xl bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm text-surface-800">{matched.content}</p>
          <p className="mt-2 text-xs leading-relaxed text-surface-500">
            {matched.relevance}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <RatingStars value={matched.userRating} readonly size="sm" />
          <span className="mt-1 text-[10px] text-surface-400">
            权重 {Math.round(matched.weight * 100)}%
          </span>
        </div>
      </div>
    </div>
  )
}
