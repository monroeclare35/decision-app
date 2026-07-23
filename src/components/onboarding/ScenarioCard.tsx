import { useEffect, useCallback, useState } from 'react'
import type { ScenarioOption, Domain } from '../../types'
import { DOMAIN_LABELS } from '../../types'
import { cn } from '../../utils/cn'

interface ScenarioCardProps {
  situation: string
  options: ScenarioOption[]
  selectedOption?: string | null
  onSelect: (value: string) => void
  revealedContent?: string | null   // shown after selection (the theory reveal)
  domain?: Domain
  tags?: string[]
  showResult?: boolean              // if true, shows reveal immediately
  readonly?: boolean                // for displaying past answers
}

export function ScenarioCard({
  situation,
  options,
  selectedOption,
  onSelect,
  revealedContent,
  domain,
  tags,
  showResult = false,
  readonly = false,
}: ScenarioCardProps) {
  const [localReveal, setLocalReveal] = useState(false)

  const isRevealed = showResult || localReveal || (selectedOption && readonly)
  const chosenOption = selectedOption || null

  const handleSelect = useCallback(
    (value: string) => {
      if (readonly || isRevealed) return
      onSelect(value)
      setLocalReveal(true)
    },
    [onSelect, readonly, isRevealed]
  )

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (readonly || isRevealed) return
      const num = parseInt(e.key)
      if (num >= 1 && num <= options.length) {
        handleSelect(options[num - 1].value)
      }
    },
    [handleSelect, options, readonly, isRevealed]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Reset local reveal when situation changes (new scenario)
  useEffect(() => {
    setLocalReveal(false)
  }, [situation])

  const selectedLabel = options.find((o) => o.value === chosenOption)?.label

  return (
    <div className="animate-fade-in">
      {/* Domain tag */}
      {domain && (
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600">
            {DOMAIN_LABELS[domain]}
          </span>
        </div>
      )}

      {/* Scenario story */}
      <div className="card card-lg mb-6 rounded-2xl bg-white p-8 text-center">
        <p className="text-balance text-lg leading-relaxed text-surface-800">
          {situation}
        </p>
        {tags && tags.length > 0 && !isRevealed && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-100 px-2.5 py-0.5 text-[11px] text-surface-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Options — choice mode */}
      {!isRevealed && (
        <div className="space-y-3">
          {options.map((option, i) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              disabled={readonly}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border-2 px-5 py-4 text-left transition-all',
                'hover:border-primary-300 hover:bg-primary-50/50 active:scale-[0.98]',
                'border-surface-200 bg-white',
                readonly && 'cursor-default'
              )}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-100 text-xs font-medium text-surface-600">
                {i + 1}
              </span>
              <span className="text-sm text-surface-700">{option.label}</span>
            </button>
          ))}
          <p className="text-center text-xs text-surface-400">
            按键盘 1-{options.length} 选择
          </p>
        </div>
      )}

      {/* Reveal mode */}
      {isRevealed && (
        <div className="animate-fade-in space-y-4">
          {/* Chosen option highlighted */}
          <div className="rounded-xl border-2 border-primary-300 bg-primary-50 p-5">
            <p className="mb-1 text-xs font-medium text-primary-500">你的选择</p>
            <p className="text-base font-medium text-primary-700">{selectedLabel}</p>
          </div>

          {/* Theory reveal */}
          {revealedContent && (
            <div className="rounded-xl border border-surface-200 bg-surface-50 p-5">
              <p className="mb-1 text-xs font-medium text-surface-400">这意味着什么</p>
              <p className="text-sm leading-relaxed text-surface-700">{revealedContent}</p>
            </div>
          )}

          {/* Tags shown post-reveal */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-100 px-2.5 py-0.5 text-[11px] text-surface-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
