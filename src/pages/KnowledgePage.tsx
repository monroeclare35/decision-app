import { useState } from 'react'
import { useAppContext } from '../hooks/useAppContext'
import { PageHeader } from '../components/layout/PageHeader'
import { ConfirmDialog } from '../components/shared/ConfirmDialog'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { summarizeArticle } from '../services/ai'
import { generateId } from '../utils/id'
import type { KnowledgeItem, KnowledgeType } from '../types'
import { cn } from '../utils/cn'

const TABS: { id: KnowledgeType; label: string; icon: string }[] = [
  { id: 'belief', label: '核心信念', icon: '🧭' },
  { id: 'quote', label: '金句收藏', icon: '💬' },
  { id: 'article', label: '文章笔记', icon: '📄' },
]

export function KnowledgePage() {
  const { state, addKnowledge, removeKnowledge, showToast } = useAppContext()
  const [activeTab, setActiveTab] = useState<KnowledgeType>('belief')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const items = state.knowledge.filter((k) => k.type === activeTab)

  return (
    <div className="animate-fade-in">
      <PageHeader title="知识库" subtitle={`收藏你在意的话、文章、信念，决策时AI会自动匹配`} icon="📖" />

      {/* Tabs */}
      <div className="mb-4 flex rounded-xl bg-sage-100 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 rounded-lg py-2 text-sm font-medium transition-all',
              activeTab === tab.id ? 'bg-white text-sage-800 card-shadow' : 'text-sage-500'
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Add form */}
      {activeTab === 'belief' && <AddBeliefForm onAdd={addKnowledge} showToast={showToast} />}
      {activeTab === 'quote' && <AddQuoteForm onAdd={addKnowledge} showToast={showToast} />}
      {activeTab === 'article' && <AddArticleForm onAdd={addKnowledge} showToast={showToast} state={state} />}

      {/* List */}
      <div className="mt-4 space-y-2">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-sage-200 p-8 text-center">
            <span className="text-3xl">{TABS.find((t) => t.id === activeTab)?.icon}</span>
            <p className="mt-2 text-sm text-sage-500">还没有{TABS.find((t) => t.id === activeTab)?.label}</p>
          </div>
        ) : (
          items.map((item) => (
            <KnowledgeCard
              key={item.id}
              item={item}
              onDelete={() => setDeleteId(item.id)}
            />
          ))
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="删除"
        message="确定要删除这条收藏吗？"
        confirmLabel="删除"
        onConfirm={() => { if (deleteId) { removeKnowledge(deleteId); showToast('已删除', 'info'); setDeleteId(null) } }}
        onCancel={() => setDeleteId(null)}
        danger
      />
    </div>
  )
}

// ============ Sub-components ============

function KnowledgeCard({ item, onDelete }: { item: KnowledgeItem; onDelete: () => void }) {
  return (
    <div className="card-shadow group rounded-xl bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-sage-800 whitespace-pre-wrap">{item.content}</p>
          {item.source && <p className="mt-1 text-[11px] text-sage-400 truncate">来源：{item.source}</p>}
          {item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full bg-sage-100 px-2 py-0.5 text-[10px] text-sage-500">#{t}</span>
              ))}
            </div>
          )}
          <p className="mt-1 text-[10px] text-sage-400">{new Date(item.createdAt).toLocaleDateString('zh-CN')}</p>
        </div>
        <button onClick={onDelete} className="flex-shrink-0 rounded-lg p-1.5 text-sage-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100">🗑️</button>
      </div>
    </div>
  )
}

// --- Belief ---
function AddBeliefForm({ onAdd, showToast }: { onAdd: (item: KnowledgeItem) => void; showToast: (t: string, type?: string) => void }) {
  const [text, setText] = useState('')

  const handle = () => {
    if (!text.trim()) return
    onAdd({ id: generateId('k_belief'), type: 'belief', content: text.trim(), tags: ['信念'], createdAt: new Date().toISOString() })
    setText('')
    showToast('已添加', 'success')
  }

  return (
    <div className="flex gap-2">
      <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handle() }}
        placeholder="添加一条原则，比如：我要减少生活中的熵增" className="flex-1 rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-sage-800 placeholder-sage-300 focus:border-warm-400 focus:outline-none" />
      <button onClick={handle} disabled={!text.trim()} className="rounded-xl bg-sage-800 px-5 py-3 text-sm font-medium text-white disabled:opacity-40">添加</button>
    </div>
  )
}

// --- Quote ---
function AddQuoteForm({ onAdd, showToast }: { onAdd: (item: KnowledgeItem) => void; showToast: (t: string, type?: string) => void }) {
  const [text, setText] = useState('')
  const [source, setSource] = useState('')
  const [tags, setTags] = useState('')

  const handle = () => {
    if (!text.trim()) return
    onAdd({
      id: generateId('k_quote'), type: 'quote', content: text.trim(), source: source.trim() || undefined,
      tags: tags.split(/[,，、]/).map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
    })
    setText(''); setSource(''); setTags('')
    showToast('已收藏', 'success')
  }

  return (
    <div className="card-shadow rounded-xl bg-white p-4 space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="粘贴一句你看到的好句子..." rows={3}
        className="w-full resize-none rounded-lg border border-sage-200 p-3 text-sm text-sage-800 placeholder-sage-300 focus:border-warm-400 focus:outline-none" />
      <div className="flex gap-2">
        <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="来源（可选）" className="flex-1 rounded-lg border border-sage-200 px-3 py-2 text-xs text-sage-800 placeholder-sage-300 focus:border-warm-400 focus:outline-none" />
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="标签，逗号分隔" className="flex-1 rounded-lg border border-sage-200 px-3 py-2 text-xs text-sage-800 placeholder-sage-300 focus:border-warm-400 focus:outline-none" />
      </div>
      <button onClick={handle} disabled={!text.trim()} className="w-full rounded-lg bg-sage-800 py-2.5 text-sm font-medium text-white disabled:opacity-40">收藏</button>
    </div>
  )
}

// --- Article ---
function AddArticleForm({ onAdd, showToast, state }: { onAdd: (item: KnowledgeItem) => void; showToast: (t: string, type?: string) => void; state: ReturnType<typeof useAppContext>['state'] }) {
  const [text, setText] = useState('')
  const [source, setSource] = useState('')
  const [summarizing, setSummarizing] = useState(false)

  const handleSummarize = async () => {
    if (!text.trim() || summarizing) return
    const { apiKey, provider } = state.settings
    if (!apiKey) { showToast('请先设置API Key', 'error'); return }
    setSummarizing(true)
    try {
      const result = await summarizeArticle({ config: { provider, apiKey }, rawText: text })
      onAdd({
        id: generateId('k_article'), type: 'article', content: result.summary, rawContent: text.trim(),
        source: source.trim() || result.title, tags: result.tags,
        createdAt: new Date().toISOString(),
      })
      setText(''); setSource('')
      showToast('AI已摘要并保存', 'success')
    } catch { showToast('摘要失败，请重试', 'error') }
    finally { setSummarizing(false) }
  }

  return (
    <div className="card-shadow rounded-xl bg-white p-4 space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="粘贴文章全文，AI 帮你提炼 2-3 句精华..." rows={6}
        className="w-full resize-none rounded-lg border border-sage-200 p-3 text-sm text-sage-800 placeholder-sage-300 focus:border-warm-400 focus:outline-none" />
      <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="文章链接（可选，方便日后回溯）"
        className="w-full rounded-lg border border-sage-200 px-3 py-2 text-xs text-sage-800 placeholder-sage-300 focus:border-warm-400 focus:outline-none" />
      <button onClick={handleSummarize} disabled={!text.trim() || summarizing}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-warm-500 py-2.5 text-sm font-medium text-white disabled:opacity-40">
        {summarizing ? <><LoadingSpinner size="sm" /> AI 提炼中...</> : '✨ AI 提炼精华并收藏'}
      </button>
    </div>
  )
}
