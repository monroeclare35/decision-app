import type { Theory } from '../../types'
import { DOMAIN_LABELS } from '../../types'
import { RatingStars } from '../shared/RatingStars'
import { cn } from '../../utils/cn'

interface TheoryCardProps {
  theory: Theory
  rating: number | null
  onRate: (score: number) => void
}

export function TheoryCard({ theory, rating, onRate }: TheoryCardProps) {
  return (
    <div className="card rounded-xl bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center rounded-full bg-surface-100 px-2 py-0.5 text-[10px] font-medium text-surface-500">
              {DOMAIN_LABELS[theory.domain]}
            </span>
            {theory.source !== 'preset' && (
              <span className="text-[10px] text-surface-400">
                {theory.source === 'ai' ? 'AI 生成' : '自定义'}
              </span>
            )}
          </div>
          <p className="text-sm text-surface-800">{theory.content}</p>
          {theory.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {theory.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-50 px-2 py-0.5 text-[10px] text-surface-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <RatingStars
            value={rating ?? -1}
            onChange={onRate}
            size="sm"
          />
          {rating !== null && (
            <p className="mt-0.5 text-center text-[10px] text-surface-400">
              {rating} 分
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
