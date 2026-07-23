import { useEffect, useCallback } from 'react'
import type { Theory } from '../../types'
import { DOMAIN_LABELS } from '../../types'
import { RatingStars } from '../shared/RatingStars'
import { cn } from '../../utils/cn'

interface TheoryCardProps {
  theory: Theory
  currentRating?: number
  onRate: (theoryId: string, score: number) => void
  onSkip: (theoryId: string) => void
}

export function TheoryCard({ theory, currentRating, onRate, onSkip }: TheoryCardProps) {
  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const num = parseInt(e.key)
      if (num >= 0 && num <= 5) {
        onRate(theory.id, num)
      } else if (e.key === 's' || e.key === 'S') {
        onSkip(theory.id)
      }
    },
    [theory.id, onRate, onSkip]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="animate-fade-in">
      {/* Domain tag */}
      <div className="mb-4 text-center">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600">
          {DOMAIN_LABELS[theory.domain]}
        </span>
      </div>

      {/* Theory content */}
      <div className="card card-lg mb-8 rounded-2xl bg-white p-8 text-center">
        <p className="text-balance text-lg leading-relaxed text-surface-800">
          {theory.content}
        </p>
        {theory.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {theory.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-100 px-2.5 py-0.5 text-[11px] text-surface-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6">
        <p className="mb-3 text-center text-sm text-surface-500">
          你对这个观点的认同程度是？
        </p>
        <RatingStars
          value={currentRating ?? -1}
          onChange={(score) => onRate(theory.id, score)}
          size="lg"
        />
      </div>

      {/* Skip */}
      <div className="text-center">
        <button
          onClick={() => onSkip(theory.id)}
          className="text-sm text-surface-400 underline-offset-2 transition-colors hover:text-surface-600 hover:underline"
        >
          跳过这条（默认中立）
        </button>
      </div>
    </div>
  )
}
