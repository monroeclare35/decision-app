import { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'
import { useProbing } from '../hooks/useProbing'
import { useDecisionSubmit } from '../hooks/useDecisionSubmit'
import { generateProbeScenarios } from '../services/ai'
import { ScenarioCard } from '../components/onboarding/ScenarioCard'
import { PROBE_SCENARIO_COUNT } from '../constants/config'
import type { Category, DecisionProbeState } from '../types'

// Loading stages — labels for the progress bar
const LOADING_STAGES = [
  { label: '分析你的困境…', pct: 30 },
  { label: '匹配相关理论…', pct: 60 },
  { label: '生成探测情景…', pct: 90 },
]

const LOADING_DURATION = 3000 // target 3 seconds for smooth bar fill

function getStage(pct: number): number {
  if (pct >= 60) return 2
  if (pct >= 30) return 1
  return 0
}

export function ProbingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, setProbeState } = useAppContext()
  const { submitFinalAnalysis, isSubmitting: isAnalyzing } = useDecisionSubmit()
  const {
    probeState,
    currentScenario,
    currentPhase,
    totalScenarios,
    progress,
    isLoading: isGeneratingFollowUp,
    error,
    answerCurrent,
    skipCurrent,
  } = useProbing()

  // Incoming dilemma from DecidePage
  const incoming = (location.state as { dilemma?: string; category?: Category } | null)
  const hasIncoming = !!incoming?.dilemma
  const generatingRef = useRef(false)

  const [isGeneratingProbes, setIsGeneratingProbes] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0)
  const [loadingBarPct, setLoadingBarPct] = useState(0)

  // Generate probe scenarios on mount — AI call + progress bar run in parallel
  useEffect(() => {
    if (!hasIncoming || generatingRef.current) return
    generatingRef.current = true

    const generate = async () => {
      const { apiKey, provider } = state.settings
      if (!apiKey || !incoming?.dilemma) {
        navigate('/decide', { replace: true })
        return
      }

      setIsGeneratingProbes(true)
      setLoadingBarPct(0)
      setLoadingStage(0)

      // Build theories summary first
      const theories = state.theories.library
      const theoriesSummary = theories
        .slice(0, 50)
        .map((t) => `[${t.id}] ${t.content} (领域: ${t.domain})`)
        .join('\n')

      // Start AI call immediately
      const aiPromise = generateProbeScenarios({
        config: { provider, apiKey },
        dilemma: incoming.dilemma,
        category: incoming.category || 'daily',
        theoriesSummary,
        count: PROBE_SCENARIO_COUNT,
      })

      // Run smooth progress bar in parallel
      const startTime = Date.now()
      const tickInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const smoothPct = Math.min(90, Math.round((elapsed / LOADING_DURATION) * 90))
        setLoadingBarPct(smoothPct)
        setLoadingStage(getStage(smoothPct))
      }, 50)

      try {
        const probeScenarios = await aiPromise
        clearInterval(tickInterval)

        // Complete the bar
        setLoadingBarPct(100)
        setLoadingStage(2)
        await new Promise((r) => setTimeout(r, 200))

        // Clear location state so refresh doesn't re-trigger
        window.history.replaceState({}, '')

        const probeState: DecisionProbeState = {
          phase: 'probing',
          probeScenarios,
          followUpScenarios: [],
          scenarioAnswers: [],
          currentIndex: 0,
          dilemma: incoming.dilemma,
          category: incoming.category || 'daily',
        }
        setProbeState(probeState)
      } catch (err) {
        navigate('/decide', { replace: true })
      } finally {
        setIsGeneratingProbes(false)
      }
    }

    generate()
  }, [hasIncoming])

  // Redirect if no probe state and no incoming
  useEffect(() => {
    if (!state.probing.currentState && !hasIncoming) {
      navigate('/decide', { replace: true })
    }
  }, [state.probing.currentState, hasIncoming, navigate])

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

  // --- Loading: initial probe generation ---
  const barWaiting = loadingBarPct >= 90 && loadingBarPct < 100
  if (isGeneratingProbes) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <span className="text-5xl">🐱</span>
        <h3 className="mt-4 text-lg font-semibold text-surface-700">
          {LOADING_STAGES[loadingStage]?.label}
        </h3>

        {/* Progress bar — smooth, with shimmer when waiting */}
        <div className="relative mt-6 h-2 w-64 overflow-hidden rounded-full bg-surface-100">
          <div
            className={`h-full rounded-full transition-[width] duration-100 ease-linear ${
              barWaiting ? 'bg-primary-400 animate-pulse' : 'bg-primary-400'
            }`}
            style={{ width: `${loadingBarPct}%` }}
          />
          {barWaiting && (
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          )}
        </div>

        <p className="mt-3 text-xs text-surface-400">
          {barWaiting ? 'AI 正在生成情景，稍等…' : '正在为你定制探测情景…'}
        </p>
      </div>
    )
  }

  // --- Loading: generating follow-up or final analysis ---
  if (isGeneratingFollowUp || isAnalyzing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4">
        <span className="text-4xl">🔍</span>
        <p className="text-sm text-surface-500">
          {isGeneratingFollowUp ? '正在分析你的回答…' : '正在综合分析，生成建议…'}
        </p>
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-surface-100">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-primary-300" />
        </div>
      </div>
    )
  }

  // No probe state (redirecting or nothing to show)
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
      ? '以下是根据你的困境生成的情景，按真实想法选'
      : '发现了你回答中的矛盾，再追问几道'

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
            onClick={async () => {
              const decisionId = await submitFinalAnalysis()
              if (decisionId) navigate(`/result/${decisionId}`, { replace: true })
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
