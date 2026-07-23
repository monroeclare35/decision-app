import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../hooks/useOnboarding'
import { ProgressBar } from '../components/onboarding/ProgressBar'
import { ScenarioCard } from '../components/onboarding/ScenarioCard'
import { FingerprintSummary } from '../components/onboarding/FingerprintSummary'
import { useAppContext } from '../hooks/useAppContext'
import { ONBOARDING_TOTAL } from '../constants/config'
import { ONBOARDING_SCENARIOS } from '../data/theories'
import { cn } from '../utils/cn'

export function OnboardingPage() {
  const navigate = useNavigate()
  const {
    currentScenario,
    answeredCount,
    isComplete,
    onboardingIndex,
    goToIndex,
    next,
    prev,
    answerAndNext,
    skipAndNext,
    complete,
  } = useOnboarding()
  const { state } = useAppContext()
  const { onboardingAnswers } = state.probing

  const [showSummary, setShowSummary] = useState(false)
  const [showProgressOverview, setShowProgressOverview] = useState(false)

  // Handle completion
  useEffect(() => {
    if (isComplete && !state.user.profile?.completedOnboarding) {
      complete()
    }
  }, [isComplete, state.user.profile?.completedOnboarding, complete])

  // When all 50 are done OR user clicked "提前交卷", show summary
  const displaySummary =
    showSummary ||
    (isComplete && state.user.profile?.completedOnboarding)

  if (displaySummary) {
    return (
      <div className="flex min-h-screen flex-col px-4 pb-8 pt-6">
        <FingerprintSummary />
      </div>
    )
  }

  // If we're at index 50 but not yet marked complete (transitional state)
  if (isComplete && !state.user.profile?.completedOnboarding) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-surface-500">正在生成你的决策指纹...</p>
      </div>
    )
  }

  if (!currentScenario) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-surface-500">理论数据加载中...</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-primary-500 underline"
        >
          返回首页
        </button>
      </div>
    )
  }

  // Compute answered/unanswered scenarios for overview
  const answeredIds = new Set(onboardingAnswers.filter((a) => a.phase === 'onboarding').map((a) => a.scenarioId))
  const ratedList = ONBOARDING_SCENARIOS.map((s, i) => ({
    index: i,
    id: s.id,
    content: s.situation.slice(0, 30) + '...',
    rating: answeredIds.has(s.id) ? 5 : null, // simplified: answered or not
  }))

  const unratedCount = ratedList.filter((r) => r.rating === null).length

  return (
    <div className="flex min-h-screen flex-col px-4 pb-8 pt-6">
      {/* Top bar */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-surface-400 hover:text-surface-600"
          >
            ← 退出
          </button>
          <span className="text-xs font-medium text-surface-500">
            第 {Math.min(onboardingIndex + 1, ONBOARDING_TOTAL)} / {ONBOARDING_TOTAL} 条
          </span>
          <button
            onClick={() => setShowProgressOverview(!showProgressOverview)}
            className={cn(
              'text-xs transition-colors',
              showProgressOverview ? 'text-primary-500' : 'text-surface-400 hover:text-surface-600'
            )}
          >
            {showProgressOverview ? '收起总览' : '查看进度'}
          </button>
        </div>
        <ProgressBar ratedCount={answeredCount} />
      </div>

      {/* Progress overview (expandable) */}
      {showProgressOverview && (
        <div className="mb-4 animate-slide-up rounded-xl border border-surface-200 bg-white p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-surface-500">
            <span>答题进度总览</span>
            <span>
              已答 {answeredCount} · 未答 {unratedCount}
            </span>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {ratedList.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  goToIndex(item.index)
                  setShowProgressOverview(false)
                }}
                title={`第 ${item.index + 1} 条${item.rating !== null ? ` · ${item.rating}分` : ' · 未评'}`}
                className={cn(
                  'h-7 w-7 rounded text-[10px] font-medium transition-all hover:scale-110',
                  item.rating !== null
                    ? item.rating >= 4
                      ? 'bg-primary-400 text-white'
                      : item.rating >= 2
                      ? 'bg-surface-300 text-white'
                      : 'bg-surface-200 text-surface-600'
                    : 'border border-dashed border-surface-300 text-surface-400',
                  item.index === onboardingIndex && 'ring-2 ring-primary-300 ring-offset-1'
                )}
              >
                {item.index + 1}
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-surface-400">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-primary-400" /> 认同
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-surface-300" /> 中性
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-surface-200" /> 不认同
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded border border-dashed border-surface-300" /> 未评
            </span>
          </div>
        </div>
      )}

      {/* Scenario Card */}
      <div className="flex-1">
        <ScenarioCard
          key={currentScenario.id}
          situation={currentScenario.situation}
          options={currentScenario.options}
          domain={currentScenario.domain}
          tags={currentScenario.tags}
          onSelect={(optionValue) => {
            answerAndNext(currentScenario.id, optionValue)
          }}
        />
      </div>

      {/* Navigation buttons */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          onClick={prev}
          disabled={onboardingIndex === 0}
          className="rounded-xl border border-surface-200 px-5 py-3 text-sm text-surface-600 transition-all hover:bg-surface-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← 上一题
        </button>

        <button
          onClick={next}
          disabled={onboardingIndex >= ONBOARDING_TOTAL - 1}
          className="rounded-xl border border-surface-200 px-5 py-3 text-sm text-surface-600 transition-all hover:bg-surface-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
        >
          下一题 →
        </button>

        {answeredCount >= 5 && !isComplete && (
          <button
            onClick={() => {
              if (window.confirm(`你已答了 ${answeredCount} 道情景题（共 ${ONBOARDING_TOTAL} 道），未答的将记为跳过。确定提交吗？`)) {
                // Mark remaining as skipped
                ONBOARDING_SCENARIOS.forEach((s) => {
                  if (!answeredIds.has(s.id)) {
                    skipAndNext(s.id)
                  }
                })
                goToIndex(ONBOARDING_TOTAL)
                setShowSummary(true)
              }
            }}
            className="rounded-xl bg-primary-500 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-primary-600 active:scale-95"
          >
            交卷
          </button>
        )}
      </div>
    </div>
  )
}
