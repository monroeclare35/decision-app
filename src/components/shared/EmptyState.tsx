import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon = '📭',
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  className,
}: EmptyStateProps) {
  const buttonClasses =
    'mt-4 inline-flex items-center gap-2 rounded-xl bg-sage-800 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-sage-700 active:scale-95'

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <span className="text-5xl">{icon}</span>
      <h3 className="mt-4 text-lg font-medium text-sage-700">{title}</h3>
      {description && (
        <p className="mt-2 max-w-xs text-sm text-sage-500">{description}</p>
      )}
      {actionLabel && actionTo && (
        <Link to={actionTo} className={buttonClasses}>
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button onClick={onAction} className={buttonClasses}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
