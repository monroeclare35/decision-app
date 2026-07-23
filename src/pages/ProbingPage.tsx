import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'
import { useProbing } from '../hooks/useProbing'
import { useDecisionSubmit } from '../hooks/useDecisionSubmit'
import { ScenarioCard } from '../components/onboarding/ScenarioCard'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { PageHeader } from '../components/layout/PageHeader'
import { cn } from '../utils/cn'

export function ProbingPage() {
  const navigate = useNavigate()
  const { state } = useAppContext()
  const { submitFinalAnalysis, isSubmitting: isAnalyzing } = useDecisionSubmit()
  const {
    probeState,
    currentScenario,
    currentPhase,
    totalScenarios,
    progress,
    isLoading: isGenerating,
    error,
    answerCurrent,
    skipCurrent,
  } = useProbing()

  // Redirect if no probe state
  useEffect(() => {
    if (!state.probing.currentState) {
      navigate('/decide', { replace: true })
      return
    }
  }, [state.probing.currentState, navigate])

  // If phase is complete, submit final analysis
  useEffect(() => {
    if (probeState?.phase === 'complete') {
      const run = async () => {
        const decisionId = await submitFinalAnalysis()
        if (decisionId) {
          navigate(`/result/${decisionId}`, { replace: true })
        }
      }
      run()
    }
  }, [probeState?.phase])

  // Loading state while generating follow-up scenarios
  if (isGenerating || isAnalyzing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-surface-500">
          {isGenerating ? '正在分析你的回答，生成深化追问...' : '正在综合分析，生成个性化建议...'}
        </p>
        <p className="text-xs text-surface-400">大概需要 15-30 秒</p>
      </div>
    )
  }

  // No probe state (redirecting)
  if (!probeState) {
    return null
  }

  // Complete state (submitting)
  if (probeState.phase === 'complete') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-surface-500">正在生成你的分析报告...</p>
      </div>
    )
  }

  const phaseLabel = currentPhase === 'probing' ? '场景探测' : '深化追问'
  const phaseSubtitle =
    currentPhase === 'probing'
      ? '以下是根据你的困境生成的情景，请按真实想法选择'
      : '我们发现了你回答中的一些有意思的地方，再追问几个问题'

  return (
    <div className="flex min-h-screen flex-col px-4 pb-8 pt-6">
      {/* Header */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/decide')}
            className="text-xs text-surface-400 hover:text-surface-600"
          >
            ← 返回
          </button>
          <span className="text-xs font-medium text-surface-500">
            {phaseLabel} · 第 {Math.min((probeState.currentIndex || 0) + 1, totalScenarios)} / {totalScenarios} 题
          </span>
          <span className="text-xs text-surface-400">
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-100">
          <div
            className="h-full rounded-full bg-primary-400 transition-all duration-500"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>

      {/* Phase description */}
      <div className="mb-4 text-center">
        <p className="text-xs text-surface-400">{phaseSubtitle}</p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {error}
          <button
            onClick={() => {
              // Fallback: skip probing, go straight to analysis
              if (probeState) {
                const run = async () => {
                  const decisionId = await submitFinalAnalysis()
                  if (decisionId) navigate(`/result/${decisionId}`, { replace: true })
                }
                run()
              }
            }}
            className="ml-2 font-medium underline"
          >
            跳过探测，直接分析
          </button>
        </div>
      )}

      {/* Scenario card */}
      {currentScenario ? (
        <div className="flex-1">
          <ScenarioCard
            situation={currentScenario.situation}
            options={currentScenario.options}
            onSelect={answerCurrent}
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-surface-400">没有更多问题了</p>
        </div>
      )}

      {/* Skip button */}
      {currentScenario && (
        <div className="mt-4 text-center">
          <button
            onClick={skipCurrent}
            className="text-sm text-surface-400 underline-offset-2 transition-colors hover:text-surface-600 hover:underline"
          >
            跳过这道题
          </button>
        </div>
      )}
    </div>
  )
}
