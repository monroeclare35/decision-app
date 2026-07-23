import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'
import { PageHeader } from '../components/layout/PageHeader'
import { CategorySelector } from '../components/decision/CategorySelector'
import { BeliefsPreview } from '../components/decision/BeliefsPreview'
import type { Category } from '../types'
import { MAX_DECISION_LENGTH } from '../constants/config'

const PLACEHOLDERS: Record<Category, string> = {
  love: '比如："异地半年了有点累，不知道该怎么开口谈"',
  money: '比如："手头有2万闲钱，出去玩还是存起来，拿不定主意"',
  study_work: '比如："大三了特别焦虑绩点，不知道考研还是直接工作"',
  social: '比如："室友天天打游戏到凌晨，想说说又怕关系搞僵"',
  daily: '比如："最近什么都不想干，状态很差，该怎么调整"',
}

export function DecidePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, showToast, dispatch } = useAppContext()

  // Restore draft on mount
  const savedDraft = state.decisions.currentDraft
  const [description, setDescription] = useState(savedDraft?.description || '')
  const [category, setCategory] = useState<Category>(savedDraft?.category || 'daily')

  // Save draft on every change
  useEffect(() => {
    dispatch({
      type: 'SET_DRAFT',
      payload: description.trim() ? { description, category } : null,
    })
  }, [description, category, dispatch])

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

  const handleSubmit = () => {
    if (!description.trim() || !hasApiKey) return
    dispatch({ type: 'SET_DRAFT', payload: null })
    navigate('/probing', { state: { dilemma: description, category } })
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="拿不定主意？"
        subtitle="人，咪儿和你一起想"
        icon="🎯"
      />

      {!profile?.completedOnboarding && (
        <div className="mb-4 rounded-xl border border-primary-200 bg-primary-50 p-4 text-sm text-primary-700">
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
          <label className="mb-2 block text-sm font-medium text-surface-600">什么事？</label>
          <CategorySelector value={category} onChange={setCategory} />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-surface-600">具体说说</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, MAX_DECISION_LENGTH))}
            placeholder={PLACEHOLDERS[category]}
            rows={5}
            className="w-full resize-none rounded-xl border border-surface-200 bg-white p-4 text-sm text-surface-800 placeholder-surface-300 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <p className="mt-1 text-right text-xs text-surface-400">{charCount}/{MAX_DECISION_LENGTH}</p>
        </div>

        {/* Beliefs preview */}
        {beliefs.length > 0 && <BeliefsPreview beliefs={beliefs} />}

        {/* What you'll get */}
        <div className="rounded-xl border border-surface-200 bg-surface-50/50 p-4">
          <p className="text-xs font-medium text-surface-600">分析完你会看到：</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-surface-500">
            <span>🔗 跟你相关的理论</span>
            <span>🪞 另一面的视角</span>
            <span>📋 可以做什么</span>
            <span>📖 相似情境参考</span>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!description.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-surface-800 py-4 text-base font-medium text-white transition-all hover:bg-surface-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>🐱</span>
          <span>帮我理一理</span>
        </button>
      </div>
    </div>
  )
}
