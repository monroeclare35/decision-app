import { useState } from 'react'

interface CounterpointSectionProps {
  text: string
}

export function CounterpointSection({ text }: CounterpointSectionProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card-shadow rounded-xl border border-sage-200 bg-sage-50/50 p-5">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between"
      >
        <h3 className="text-sm font-semibold text-sage-600">🪞 换个角度看看</h3>
        <span className="text-xs text-sage-400">
          {expanded ? '收起 ▲' : '展开 ▼'}
        </span>
      </button>
      {expanded && (
        <p className="mt-3 text-sm leading-relaxed text-sage-600">{text}</p>
      )}
    </div>
  )
}
