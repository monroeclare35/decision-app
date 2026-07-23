import { useMemo } from 'react'
import { useAppContext } from '../../hooks/useAppContext'
import { DOMAIN_LABELS } from '../../types'
import type { Domain } from '../../types'
import { Link } from 'react-router-dom'

interface Evaluation {
  style: string
  styleDesc: string
  topDomain: string
  topDomainLabel: string
  bottomDomain: string
  bottomDomainLabel: string
  trait: string
}

function buildEvaluation(
  avgRating: number,
  variance: number,
  domainScores: { domain: Domain; label: string; score: number }[]
): Evaluation {
  const top = domainScores[0]
  const bottom = domainScores[domainScores.length - 1]
  const spread = top.score - bottom.score

  // Determine decision style based on rating distribution
  if (avgRating >= 4.2) {
    return {
      style: '开放包容型',
      styleDesc: '你对各类决策智慧都有很高的认同度，愿意从不同角度汲取养分。这让你的思维工具箱非常丰富，但也可能意味着你需要在具体情境中更果断地选择——毕竟不是所有原则都能同时适用。',
      topDomain: top.domain,
      topDomainLabel: top.label,
      bottomDomain: bottom.domain,
      bottomDomainLabel: bottom.label,
      trait: spread < 0.5
        ? '你的各领域评分非常均衡，说明你没有一个明显的"盲区"——这是一种罕见的认知广度。'
        : `你相对更认同「${top.label}」领域的观点，而对「${bottom.label}」保持了一定距离。这反映了你当前阶段的关注重心。`,
    }
  }

  if (avgRating >= 3.5) {
    return {
      style: '审慎务实型',
      styleDesc: '你对大多数原则持开放态度，但不会照单全收。你倾向于认可那些与自身经验吻合的观点，对"听起来有道理但没试过"的理论保留判断。这是一种健康的实用主义——好的理论应该是工具，不是信仰。',
      topDomain: top.domain,
      topDomainLabel: top.label,
      bottomDomain: bottom.domain,
      bottomDomainLabel: bottom.label,
      trait: spread > 1.0
        ? `「${top.label}」是你最认同的领域，可能因为你在这一块有过切身体会；而「${bottom.label}」相对陌生或与你的经历冲突。`
        : '你对各领域的看法比较均匀，这意味着你有一个相对稳定的内在价值体系，不容易被单一观点带偏。',
    }
  }

  if (variance >= 1.5) {
    return {
      style: '独立思辨型',
      styleDesc: '你有强烈的个人判断标准，不轻易认同任何观点。高分的理论是你真正认可的，低分的则可能和你的价值观直接冲撞。这种"爱憎分明"的特质让你不容易被人带节奏，但也可以留意一下——有些你不认同的观点，或许只是因为你还没遇到过适用的场景。',
      topDomain: top.domain,
      topDomainLabel: top.label,
      bottomDomain: bottom.domain,
      bottomDomainLabel: bottom.label,
      trait: `你高度认同「${top.label}」领域的观点，但对「${bottom.label}」持明显的保留态度。这构成了你决策风格的核心张力。`,
    }
  }

  return {
    style: '直觉感受型',
    styleDesc: '你依靠直觉和感受来做判断，不太依赖外部框架。你更相信"具体情况具体分析"，对普适性原则保持本能的警惕。这是你自己的方式，没必要改成别人。',
    topDomain: top.domain,
    topDomainLabel: top.label,
    bottomDomain: bottom.domain,
    bottomDomainLabel: bottom.label,
    trait: '你对不同领域的理论有清晰的偏好差异，这反映出你有一套自己摸索出来的价值排序。',
  }
}

export function FingerprintSummary() {
  const { state } = useAppContext()
  const { userRatings, library } = state.theories

  const { evaluation, domainScores, ratedCount } = useMemo(() => {
    const rated = [...library].filter((t) => userRatings[t.id] !== undefined)
    const ratings = rated.map((t) => userRatings[t.id] ?? 3)
    const avg = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 3
    const variance =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + (r - avg) ** 2, 0) / ratings.length
        : 0

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

    const eval_ = buildEvaluation(Math.round(avg * 10) / 10, Math.round(variance * 100) / 100, domains)

    return { evaluation: eval_, domainScores: domains, ratedCount: rated.length }
  }, [library, userRatings])

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center">
        <span className="text-6xl">🧬</span>
        <h2 className="mt-4 text-2xl font-bold text-surface-800">你的决策指纹已生成</h2>
        <p className="mt-2 text-sm text-surface-500">
          基于 {ratedCount} 条评分，我们分析了你的决策偏好
        </p>
      </div>

      {/* Decision style evaluation */}
      <div className="card rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">
            {evaluation.style === '开放包容型' ? '🌊' : evaluation.style === '审慎务实型' ? '⚖️' : evaluation.style === '独立思辨型' ? '🗿' : '🌿'}
          </span>
          <div>
            <h3 className="text-lg font-bold text-surface-800">{evaluation.style}</h3>
            <p className="text-xs text-surface-400">你的决策风格</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-surface-600">{evaluation.styleDesc}</p>
        <div className="mt-4 rounded-xl bg-surface-50 p-4">
          <p className="text-sm leading-relaxed text-surface-600">{evaluation.trait}</p>
        </div>
      </div>

      {/* Domain scores */}
      <div className="card rounded-2xl bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-surface-600">各领域认同度</h3>
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
