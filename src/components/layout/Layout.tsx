import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { useAppContext } from '../../hooks/useAppContext'

const FULLSCREEN_ROUTES = ['/onboarding']

export function Layout({ children }: { children?: React.ReactNode }) {
  const location = useLocation()
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname)

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-cream-50">
      {!isFullscreen && <Navbar />}
      <main className="flex-1 px-4 pb-24 pt-4">{children ?? <Outlet />}</main>
    </div>
  )
}
