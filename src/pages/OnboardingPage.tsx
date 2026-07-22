import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../hooks/useOnboarding'
import { ProgressBar } from '../components/onboarding/ProgressBar'
import { TheoryCard } from '../components/onboarding/TheoryCard'
import { FingerprintSummary } from '../components/onboarding/FingerprintSummary'
import { useAppContext } from '../hooks/useAppContext'
import { ONBOARDING_TOTAL } from '../constants/config'
import { cn } from '../utils/cn'

export function OnboardingPage() {
  const navigate = useNavigate()
  const {
    currentTheory,
    ratedCount,
    isComplete,
    onboardingIndex,
    goToIndex,
    next,
    prev,
    rateOnly,
    rateAndNext,
    skipAndNext,
    complete,
  } = useOnboarding()
  const { state } = useAppContext()
  const { userRatings } = state.theories
  const { library: theories } = state.theories

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
        <p className="text-sage-500">正在生成你的决策指纹...</p>
      </div>
    )
  }

  if (!currentTheory) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-sage-500">理论数据加载中...</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-warm-500 underline"
        >
          返回首页
        </button>
      </div>
    )
  }

  // Compute rated/unrated counts per theory for overview
  const ratedList = theories.map((t, i) => ({
    index: i,
    id: t.id,
    content: t.content.slice(0, 30) + '...',
    rating: userRatings[t.id] ?? null,
  }))

  const unratedCount = ratedList.filter((r) => r.rating === null).length

  return (
    <div className="flex min-h-screen flex-col px-4 pb-8 pt-6">
      {/* Top bar */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-sage-400 hover:text-sage-600"
          >
            ← 退出
          </button>
          <span className="text-xs font-medium text-sage-500">
            第 {Math.min(onboardingIndex + 1, ONBOARDING_TOTAL)} / {ONBOARDING_TOTAL} 条
          </span>
          <button
            onClick={() => setShowProgressOverview(!showProgressOverview)}
            className={cn(
              'text-xs transition-colors',
              showProgressOverview ? 'text-warm-500' : 'text-sage-400 hover:text-sage-600'
            )}
          >
            {showProgressOverview ? '收起总览' : '查看进度'}
          </button>
        </div>
        <ProgressBar ratedCount={ratedCount} />
      </div>

      {/* Progress overview (expandable) */}
      {showProgressOverview && (
        <div className="mb-4 animate-slide-up rounded-xl border border-sage-200 bg-white p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-sage-500">
            <span>答题进度总览</span>
            <span>
              已评 {ratedCount} · 未评 {unratedCount}
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
                      ? 'bg-warm-400 text-white'
                      : item.rating >= 2
                      ? 'bg-sage-300 text-white'
                      : 'bg-sage-200 text-sage-600'
                    : 'border border-dashed border-sage-300 text-sage-400',
                  item.index === onboardingIndex && 'ring-2 ring-warm-300 ring-offset-1'
                )}
              >
                {item.index + 1}
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-sage-400">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-warm-400" /> 认同
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-sage-300" /> 中性
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-sage-200" /> 不认同
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded border border-dashed border-sage-300" /> 未评
            </span>
          </div>
        </div>
      )}

      {/* Theory Card */}
      <div className="flex-1">
        <TheoryCard
          key={currentTheory.id}
          theory={currentTheory}
          currentRating={userRatings[currentTheory.id]}
          onRate={(theoryId, score) => {
            rateAndNext(theoryId, score)
            // Don't auto-advance past the last theory
          }}
          onSkip={skipAndNext}
        />
      </div>

      {/* Navigation buttons */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          onClick={prev}
          disabled={onboardingIndex === 0}
          className="rounded-xl border border-sage-200 px-5 py-3 text-sm text-sage-600 transition-all hover:bg-sage-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← 上一题
        </button>

        <button
          onClick={next}
          disabled={onboardingIndex >= ONBOARDING_TOTAL - 1}
          className="rounded-xl border border-sage-200 px-5 py-3 text-sm text-sage-600 transition-all hover:bg-sage-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
        >
          下一题 →
        </button>

        {ratedCount >= 5 && !isComplete && (
          <button
            onClick={() => {
              if (window.confirm(`你已评价了 ${ratedCount} 条理论（共 ${ONBOARDING_TOTAL} 条），未评的将记为中立。确定提交吗？`)) {
                // Mark remaining as neutral — rate only, don't auto-advance
                theories.forEach((t) => {
                  if (userRatings[t.id] === undefined) {
                    rateOnly(t.id, 3)
                  }
                })
                // Jump to end
                goToIndex(ONBOARDING_TOTAL)
                setShowSummary(true)
              }
            }}
            className="rounded-xl bg-warm-500 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-warm-600 active:scale-95"
          >
            交卷
          </button>
        )}
      </div>
    </div>
  )
}
