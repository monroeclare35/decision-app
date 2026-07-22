import { useState } from 'react'

interface CounterpointSectionProps {
  text: string
}

export function CounterpointSection({ text }: CounterpointSectionProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card rounded-xl border border-surface-200 bg-surface-50/50 p-5">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between"
      >
        <h3 className="text-sm font-semibold text-surface-600">🪞 换个角度看看</h3>
        <span className="text-xs text-surface-400">
          {expanded ? '收起 ▲' : '展开 ▼'}
        </span>
      </button>
      {expanded && (
        <p className="mt-3 text-sm leading-relaxed text-surface-600">{text}</p>
      )}
    </div>
  )
}
