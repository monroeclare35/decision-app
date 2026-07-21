import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'
import { useDecisionSubmit } from '../hooks/useDecisionSubmit'
import { PageHeader } from '../components/layout/PageHeader'
import { CategorySelector } from '../components/decision/CategorySelector'
import { BeliefsPreview } from '../components/decision/BeliefsPreview'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import type { Category } from '../types'
import { MAX_DECISION_LENGTH } from '../constants/config'

export function DecidePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, showToast } = useAppContext()
  const { submit, isSubmitting, error } = useDecisionSubmit()
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('general')

  // Show a toast if user navigated back from a result page
  useEffect(() => {
    if ((location.state as { fromResult?: boolean })?.fromResult) {
      showToast('刚才的分析结果可在"历史"中查看 📋', 'info')
      // Clear the state so it doesn't re-trigger on re-renders
      window.history.replaceState({}, '')
    }
  }, [location.state, showToast])

  const { profile } = state.user
  const beliefs = profile?.beliefs || []
  const hasApiKey = !!state.settings.apiKey
  const charCount = description.length

  const handleSubmit = async () => {
    if (!description.trim()) return
    const decisionId = await submit(description, category)
    if (decisionId) {
      navigate(`/result/${decisionId}`)
    }
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="做决定"
        subtitle="描述你正在纠结的事，让 AI 用你的方式帮你理清思路"
        icon="🎯"
      />

      {!profile?.completedOnboarding && (
        <div className="mb-4 rounded-xl border border-warm-200 bg-warm-50 p-4 text-sm text-warm-700">
          💡 提示：完成{' '}
          <button
            onClick={() => navigate('/onboarding')}
            className="font-medium underline"
          >
            决策指纹测评
          </button>
          {' '}能让我更了解你的偏好，建议更精准
        </div>
      )}

      {!hasApiKey && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          ⚠️ 请先前往{' '}
          <button
            onClick={() => navigate('/settings')}
            className="font-medium underline"
          >
            设置页面
          </button>
          {' '}填写 API Key
        </div>
      )}

      <div className="space-y-5">
        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-sage-600">
            决策类别
          </label>
          <CategorySelector value={category} onChange={setCategory} />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-sage-600">
            描述你的困境
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, MAX_DECISION_LENGTH))}
            placeholder="比如：最近想买一台相机，预算5000，但又在纠结是不是该把这笔钱投入基金..."
            rows={5}
            className="w-full resize-none rounded-xl border border-sage-200 bg-white p-4 text-sm text-sage-800 placeholder-sage-300 transition-colors focus:border-warm-400 focus:outline-none focus:ring-2 focus:ring-warm-100"
          />
          <p className="mt-1 text-right text-xs text-sage-400">
            {charCount}/{MAX_DECISION_LENGTH}
          </p>
        </div>

        {/* Beliefs preview */}
        {beliefs.length > 0 && <BeliefsPreview beliefs={beliefs} />}

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !description.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sage-800 py-4 text-base font-medium text-white transition-all hover:bg-sage-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" />
              <span>正在分析...</span>
            </>
          ) : (
            <>
              <span>🧿</span>
              <span>帮我分析</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
