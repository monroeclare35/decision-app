import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../utils/cn'

const NAV_ITEMS = [
  { to: '/decide', label: '决策', icon: '🎯' },
  { to: '/knowledge', label: '知识库', icon: '📖' },
  { to: '/theories', label: '理论', icon: '📚' },
  { to: '/history', label: '历史', icon: '📋' },
  { to: '/settings', label: '设置', icon: '⚙️' },
]

export function Navbar() {
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-40 border-b border-surface-200/50 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-surface-800">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface-800 text-sm">🧿</span>
          <span>决策助手</span>
        </Link>
      </div>
      <div className="flex justify-around border-t border-surface-100/50 px-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2.5 text-xs font-medium transition-all duration-200',
                isActive
                  ? 'text-primary-600'
                  : 'text-surface-400 hover:text-surface-600'
              )}
            >
              <span className={cn('text-lg transition-transform', isActive && 'scale-110')}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
