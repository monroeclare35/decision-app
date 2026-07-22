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

const PLACEHOLDERS: Record<Category, string> = {
  general: '随便写，比如："要不要搬去另一个城市？拿不定主意"',
  financial: '比如："手头有2万闲钱，是出去旅游还是存起来？"',
  emotional: '比如："朋友老借钱不还，这次又开口了，不知道该怎么拒绝"',
  meal: '比如："今天特别想吃火锅，但最近在控体重，好纠结"',
  outfit: '比如："看中一件大衣小两千，挺好看的但怕买回去穿不了几次"',
}

export function DecidePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, showToast } = useAppContext()
  const { submit, isSubmitting, error } = useDecisionSubmit()
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('general')

  useEffect(() => {
    if ((location.state as { fromResult?: boolean })?.fromResult) {
      showToast('刚才的分析结果可在"历史"中查看 📋', 'info')
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
        title="拿不定主意？"
        subtitle="把让你纠结的事写下来，AI 根据你的偏好给你梳理思路。大概需要 15-30 秒。"
        icon="🎯"
      />

      {!profile?.completedOnboarding && (
        <div className="mb-4 rounded-xl border border-warm-200 bg-warm-50 p-4 text-sm text-warm-700">
          💡 还没做过偏好测评，先花两分钟做 10 道题{' '}
          <button onClick={() => navigate('/onboarding')} className="font-medium underline">测一下</button>
          ，分析会更贴合你。
        </div>
      )}

      {!hasApiKey && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          ⚠️ 先去{' '}
          <button onClick={() => navigate('/settings')} className="font-medium underline">设置</button>
          {' '}填个 API Key，才能分析
        </div>
      )}

      <div className="space-y-5">
        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-sage-600">什么事？</label>
          <CategorySelector value={category} onChange={setCategory} />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-sage-600">具体说说</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, MAX_DECISION_LENGTH))}
            placeholder={PLACEHOLDERS[category]}
            rows={5}
            className="w-full resize-none rounded-xl border border-sage-200 bg-white p-4 text-sm text-sage-800 placeholder-sage-300 transition-colors focus:border-warm-400 focus:outline-none focus:ring-2 focus:ring-warm-100"
          />
          <p className="mt-1 text-right text-xs text-sage-400">{charCount}/{MAX_DECISION_LENGTH}</p>
        </div>

        {/* Beliefs preview */}
        {beliefs.length > 0 && <BeliefsPreview beliefs={beliefs} />}

        {/* What you'll get */}
        <div className="rounded-xl border border-sage-200 bg-sage-50/50 p-4">
          <p className="text-xs font-medium text-sage-600">分析完你会看到：</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-sage-500">
            <span>🔗 跟你相关的理论</span>
            <span>🪞 另一面的视角</span>
            <span>📋 可以做什么</span>
            <span>📖 相似情境参考</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</div>
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
              <span>分析中，大概 15-30 秒...</span>
            </>
          ) : (
            <>
              <span>🧿</span>
              <span>帮我理一理</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
