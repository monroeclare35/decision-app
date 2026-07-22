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
              ? 'border-primary-400 bg-primary-50 text-primary-700'
              : 'border-surface-200 bg-white text-surface-500 hover:border-surface-300'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
