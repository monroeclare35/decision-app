import { cn } from '../../utils/cn'

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: string
  className?: string
}

export function PageHeader({ title, subtitle, icon, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      <h1 className="flex items-center gap-3 text-2xl font-bold text-sage-800">
        {icon && <span className="text-2xl">{icon}</span>}
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-sm leading-relaxed text-sage-500">{subtitle}</p>
      )}
    </div>
  )
}
