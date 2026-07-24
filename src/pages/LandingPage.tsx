import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'

// Each frame is a line of the "boot sequence".
// The cat ASCII art renders like a system initializing.
const CAT_FRAMES = [
  '> 慧咪 v0.3.0',
  '> initializing...',
  '> ',
  '>      /\\___/\\',
  '>     (  o   o  )',
  '>     (  = ^ =  )',
  '>      (  ---  )',
  '>       |     |',
  '>      (_______ )',
  '> ',
  '> system ready.',
  '> 喵 ~',
]

export function LandingPage() {
  const { state } = useAppContext()
  const { profile } = state.user
  const hasStarted = profile && Object.keys(state.theories.userRatings).length > 0
  const completed = profile?.completedOnboarding

  const [visibleLines, setVisibleLines] = useState(0)
  const [animationDone, setAnimationDone] = useState(false)

  useEffect(() => {
    if (visibleLines >= CAT_FRAMES.length) {
      const t = setTimeout(() => setAnimationDone(true), 400)
      return () => clearTimeout(t)
    }
    const delay = visibleLines < 3 ? 400 : 180
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay)
    return () => clearTimeout(timer)
  }, [visibleLines])

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Cat boot sequence */}
      <div className="animate-fade-in">
        {/* Terminal window */}
        <div
          className={`mx-auto w-72 overflow-hidden rounded-2xl border border-surface-300/50 bg-[#1a1a2e] text-left shadow-2xl transition-all duration-1000 ${
            animationDone ? 'shadow-[0_0_60px_rgba(168,85,247,0.15)]' : ''
          }`}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[11px] text-white/30 font-mono">meow ~</span>
          </div>
          {/* Terminal body */}
          <div className="px-5 py-4 font-mono text-sm leading-[1.7] text-[#50fa7b]">
            {CAT_FRAMES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="whitespace-pre">{line}</div>
            ))}
            {!animationDone && (
              <span className="inline-block h-[1.2em] w-2.5 animate-pulse bg-[#50fa7b] align-middle" />
            )}
          </div>
        </div>

        {/* App name & tagline — fade in after cat */}
        <div
          className={`transition-all duration-1000 ${
            animationDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="mt-8 text-3xl font-bold tracking-wide text-surface-800">
            慧咪
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-surface-500">
            人，咪儿和你一起想
          </p>
        </div>
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
          <div className="flex flex-col gap-3">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-surface-800 px-8 py-4 text-base font-medium text-white transition-all hover:bg-surface-700 active:scale-95"
            >
              🐱 跟咪儿聊聊
            </Link>
            <Link
              to="/decide"
              className="text-sm text-surface-400 underline-offset-2 hover:text-surface-600 hover:underline"
            >
              深度分析（走完整流程）
            </Link>
          </div>
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
