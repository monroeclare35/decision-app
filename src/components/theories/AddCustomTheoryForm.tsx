import { useState } from 'react'
import type { Domain, Theory } from '../../types'
import { DOMAIN_LABELS } from '../../types'
import { generateId } from '../../utils/id'
import { autoCompleteTheory } from '../../services/ai'
import { useAppContext } from '../../hooks/useAppContext'
import { LoadingSpinner } from '../shared/LoadingSpinner'
import { cn } from '../../utils/cn'

interface AddCustomTheoryFormProps {
  onAdd: (theory: Theory) => void
}

export function AddCustomTheoryForm({ onAdd }: AddCustomTheoryFormProps) {
  const { state, showToast } = useAppContext()
  const [expanded, setExpanded] = useState(false)
  const [concept, setConcept] = useState('')
  const [content, setContent] = useState('')
  const [domain, setDomain] = useState<Domain>('wisdom')
  const [tags, setTags] = useState('')
  const [isAutocompleting, setIsAutocompleting] = useState(false)
  const [hasAutocompleted, setHasAutocompleted] = useState(false)

  const handleAutoComplete = async () => {
    if (!concept.trim() || isAutocompleting) return

    const { apiKey, provider } = state.settings
    if (!apiKey) {
      showToast('请先在设置页填写 API Key', 'error')
      return
    }

    setIsAutocompleting(true)
    try {
      const result = await autoCompleteTheory({
        config: { provider, apiKey },
        concept: concept.trim(),
      })
      setContent(result.content)
      setDomain(result.domain as Domain)
      setTags(result.tags.join(', '))
      setHasAutocompleted(true)
      showToast('AI 已帮你补全 ✨', 'success')
    } catch (err) {
      showToast('自动补全失败，请手动填写', 'error')
    } finally {
      setIsAutocompleting(false)
    }
  }

  const handleSubmit = () => {
    if (!content.trim()) return
    onAdd({
      id: generateId('custom'),
      content: content.trim(),
      domain,
      tags: tags
        .split(/[,，、]/)
        .map((t) => t.trim())
        .filter(Boolean),
      source: 'user',
      createdAt: new Date().toISOString(),
    })
    setConcept('')
    setContent('')
    setTags('')
    setHasAutocompleted(false)
    setExpanded(false)
    showToast('理论已添加', 'success')
  }

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full rounded-xl border border-dashed border-surface-300 py-4 text-sm text-surface-500 transition-colors hover:border-surface-400 hover:text-surface-600"
      >
        + 添加一条你自己的理论
      </button>
    )
  }

  return (
    <div className="card rounded-xl bg-white p-4 space-y-3">
      {/* Step 1: Concept name + AI button */}
      <div>
        <label className="mb-1 block text-xs font-medium text-surface-500">
          你想添加什么理论？写个名字就行，AI 帮你补全
        </label>
        <div className="flex gap-2">
          <input
            value={concept}
            onChange={(e) => {
              setConcept(e.target.value)
              setHasAutocompleted(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAutoComplete()
            }}
            placeholder="比如：一万小时定律、墨菲定律..."
            className="flex-1 rounded-lg border border-surface-200 px-3 py-2.5 text-sm text-surface-800 placeholder-surface-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <button
            onClick={handleAutoComplete}
            disabled={!concept.trim() || isAutocompleting}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
              'bg-primary-500 text-white hover:bg-primary-600 active:scale-95',
              'disabled:cursor-not-allowed disabled:opacity-40'
            )}
          >
            {isAutocompleting ? (
              <LoadingSpinner size="sm" />
            ) : (
              <span>✨ AI 补全</span>
            )}
          </button>
        </div>
      </div>

      {/* Step 2: Completed fields (shown after AI or for manual editing) */}
      {(hasAutocompleted || content) && (
        <div className="space-y-3 animate-slide-up">
          <div>
            <label className="mb-1 block text-xs font-medium text-surface-500">
              理论内容（可修改）
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-surface-200 p-3 text-sm text-surface-800 placeholder-surface-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value as Domain)}
              className="rounded-lg border border-surface-200 bg-white px-3 py-2 text-xs text-surface-600"
            >
              {(Object.keys(DOMAIN_LABELS) as Domain[]).map((d) => (
                <option key={d} value={d}>
                  {DOMAIN_LABELS[d]}
                </option>
              ))}
            </select>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="标签，逗号分隔"
              className="flex-1 rounded-lg border border-surface-200 px-3 py-2 text-xs text-surface-800 placeholder-surface-300 focus:border-primary-400 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="rounded-lg bg-surface-800 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-surface-700 disabled:opacity-40"
            >
              添加到理论库
            </button>
            <button
              onClick={() => setExpanded(false)}
              className="rounded-lg border border-surface-200 px-4 py-2 text-xs text-surface-500"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
