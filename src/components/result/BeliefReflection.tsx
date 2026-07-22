import type { BeliefReflection as BeliefReflectionType } from '../../types'

interface BeliefReflectionProps {
  reflections: BeliefReflectionType[]
}

export function BeliefReflection({ reflections }: BeliefReflectionProps) {
  return (
    <div className="card rounded-xl bg-white p-5">
      <h3 className="mb-3 text-sm font-semibold text-surface-600">🧭 核心信念如何影响了分析</h3>
      <div className="space-y-3">
        {reflections.map((r, i) => (
          <div key={i} className="rounded-lg bg-primary-50/50 p-3">
            <p className="text-sm font-medium text-primary-700">"{r.belief}"</p>
            <p className="mt-1 text-xs leading-relaxed text-surface-600">{r.influence}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export type { BeliefReflectionType }
