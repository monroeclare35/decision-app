import { useState } from 'react'
import { useAppContext } from '../hooks/useAppContext'
import { PageHeader } from '../components/layout/PageHeader'
import { BeliefItem } from '../components/beliefs/BeliefItem'
import { AddBeliefForm } from '../components/beliefs/AddBeliefForm'
import { BeliefGuidance } from '../components/beliefs/BeliefGuidance'
import { MAX_BELIEFS } from '../constants/config'

export function BeliefsPage() {
  const { state, addBelief, removeBelief, updateBelief } = useAppContext()
  const beliefs = state.user.profile?.beliefs || []
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="核心信念"
        subtitle="这些信念会贯穿你所有的决策分析"
        icon="🧭"
      />

      <BeliefGuidance />

      <div className="mt-5 space-y-2">
        {beliefs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-surface-200 p-8 text-center">
            <span className="text-3xl">🧭</span>
            <p className="mt-2 text-sm text-surface-500">
              还没有添加核心信念
            </p>
            <p className="mt-1 text-xs text-surface-400">
              比如："我要减熵"、"保持长期主义"、"健康第一"
            </p>
          </div>
        ) : (
          beliefs.map((belief, i) => (
            <BeliefItem
              key={i}
              text={belief}
              isEditing={editingIndex === i}
              onEdit={() => setEditingIndex(i)}
              onSave={(text) => {
                updateBelief(i, text)
                setEditingIndex(null)
              }}
              onCancel={() => setEditingIndex(null)}
              onDelete={() => removeBelief(i)}
            />
          ))
        )}
      </div>

      {beliefs.length < MAX_BELIEFS && (
        <div className="mt-4">
          <AddBeliefForm
            onAdd={(text) => addBelief(text)}
            disabled={beliefs.length >= MAX_BELIEFS}
          />
        </div>
      )}

      {beliefs.length >= MAX_BELIEFS && (
        <p className="mt-4 text-center text-xs text-surface-400">
          最多 {MAX_BELIEFS} 条核心信念
        </p>
      )}
    </div>
  )
}
