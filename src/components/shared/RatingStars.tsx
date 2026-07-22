import { cn } from '../../utils/cn'

interface RatingStarsProps {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function RatingStars({ value, onChange, readonly = false, size = 'lg' }: RatingStarsProps) {
  const sizeClasses = {
    sm: 'text-lg gap-0.5',
    md: 'text-2xl gap-1',
    lg: 'text-4xl gap-2',
  }

  return (
    <div className={cn('flex items-center justify-center', sizeClasses[size])}>
      {[0, 1, 2, 3, 4, 5].map((score) => {
        const isFilled = score <= value
        const label =
          score === 0
            ? '完全不认同'
            : score === 1
            ? '不太认同'
            : score === 2
            ? '有点不认同'
            : score === 3
            ? '中立'
            : score === 4
            ? '比较认同'
            : '完全认同'

        return (
          <button
            key={score}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(score)}
            className={cn(
              'flex flex-col items-center transition-all duration-200',
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95',
              size === 'lg' && 'min-w-[48px]'
            )}
            title={label}
            aria-label={`${score}分 - ${label}`}
          >
            <span
              className={cn(
                'transition-colors duration-200',
                isFilled ? 'text-primary-400' : 'text-surface-200',
                !readonly && 'hover:text-primary-300'
              )}
            >
              {score === 0 ? '○' : '●'}
            </span>
            {size === 'lg' && (
              <span className="mt-1 text-[10px] text-surface-400">{score}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
