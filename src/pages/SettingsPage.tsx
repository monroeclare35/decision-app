import { useState } from 'react'
import { useAppContext } from '../hooks/useAppContext'
import { PageHeader } from '../components/layout/PageHeader'
import { ConfirmDialog } from '../components/shared/ConfirmDialog'
import { exportData, clearAll } from '../services/storage'
import type { AIProvider } from '../types'
import { cn } from '../utils/cn'

const PROVIDERS: { id: AIProvider; label: string; desc: string; placeholder: string }[] = [
  {
    id: 'deepseek',
    label: 'DeepSeek',
    desc: '国产大模型，性价比高',
    placeholder: 'sk-...',
  },
  {
    id: 'claude',
    label: 'Claude',
    desc: 'Anthropic 出品，深度分析更强',
    placeholder: 'sk-ant-...',
  },
]

export function SettingsPage() {
  const { state, setApiKey, setProvider, showToast } = useAppContext()
  const { apiKey, provider } = state.settings
  const [keyInput, setKeyInput] = useState(apiKey)
  const [showMasked, setShowMasked] = useState(true)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const activeProvider = PROVIDERS.find((p) => p.id === provider) || PROVIDERS[0]

  const handleSaveKey = () => {
    setApiKey(keyInput.trim())
    showToast('API Key 已保存', 'success')
  }

  const handleClearData = () => {
    clearAll()
    showToast('所有数据已清除，请刷新页面', 'info')
    setShowClearConfirm(false)
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `decision_app_backup_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('数据已导出', 'success')
  }

  const maskedKey = apiKey
    ? apiKey.slice(0, 8) + '••••••••' + apiKey.slice(-4)
    : ''

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="设置"
        subtitle="管理 AI 提供商、API Key 和数据"
        icon="⚙️"
      />

      <div className="space-y-6">
        {/* AI Provider */}
        <div className="card rounded-xl bg-white p-5">
          <h3 className="text-sm font-semibold text-surface-700">AI 提供商</h3>
          <p className="mt-1 text-xs text-surface-500">
            选择使用哪个 AI 服务来做决策分析
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                onClick={() => setProvider(p.id)}
                className={cn(
                  'rounded-xl border-2 p-3 text-left transition-all',
                  provider === p.id
                    ? 'border-primary-400 bg-primary-50'
                    : 'border-surface-200 bg-white hover:border-surface-300'
                )}
              >
                <p className="text-sm font-semibold text-surface-800">{p.label}</p>
                <p className="mt-0.5 text-[11px] text-surface-500">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* API Key */}
        <div className="card rounded-xl bg-white p-5">
          <h3 className="text-sm font-semibold text-surface-700">
            {activeProvider.label} API Key
          </h3>
          <p className="mt-1 text-xs text-surface-500">
            用于 AI 决策分析。Key 仅保存在浏览器本地。
          </p>

          {apiKey && showMasked ? (
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-surface-50 px-3 py-2 text-xs text-surface-600">
                {maskedKey}
              </code>
              <button
                onClick={() => {
                  setShowMasked(false)
                  setKeyInput(apiKey)
                }}
                className="rounded-lg border border-surface-200 px-3 py-2 text-xs text-surface-500 hover:bg-surface-50"
              >
                修改
              </button>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              <input
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder={activeProvider.placeholder}
                type="password"
                className="w-full rounded-lg border border-surface-200 px-3 py-2 text-sm text-surface-800 placeholder-surface-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <button
                onClick={handleSaveKey}
                disabled={!keyInput.trim()}
                className="rounded-lg bg-surface-800 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-surface-700 disabled:opacity-40"
              >
                保存
              </button>
              {apiKey && (
                <button
                  onClick={() => setShowMasked(true)}
                  className="ml-2 rounded-lg border border-surface-200 px-4 py-2 text-xs text-surface-500"
                >
                  取消
                </button>
              )}
            </div>
          )}

          {provider === 'deepseek' && (
            <p className="mt-3 text-[11px] text-surface-400">
              获取 Key：访问{' '}
              <a
                href="https://platform.deepseek.com/api_keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 underline"
              >
                platform.deepseek.com
              </a>
            </p>
          )}
          {provider === 'claude' && (
            <p className="mt-3 text-[11px] text-surface-400">
              获取 Key：访问{' '}
              <a
                href="https://console.anthropic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 underline"
              >
                console.anthropic.com
              </a>
            </p>
          )}
        </div>

        {/* Data management */}
        <div className="card rounded-xl bg-white p-5">
          <h3 className="text-sm font-semibold text-surface-700">数据管理</h3>
          <p className="mt-1 text-xs text-surface-500">
            导出或清除本地数据
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleExport}
              className="rounded-lg border border-surface-200 px-4 py-2 text-xs font-medium text-surface-600 transition-colors hover:bg-surface-50"
            >
              📥 导出数据
            </button>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="rounded-lg border border-red-200 px-4 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
            >
              🗑️ 清除所有数据
            </button>
          </div>
        </div>

        {/* About */}
        <div className="card rounded-xl bg-white p-5">
          <h3 className="text-sm font-semibold text-surface-700">关于</h3>
          <p className="mt-1 text-xs text-surface-500">
            慧咪 v1.0 — 基于你的个人偏好，用 AI 帮你做更好的决策。
          </p>
          <p className="mt-2 text-xs text-surface-400">
            所有数据保存在你的浏览器中。我们不会收集或上传任何个人信息。
          </p>
        </div>
      </div>

      <ConfirmDialog
        open={showClearConfirm}
        title="清除所有数据"
        message="这将删除你的决策指纹、历史记录、核心信念和所有数据。此操作不可撤销，建议先导出备份。"
        confirmLabel="确认清除"
        onConfirm={handleClearData}
        onCancel={() => setShowClearConfirm(false)}
        danger
      />
    </div>
  )
}
