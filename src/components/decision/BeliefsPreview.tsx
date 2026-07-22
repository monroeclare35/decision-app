import { useState } from 'react'

interface BeliefsPreviewProps {
  beliefs: string[]
}

export function BeliefsPreview({ beliefs }: BeliefsPreviewProps) {
  const [expanded, setExpanded] = useState(false)

  if (beliefs.length === 0) return null

  return (
    <div className="rounded-xl border border-surface-200 bg-surface-50/50 p-4">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-sm"
      >
        <span className="font-medium text-surface-600">
          🧭 你的核心信念 ({beliefs.length})
        </span>
        <span className="text-xs text-surface-400">
          {expanded ? '收起 ▲' : '展开 ▼'}
        </span>
      </button>
      {expanded && (
        <ul className="mt-3 space-y-1.5">
          {beliefs.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-surface-600"
            >
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-xs text-surface-400">
        这些信念将在 AI 分析时被作为核心原则参考
      </p>
    </div>
  )
}
