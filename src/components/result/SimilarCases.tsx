import type { SimilarCase } from '../../types'

interface SimilarCasesProps {
  cases: SimilarCase[]
}

export function SimilarCases({ cases }: SimilarCasesProps) {
  return (
    <div className="card-shadow rounded-xl bg-white p-5">
      <h3 className="mb-3 text-sm font-semibold text-sage-600">📖 相似情境参考</h3>
      <div className="space-y-3">
        {cases.map((c, i) => (
          <div key={i} className="rounded-lg border border-sage-100 p-3">
            <p className="text-sm font-medium text-sage-700">{c.scenario}</p>
            <p className="mt-1 text-xs leading-relaxed text-sage-500">{c.outcome}</p>
            {c.appliedTheories && c.appliedTheories.length > 0 && (
              <p className="mt-1 text-[10px] text-sage-400">
                涉及理论：{c.appliedTheories.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
