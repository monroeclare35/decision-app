import { cn } from '../../utils/cn'
import type { Domain } from '../../types'
import { DOMAIN_LABELS } from '../../types'
import { DOMAIN_GROUPS } from '../../data/theories'

interface DomainFilterProps {
  value: Domain | 'all'
  onChange: (value: Domain | 'all') => void
}

export function DomainFilter({ value, onChange }: DomainFilterProps) {
  const items: { value: Domain | 'all'; label: string }[] = [
    { value: 'all', label: '全部' },
    ...DOMAIN_GROUPS.map((g) => ({ value: g.domain as Domain, label: g.label })),
  ]

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={cn(
            'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
            value === item.value
              ? 'border-warm-400 bg-warm-50 text-warm-700'
              : 'border-sage-200 bg-white text-sage-500 hover:border-sage-300'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
