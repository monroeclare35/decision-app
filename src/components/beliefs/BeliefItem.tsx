import { useState } from 'react'

interface BeliefItemProps {
  text: string
  isEditing: boolean
  onEdit: () => void
  onSave: (text: string) => void
  onCancel: () => void
  onDelete: () => void
}

export function BeliefItem({ text, isEditing, onEdit, onSave, onCancel, onDelete }: BeliefItemProps) {
  const [editText, setEditText] = useState(text)

  if (isEditing) {
    return (
      <div className="card rounded-xl bg-white p-4">
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSave(editText)
            if (e.key === 'Escape') onCancel()
          }}
          className="w-full rounded-lg border border-primary-300 bg-primary-50/30 p-2 text-sm text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => onSave(editText)}
            className="rounded-lg bg-surface-800 px-3 py-1.5 text-xs font-medium text-white"
          >
            保存
          </button>
          <button
            onClick={onCancel}
            className="rounded-lg border border-surface-200 px-3 py-1.5 text-xs text-surface-500"
          >
            取消
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card group flex items-center gap-3 rounded-xl bg-white p-4">
      <span className="text-lg">🧭</span>
      <p className="flex-1 text-sm text-surface-700">{text}</p>
      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={onEdit}
          className="rounded-lg p-1.5 text-xs text-surface-400 hover:bg-surface-100 hover:text-surface-600"
          title="编辑"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className="rounded-lg p-1.5 text-xs text-surface-400 hover:bg-red-50 hover:text-red-500"
          title="删除"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
