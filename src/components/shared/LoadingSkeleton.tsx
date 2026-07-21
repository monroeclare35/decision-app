import { cn } from '../../utils/cn'

interface LoadingSkeletonProps {
  lines?: number
  className?: string
}

export function LoadingSkeleton({ lines = 5, className }: LoadingSkeletonProps) {
  return (
    <div className={cn('animate-pulse space-y-4', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg bg-sage-100"
          style={{
            height: `${Math.max(16, 24 - i * 2)}px`,
            width: i === lines - 1 ? '60%' : '100%',
          }}
        />
      ))}
    </div>
  )
}
