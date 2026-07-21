import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'

export function LandingPage() {
  const { state } = useAppContext()
  const { profile } = state.user
  const hasStarted = profile && Object.keys(state.theories.userRatings).length > 0
  const completed = profile?.completedOnboarding

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Hero */}
      <div className="animate-fade-in">
        <span className="text-7xl">🧿</span>
        <h1 className="mt-6 text-3xl font-bold leading-tight text-sage-800">
          找到属于你的
          <br />
          <span className="text-warm-500">答案</span>
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-sage-500">
          基于 50 条跨领域理论，形成你独一无二的"决策指纹"。
          <br />
          当你在犹豫不决时，AI 会用你的方式替你思考。
        </p>
      </div>

      {/* Features */}
      <div className="mt-10 grid grid-cols-2 gap-3 text-left">
        {[
          { icon: '📊', title: '决策指纹', desc: '50 题测评，了解你的偏好' },
          { icon: '🧠', title: '多维理论', desc: '理财 / 心理 / 民俗 / 决策学' },
          { icon: '🧭', title: '核心信念', desc: '你的信念贯穿所有决策' },
          { icon: '💡', title: 'AI 分析', desc: '个性化、可执行的具体建议' },
        ].map((f) => (
          <div key={f.title} className="card-shadow rounded-xl bg-white p-4">
            <span className="text-2xl">{f.icon}</span>
            <h3 className="mt-2 text-sm font-semibold text-sage-700">{f.title}</h3>
            <p className="mt-1 text-xs text-sage-500">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-col gap-3">
        {!completed ? (
          <Link
            to="/onboarding"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sage-800 px-8 py-4 text-base font-medium text-white transition-all hover:bg-sage-700 active:scale-95"
          >
            {hasStarted ? '继续测评' : '开始建立决策指纹'}
          </Link>
        ) : (
          <Link
            to="/decide"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sage-800 px-8 py-4 text-base font-medium text-white transition-all hover:bg-sage-700 active:scale-95"
          >
            去做一个决定
          </Link>
        )}
        {hasStarted && !completed && (
          <Link
            to="/decide"
            className="text-sm text-sage-400 underline-offset-2 hover:text-sage-600 hover:underline"
          >
            跳过测评，直接决策
          </Link>
        )}
      </div>
    </div>
  )
}
