import type { Category } from '../../types'
import { CATEGORIES } from '../../data/categories'
import { cn } from '../../utils/cn'

interface CategorySelectorProps {
  value: Category
  onChange: (category: Category) => void
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-all active:scale-95',
            value === cat.id
              ? 'border-warm-400 bg-warm-50 text-warm-700'
              : 'border-sage-200 bg-white text-sage-500 hover:border-sage-300'
          )}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  )
}
