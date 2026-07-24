import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'
import { runAgentLoop } from '../services/chat'
import type { AgentEvent } from '../services/chat'
import { cn } from '../utils/cn'
import type { ChatMessage } from '../types'

function msgId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
}

// ============ Sub-components ============

function TypingDots() {
  return (
    <div className="mb-4 flex gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-800 text-sm text-white">🐱</div>
      <div className="flex items-center gap-1.5 rounded-2xl border border-surface-200 bg-white px-4 py-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-surface-300" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-surface-300" style={{ animationDelay: '0.15s' }} />
        <span className="h-2 w-2 animate-pulse rounded-full bg-surface-300" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  )
}

function AnalysisCard({ analysis }: { analysis: NonNullable<AgentEvent['analysis']> }) {
  return (
    <div className="mb-4 ml-10 max-w-[85%] animate-fade-in">
      <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50/80 to-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg">🐱</span>
          <span className="text-sm font-semibold text-primary-600">咪儿的分析</span>
        </div>

        <p className="text-base font-semibold text-surface-800">{analysis.summary}</p>

        <div className="mt-3 space-y-2 text-sm leading-relaxed text-surface-600">
          {analysis.analysis.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {analysis.actionItems.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-surface-500">可以做什么</p>
            {analysis.actionItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2 rounded-xl bg-white/70 px-3 py-2 text-sm text-surface-700">
                <span className="mt-0.5 shrink-0 text-primary-400">●</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {analysis.counterpoint && (
          <div className="mt-4 rounded-xl border border-surface-200 bg-surface-50 p-3">
            <p className="text-xs font-medium text-surface-500">另一面</p>
            <p className="mt-1 text-sm text-surface-600">{analysis.counterpoint}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ScenarioChatCard({
  situation,
  options,
  theoryName,
  onSelect,
}: {
  situation: string
  options: { label: string; value: string }[]
  theoryName: string
  onSelect: (value: string) => void
}) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="mb-4 ml-10 max-w-[85%] animate-fade-in">
      <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-sm">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-500">📌 {theoryName}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-surface-700">{situation}</p>
        <div className="mt-4 space-y-2">
          {options.map((opt, i) => (
            <button
              key={opt.value}
              onClick={() => {
                if (selected) return
                setSelected(opt.value)
                setTimeout(() => onSelect(opt.value), 300)
              }}
              className={cn(
                'w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-all active:scale-[0.98]',
                selected === opt.value
                  ? 'border-primary-400 bg-primary-50 text-primary-700'
                  : 'border-surface-200 bg-white text-surface-600 hover:border-primary-200 hover:bg-primary-50/30'
              )}
            >
              <span className="mr-2 text-xs font-medium text-surface-400">{i + 1}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ ChatPage ============

export function ChatPage() {
  const { state, addChatMessage, setStreaming, showToast, clearChat } = useAppContext()
  const messages = state.chat.messages
  const isStreaming = state.chat.isStreaming

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [streamingText, setStreamingText] = useState('')
  const [currentScenario, setCurrentScenario] = useState<AgentEvent['scenario'] | null>(null)
  const [currentAnalysis, setCurrentAnalysis] = useState<AgentEvent['analysis'] | null>(null)
  const abortRef = useRef(false)

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText, currentScenario, currentAnalysis])

  // Welcome
  useEffect(() => {
    if (messages.length === 0) {
      addChatMessage({
        id: msgId(),
        role: 'assistant',
        content: '喵～有什么拿不定主意的？跟咪儿说说。',
        createdAt: new Date().toISOString(),
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSend = useCallback(
    async (text: string) => {
      const { apiKey, provider } = state.settings
      if (!apiKey) { showToast('请先在设置页填写 API Key', 'error'); return }
      if (isStreaming) return

      abortRef.current = false

      const userMsg: ChatMessage = { id: msgId(), role: 'user', content: text, createdAt: new Date().toISOString() }
      addChatMessage(userMsg)
      const allMsgs = [...messages, userMsg]

      setStreaming(true)
      let fullText = ''
      const streamingId = msgId()

      try {
        await runAgentLoop({
          config: { provider, apiKey },
          messages: allMsgs,
          onEvent: (event: AgentEvent) => {
            if (abortRef.current) return
            switch (event.type) {
              case 'text':
                fullText += event.text!
                setStreamingText(fullText)
                break

              case 'scenario':
                // If there was streaming text, save it first as a message
                if (fullText.trim()) {
                  addChatMessage({ id: streamingId, role: 'assistant', content: fullText, createdAt: new Date().toISOString() })
                  fullText = ''
                  setStreamingText('')
                }
                setCurrentScenario(event.scenario!)
                break

              case 'analysis':
                if (fullText.trim()) {
                  addChatMessage({ id: streamingId, role: 'assistant', content: fullText, createdAt: new Date().toISOString() })
                  fullText = ''
                  setStreamingText('')
                }
                setCurrentAnalysis(event.analysis!)
                break

              case 'error':
                showToast(event.error || '出错了', 'error')
                break
            }
          },
        })

        // Save any remaining streaming text
        if (fullText.trim()) {
          addChatMessage({ id: streamingId, role: 'assistant', content: fullText, createdAt: new Date().toISOString() })
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : '发送失败'
        showToast(message, 'error')
      } finally {
        setStreaming(false)
        setStreamingText('')
      }
    },
    [messages, state.settings, isStreaming, addChatMessage, setStreaming, showToast]
  )

  const handleScenarioSelect = useCallback(
    (value: string) => {
      if (!currentScenario) return
      const optionLabel = currentScenario.options.find((o) => o.value === value)?.label || value

      // Record the scenario answer as a user message
      const userMsg: ChatMessage = {
        id: msgId(),
        role: 'user',
        content: `我选「${optionLabel}」`,
        createdAt: new Date().toISOString(),
      }
      addChatMessage(userMsg)

      // Also add an assistant message with the theory reveal
      addChatMessage({
        id: msgId(),
        role: 'assistant',
        content: `你选了「${optionLabel}」。这个情景探测的是「${currentScenario.theoryName}」：${currentScenario.theoryContent}。咪儿回头分析时会参考你的这个选择。`,
        createdAt: new Date().toISOString(),
      })

      setCurrentScenario(null)

      // Continue the conversation — ask AI to process the choice
      const allMsgs = [...messages, userMsg]
      setStreaming(true)
      let fullText = ''
      const streamingId = msgId()

      runAgentLoop({
        config: { provider: state.settings.provider, apiKey: state.settings.apiKey },
        messages: allMsgs,
        onEvent: (event: AgentEvent) => {
          if (event.type === 'text') {
            fullText += event.text!
            setStreamingText(fullText)
          } else if (event.type === 'analysis') {
            if (fullText.trim()) {
              addChatMessage({ id: streamingId, role: 'assistant', content: fullText, createdAt: new Date().toISOString() })
              fullText = ''
              setStreamingText('')
            }
            setCurrentAnalysis(event.analysis!)
          }
        },
      }).then(() => {
        if (fullText.trim()) {
          addChatMessage({ id: streamingId, role: 'assistant', content: fullText, createdAt: new Date().toISOString() })
        }
        setStreaming(false)
        setStreamingText('')
      }).catch((err) => {
        showToast(err instanceof Error ? err.message : '出错了', 'error')
        setStreaming(false)
        setStreamingText('')
      })
    },
    [currentScenario, messages, state.settings, addChatMessage, setStreaming, showToast]
  )

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-100 px-4 py-3">
        <Link to="/" className="text-xs text-surface-400 transition-colors hover:text-surface-600">← 首页</Link>
        <div className="flex items-center gap-2">
          <span className="text-lg">🐱</span>
          <span className="text-sm font-medium text-surface-700">跟咪儿聊聊</span>
        </div>
        <button
          onClick={() => { if (window.confirm('清空对话？')) clearChat() }}
          className="text-xs text-surface-300 transition-colors hover:text-surface-500"
        >清空</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} msg={msg} />
        ))}

        {/* Streaming text */}
        {isStreaming && streamingText && (
          <ChatBubble msg={{ id: 'streaming', role: 'assistant', content: streamingText, createdAt: '' }} />
        )}

        {/* Typing */}
        {isStreaming && !streamingText && !currentScenario && !currentAnalysis && <TypingDots />}

        {/* Scenario card */}
        {currentScenario && (
          <ScenarioChatCard
            situation={currentScenario.situation}
            options={currentScenario.options}
            theoryName={currentScenario.theoryName}
            onSelect={handleScenarioSelect}
          />
        )}

        {/* Analysis */}
        {currentAnalysis && <AnalysisCard analysis={currentAnalysis} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isStreaming} />
    </div>
  )
}

// ============ ChatBubble ============

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user'

  return (
    <div className={cn('mb-4 flex gap-2', isUser && 'flex-row-reverse')}>
      <div className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs',
        isUser ? 'bg-surface-200 text-surface-500' : 'bg-surface-800 text-white'
      )}>
        {isUser ? '你' : '🐱'}
      </div>
      <div className={cn(
        'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
        isUser ? 'bg-primary-50 text-surface-700' : 'bg-white border border-surface-100 text-surface-700 shadow-sm'
      )}>
        {msg.content.split('\n').map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
        ))}
      </div>
    </div>
  )
}

// ============ ChatInput ============

function ChatInput({ onSend, disabled }: { onSend: (text: string) => void; disabled: boolean }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  return (
    <div className="border-t border-surface-100 bg-white px-4 py-3">
      <div className="flex items-end gap-2 rounded-2xl border border-surface-200 bg-surface-50 px-4 py-2 focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (textareaRef.current) {
              textareaRef.current.style.height = 'auto'
              textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
          }}
          placeholder="跟咪儿说说…"
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none bg-transparent py-1 text-sm text-surface-800 placeholder-surface-300 outline-none disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-800 text-white transition-all hover:bg-surface-700 active:scale-90 disabled:opacity-20"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
        </button>
      </div>
    </div>
  )
}
