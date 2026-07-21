import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../utils/cn'

const NAV_ITEMS = [
  { to: '/decide', label: '决策', icon: '🎯' },
  { to: '/theories', label: '理论', icon: '📚' },
  { to: '/beliefs', label: '信念', icon: '🧭' },
  { to: '/history', label: '历史', icon: '📋' },
  { to: '/settings', label: '设置', icon: '⚙️' },
]

export function Navbar() {
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-40 border-b border-sage-200/50 bg-cream-50/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-sage-800">
          <span className="text-xl">🧿</span>
          <span>决策助手</span>
        </Link>
      </div>
      <div className="flex justify-around border-t border-sage-100/50 px-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 text-xs transition-colors',
                isActive
                  ? 'text-warm-600'
                  : 'text-sage-400 hover:text-sage-600'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
