import { useMemo } from 'react'
import { useAppContext } from '../../hooks/useAppContext'
import { DOMAIN_LABELS } from '../../types'
import type { Domain } from '../../types'
import { Link } from 'react-router-dom'
import { ONBOARDING_SCENARIOS } from '../../data/theories'

interface Evaluation {
  style: string
  emoji: string
  styleDesc: string
  trait: string
}

function buildEvaluation(
  domainCounts: Map<Domain, number>,
  totalAnswers: number
): Evaluation {
  const domains = [...domainCounts.entries()].sort((a, b) => b[1] - a[1])
  if (domains.length === 0) {
    return {
      style: '数据不足',
      emoji: '🤔',
      styleDesc: '你还没有完成足够的场景探测。',
      trait: '再做几道情景题，我们就能分析你的决策风格了。',
    }
  }

  const topDomain = domains[0]
  const domainCount = domains.length
  const maxCount = topDomain[1]
  const uniqueDomains = domainCount

  // How concentrated are the choices in the top domain?
  const concentration = maxCount / totalAnswers

  if (uniqueDomains >= 4 && concentration <= 0.3) {
    return {
      style: '情境依赖型',
      emoji: '🦎',
      styleDesc: '你在不同领域的情境中展现了不同的决策倾向——没有一套固定的原则适用于所有场景。这说明你对情境非常敏感，会根据具体情况调整策略。这是适应力的体现，但也可能意味着你在某些领域的原则和行动之间存在张力。',
      trait: `你的选择横跨 ${uniqueDomains} 个领域，没有一个领域占据主导。你在具体情境中做的判断比抽象原则更能说明问题。`,
    }
  }

  if (concentration >= 0.5) {
    return {
      style: '领域偏好型',
      emoji: '🎯',
      styleDesc: `你在「${DOMAIN_LABELS[topDomain[0]]}」领域的判断非常鲜明，你的选择在这个领域里高度一致。这说明你对这一块有清晰的价值排序——可能是因为你有丰富的亲身经历，已经磨练出了直觉。`,
      trait: `在 10 道情景题中，你的选择 ${maxCount} 次指向了「${DOMAIN_LABELS[topDomain[0]]}」相关的理论。这个领域是你决策的"舒适区"。`,
    }
  }

  if (concentration >= 0.35) {
    return {
      style: '价值观稳定型',
      emoji: '⚓',
      styleDesc: '你的选择在各个领域中展现出一定的一致性——你有一套相对稳定的内在价值体系，面对不同情景时，相似的原则会浮现出来。这是成熟的表现：你知道自己要什么，不容易被情境牵着走。',
      trait: `你的核心倾向集中在「${DOMAIN_LABELS[topDomain[0]]}」领域，但不是压倒性的。你有一个主心骨，同时给其他领域留了空间。`,
    }
  }

  return {
    style: '灵活适应型',
    emoji: '🌿',
    styleDesc: '你在不同情景中的选择灵活多变，没有明显的领域偏好。你更可能依赖直觉和情境来做判断，而非事先设定的原则。你相信"具体情况具体分析"——这让你不容易被教条束缚。',
    trait: '你的决策风格更接近"边走边看"——不同场景下不同的策略，这是一种灵活但难以被标签定义的方式。',
  }
}

export function FingerprintSummary() {
  const { state } = useAppContext()
  const { onboardingAnswers } = state.probing

  const { evaluation, domainDistribution, totalAnswers } = useMemo(() => {
    const answers = onboardingAnswers.filter((a) => a.phase === 'onboarding')
    const total = answers.length

    // Count how many times a theory in each domain was "followed" by user choices
    const domainCounts = new Map<Domain, number>()
    for (const answer of answers) {
      // Find which scenario this answer belongs to
      const scenario = ONBOARDING_SCENARIOS.find((s) => s.id === answer.scenarioId)
      if (scenario) {
        const count = domainCounts.get(scenario.domain) || 0
        domainCounts.set(scenario.domain, count + 1)
      }
    }

    // Build domain distribution for display
    const distribution: { domain: Domain; label: string; count: number; percent: number }[] = []
    for (const [domain, count] of domainCounts) {
      distribution.push({
        domain,
        label: DOMAIN_LABELS[domain],
        count,
        percent: total > 0 ? Math.round((count / total) * 100) : 0,
      })
    }
    distribution.sort((a, b) => b.count - a.count)

    const eval_ = buildEvaluation(domainCounts, total)

    return { evaluation: eval_, domainDistribution: distribution, totalAnswers: total }
  }, [onboardingAnswers])

  // Only include the 5 domains covered by onboarding (finance, cognition, relationships, wisdom, decision)
  const relevantDistribution = domainDistribution

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center">
        <span className="text-6xl">🧬</span>
        <h2 className="mt-4 text-2xl font-bold text-surface-800">你的决策指纹已生成</h2>
        <p className="mt-2 text-sm text-surface-500">
          基于 {totalAnswers} 道情景探测，我们分析了你的决策偏好
        </p>
      </div>

      {/* Decision style evaluation */}
      <div className="card rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">{evaluation.emoji}</span>
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

      {/* Domain distribution */}
      {relevantDistribution.length > 0 && (
        <div className="card rounded-2xl bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold text-surface-600">各领域倾向分布</h3>
          <div className="space-y-3">
            {relevantDistribution.map((d) => (
              <div key={d.domain} className="flex items-center gap-3">
                <span className="w-20 text-xs text-surface-500">{d.label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-100">
                  <div
                    className="h-full rounded-full bg-primary-400 transition-all duration-700"
                    style={{ width: `${Math.max(d.percent, 5)}%` }}
                  />
                </div>
                <span className="w-12 text-right text-xs font-medium text-surface-700 tabular-nums">
                  {d.count} 次
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-surface-400">
            你的 10 次选择在各领域的分布。条越长说明你在该领域的倾向越明显。
          </p>
        </div>
      )}

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
