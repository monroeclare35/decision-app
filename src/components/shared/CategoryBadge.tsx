import { cn } from '../../utils/cn'
import type { Category } from '../../types'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../../types'

interface CategoryBadgeProps {
  category: Category
  selected?: boolean
  onClick?: () => void
  size?: 'sm' | 'md'
}

export function CategoryBadge({ category, selected, onClick, size = 'md' }: CategoryBadgeProps) {
  const Comp = onClick ? 'button' : 'span'

  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-all',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        selected
          ? 'border-primary-400 bg-primary-50 text-primary-700'
          : 'border-surface-200 bg-white text-surface-600 hover:border-surface-300',
        onClick && 'cursor-pointer active:scale-95'
      )}
    >
      <span>{CATEGORY_ICONS[category]}</span>
      <span>{CATEGORY_LABELS[category]}</span>
    </Comp>
  )
}
