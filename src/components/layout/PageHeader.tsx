import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface PageHeaderProps {
  title: string
  subtitle?: ReactNode
  icon?: string
  className?: string
}

export function PageHeader({ title, subtitle, icon, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      <h1 className="flex items-center gap-3 text-[28px] font-bold tracking-tight text-surface-800">
        {icon && <span>{icon}</span>}
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-[15px] leading-relaxed text-surface-500">{subtitle}</p>
      )}
    </div>
  )
}
