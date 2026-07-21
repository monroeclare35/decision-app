import { cn } from '../../utils/cn'
import { ONBOARDING_TOTAL } from '../../constants/config'

interface ProgressBarProps {
  ratedCount: number
}

export function ProgressBar({ ratedCount }: ProgressBarProps) {
  const percent = Math.round((ratedCount / ONBOARDING_TOTAL) * 100)

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-sage-200">
        <div
          className="h-full rounded-full bg-warm-400 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-medium text-sage-500 tabular-nums">
        {ratedCount}/{ONBOARDING_TOTAL} · {percent}%
      </span>
    </div>
  )
}
