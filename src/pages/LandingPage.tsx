import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'

// Terminal-style cat: each line is a "frame" of the cat appearing.
// Uses a CSS animation to simulate a code-render effect.
const CAT_FRAMES = [
  '> loading...',
  '> initializing...',
  '> ',
  '>   /\\_/\\',
  '>  ( o.o )',
  '>   > ^ <',
  '> ',
  '> 喵。',
]

export function LandingPage() {
  const { state } = useAppContext()
  const { profile } = state.user
  const hasStarted = profile && Object.keys(state.theories.userRatings).length > 0
  const completed = profile?.completedOnboarding

  // Typewriter / code-render animation
  const [visibleLines, setVisibleLines] = useState(0)
  const [animationDone, setAnimationDone] = useState(false)

  useEffect(() => {
    if (visibleLines >= CAT_FRAMES.length) {
      setAnimationDone(true)
      return
    }
    const delay = visibleLines === 2 ? 600 : 300
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay)
    return () => clearTimeout(timer)
  }, [visibleLines])

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Hero — code-style cat */}
      <div className="animate-fade-in">
        {/* Terminal window */}
        <div
          className={`mx-auto mb-2 w-48 overflow-hidden rounded-xl border border-surface-200 bg-surface-800 text-left transition-all duration-700 ${
            animationDone ? 'shadow-lg' : ''
          }`}
        >
          {/* Title bar */}
          <div className="flex items-center gap-1.5 border-b border-surface-700 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="ml-2 text-[10px] text-surface-500">meow ~</span>
          </div>
          {/* Terminal content */}
          <div className="px-3 py-3 font-mono text-xs leading-relaxed text-green-400">
            {CAT_FRAMES.slice(0, visibleLines).map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            {!animationDone && (
              <span className="inline-block h-4 w-2 animate-pulse bg-green-400" />
            )}
          </div>
        </div>

        {/* App name */}
        <h1
          className={`mt-6 text-3xl font-bold leading-tight text-surface-800 transition-all duration-1000 ${
            animationDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          慧咪
        </h1>
        <p
          className={`mt-3 max-w-sm text-sm leading-relaxed text-surface-500 transition-all delay-300 duration-1000 ${
            animationDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          人，咪儿和你一起想
        </p>
      </div>

      {/* Features */}
      <div className="mt-10 grid grid-cols-2 gap-3 text-left">
        {[
          { icon: '📊', title: '决策指纹', desc: '10 题情景探测，了解你的偏好' },
          { icon: '🧠', title: '多维理论', desc: '252 条理论覆盖 12 个领域' },
          { icon: '🧭', title: '核心信念', desc: '你的信念贯穿所有决策' },
          { icon: '💡', title: '咪儿分析', desc: '个性化、可执行的具体建议' },
        ].map((f) => (
          <div key={f.title} className="card rounded-xl bg-white p-4">
            <span className="text-2xl">{f.icon}</span>
            <h3 className="mt-2 text-sm font-semibold text-surface-700">{f.title}</h3>
            <p className="mt-1 text-xs text-surface-500">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-col gap-3">
        {!completed ? (
          <Link
            to="/onboarding"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-surface-800 px-8 py-4 text-base font-medium text-white transition-all hover:bg-surface-700 active:scale-95"
          >
            {hasStarted ? '继续测评' : '开始建立决策指纹'}
          </Link>
        ) : (
          <Link
            to="/decide"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-surface-800 px-8 py-4 text-base font-medium text-white transition-all hover:bg-surface-700 active:scale-95"
          >
            去做一个决定
          </Link>
        )}
        {hasStarted && !completed && (
          <Link
            to="/decide"
            className="text-sm text-surface-400 underline-offset-2 hover:text-surface-600 hover:underline"
          >
            跳过测评，直接决策
          </Link>
        )}
      </div>
    </div>
  )
}
