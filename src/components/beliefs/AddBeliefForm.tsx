import { useState } from 'react'
import { MAX_BELIEF_LENGTH } from '../../constants/config'

interface AddBeliefFormProps {
  onAdd: (text: string) => void
  disabled: boolean
}

export function AddBeliefForm({ onAdd, disabled }: AddBeliefFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (text.trim() && !disabled) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, MAX_BELIEF_LENGTH))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit()
        }}
        placeholder="添加一条你的核心信念..."
        disabled={disabled}
        className="flex-1 rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-sage-800 placeholder-sage-300 transition-colors focus:border-warm-400 focus:outline-none focus:ring-2 focus:ring-warm-100 disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
        className="rounded-xl bg-sage-800 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-sage-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        添加
      </button>
    </div>
  )
}
