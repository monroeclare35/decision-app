import { useParams, Link } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'
import { PageHeader } from '../components/layout/PageHeader'
import { MatchedTheoryCard } from '../components/result/MatchedTheoryCard'
import { PersonalizedAnalysis } from '../components/result/PersonalizedAnalysis'
import { CounterpointSection } from '../components/result/CounterpointSection'
import { BeliefReflection } from '../components/result/BeliefReflection'
import { ActionItems } from '../components/result/ActionItems'
import { SimilarCases } from '../components/result/SimilarCases'
import { EmptyState } from '../components/shared/EmptyState'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../types'

export function ResultPage() {
  const { id } = useParams<{ id: string }>()
  const { state } = useAppContext()
  const { history, currentResult } = state.decisions

  // Find decision by ID from history (latest if no id match or using currentResult)
  const decision = history.find((d) => d.id === id) || history[0]
  const result = decision?.result

  if (!decision || !result) {
    return (
      <EmptyState
        icon="🔍"
        title="未找到决策结果"
        description="这个决策可能已被删除，或者你还没有做过决策"
        actionLabel="去做决定"
        actionTo="/decide"
      />
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="分析结果"
        subtitle={
          <span className="inline-flex items-center gap-1.5">
            {CATEGORY_ICONS[decision.category]}
            {CATEGORY_LABELS[decision.category]}
            <span className="text-sage-300">·</span>
            <span>{new Date(decision.createdAt).toLocaleDateString('zh-CN')}</span>
          </span>
        }
        icon="🧿"
      />

      {/* Decision text */}
      <div className="card-shadow rounded-xl bg-white p-4">
        <p className="text-sm text-sage-500">你的困境：</p>
        <p className="mt-1 text-sage-800">{decision.description}</p>
      </div>

      {/* Matched theories */}
      {result.matchedTheories.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-sage-600">关联的理论</h3>
          <div className="space-y-3">
            {result.matchedTheories.map((mt, i) => (
              <MatchedTheoryCard key={i} matched={mt} />
            ))}
          </div>
        </div>
      )}

      {/* Personalized analysis */}
      <PersonalizedAnalysis text={result.personalizedAnalysis} />

      {/* Belief reflections */}
      {result.beliefReflections.length > 0 && (
        <BeliefReflection reflections={result.beliefReflections} />
      )}

      {/* Action items */}
      {result.actionItems.length > 0 && (
        <ActionItems items={result.actionItems} />
      )}

      {/* Matched Knowledge */}
      {result.matchedKnowledge && result.matchedKnowledge.length > 0 && (
        <div className="card-shadow rounded-xl bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-sage-600">📖 你的知识库中有相关收藏</h3>
          <div className="space-y-3">
            {result.matchedKnowledge.map((mk, i) => (
              <div key={i} className="rounded-lg border border-warm-100 bg-warm-50/30 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-medium text-warm-500">{mk.type === 'quote' ? '💬 金句' : '📄 文章'}</span>
                </div>
                <p className="text-sm text-sage-700">{mk.content}</p>
                <p className="mt-1 text-xs text-sage-500">{mk.relevance}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Counterpoint */}
      {result.counterpoint && (
        <CounterpointSection text={result.counterpoint} />
      )}

      {/* Similar cases */}
      {result.similarCases.length > 0 && (
        <SimilarCases cases={result.similarCases} />
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Link
          to="/decide"
          state={{ fromResult: true }}
          className="flex-1 rounded-xl bg-sage-800 py-3 text-center text-sm font-medium text-white transition-all hover:bg-sage-700 active:scale-[0.98]"
        >
          再做新决策
        </Link>
        <Link
          to="/history"
          className="rounded-xl border border-sage-200 bg-white px-6 py-3 text-sm font-medium text-sage-600 transition-all hover:bg-sage-50 active:scale-[0.98]"
        >
          查看历史
        </Link>
      </div>
    </div>
  )
}
