import { useMemo } from 'react'
import { useAppContext } from '../../hooks/useAppContext'
import { DOMAIN_LABELS } from '../../types'
import type { Domain } from '../../types'
import { Link } from 'react-router-dom'

export function FingerprintSummary() {
  const { state } = useAppContext()
  const { userRatings, library } = state.theories

  const { topTheories, bottomTheories, domainScores } = useMemo(() => {
    // Sort theories by rating
    const sorted = [...library]
      .filter((t) => userRatings[t.id] !== undefined)
      .sort((a, b) => (userRatings[b.id] ?? 3) - (userRatings[a.id] ?? 3))

    const top = sorted.slice(0, 5)
    const bottom = sorted.slice(-5).reverse()

    // Domain averages
    const domainMap = new Map<Domain, { total: number; count: number }>()
    for (const theory of library) {
      const rating = userRatings[theory.id]
      if (rating === undefined) continue
      const existing = domainMap.get(theory.domain) || { total: 0, count: 0 }
      existing.total += rating
      existing.count += 1
      domainMap.set(theory.domain, existing)
    }

    const domains: { domain: Domain; label: string; score: number }[] = []
    for (const [domain, { total, count }] of domainMap) {
      domains.push({
        domain,
        label: DOMAIN_LABELS[domain],
        score: Math.round((total / count) * 10) / 10,
      })
    }
    domains.sort((a, b) => b.score - a.score)

    return { topTheories: top, bottomTheories: bottom, domainScores: domains }
  }, [library, userRatings])

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center">
        <span className="text-6xl">🧬</span>
        <h2 className="mt-4 text-2xl font-bold text-surface-800">你的决策指纹已生成</h2>
        <p className="mt-2 text-sm text-surface-500">
          基于你的 50 条评分，我们绘制了你的决策偏好画像
        </p>
      </div>

      {/* Domain radar (simplified) */}
      <div className="card rounded-2xl bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-surface-600">各领域倾向</h3>
        <div className="space-y-3">
          {domainScores.map((d) => (
            <div key={d.domain} className="flex items-center gap-3">
              <span className="w-20 text-xs text-surface-500">{d.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-100">
                <div
                  className="h-full rounded-full bg-primary-400 transition-all duration-700"
                  style={{ width: `${(d.score / 5) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs font-medium text-surface-700 tabular-nums">
                {d.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top theories */}
      <div className="card rounded-2xl bg-white p-6">
        <h3 className="mb-3 text-sm font-semibold text-surface-600">你最认同的观点</h3>
        <ul className="space-y-2">
          {topTheories.map((t) => (
            <li key={t.id} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 text-primary-400">●</span>
              <span className="text-surface-700">{t.content}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom theories */}
      <div className="card rounded-2xl bg-white p-6">
        <h3 className="mb-3 text-sm font-semibold text-surface-600">你不太认同的观点</h3>
        <ul className="space-y-2">
          {bottomTheories.map((t) => (
            <li key={t.id} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 text-surface-300">○</span>
              <span className="text-surface-500">{t.content}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/decide"
          className="inline-flex items-center gap-2 rounded-2xl bg-surface-800 px-8 py-4 text-base font-medium text-white transition-all hover:bg-surface-700 active:scale-95"
        >
          🚀 开始做第一个决定
        </Link>
      </div>
    </div>
  )
}
