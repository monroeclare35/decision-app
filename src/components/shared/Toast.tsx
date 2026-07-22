import { useAppContext } from '../../hooks/useAppContext'
import { cn } from '../../utils/cn'

export function Toast() {
  const { state } = useAppContext()
  const { toast } = state.ui

  if (!toast) return null

  const bgColor = {
    success: 'bg-emerald-600',
    error: 'bg-red-500',
    info: 'bg-surface-700',
  }[toast.type]

  const icon = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  }[toast.type]

  return (
    <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 animate-slide-up">
      <div
        className={cn(
          'flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-lg',
          bgColor
        )}
      >
        <span>{icon}</span>
        <span>{toast.text}</span>
      </div>
    </div>
  )
}
