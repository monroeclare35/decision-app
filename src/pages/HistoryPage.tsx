import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'
import { PageHeader } from '../components/layout/PageHeader'
import { ConfirmDialog } from '../components/shared/ConfirmDialog'
import { EmptyState } from '../components/shared/EmptyState'
import { getCategoryIcon, getCategoryLabel } from '../types'

export function HistoryPage() {
  const { state, dispatch, showToast } = useAppContext()
  const { history } = state.decisions
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = () => {
    if (deleteId) {
      dispatch({ type: 'DELETE_DECISION', payload: deleteId })
      showToast('已删除', 'info')
      setDeleteId(null)
    }
  }

  if (history.length === 0) {
    return (
      <>
        <PageHeader
          title="历史决策"
          subtitle="这里会记录你所有的决策和分析结果"
          icon="📋"
        />
        <EmptyState
          icon="📋"
          title="还没有决策记录"
          description="去做你的第一个决策吧"
          actionLabel="开始决策"
          actionTo="/decide"
        />
      </>
    )
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="历史决策"
        subtitle={`共 ${history.length} 条记录`}
        icon="📋"
      />

      <div className="space-y-3">
        {history.map((decision) => (
          <div key={decision.id} className="card rounded-xl bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <Link
                to={`/result/${decision.id}`}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-50 px-2 py-0.5 text-[10px] font-medium text-surface-500">
                    {getCategoryIcon(decision.category)}
                    {getCategoryLabel(decision.category)}
                  </span>
                  <span className="text-[10px] text-surface-400">
                    {new Date(decision.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <p className="text-sm text-surface-700 line-clamp-2">
                  {decision.description}
                </p>
              </Link>
              <button
                onClick={() => setDeleteId(decision.id)}
                className="flex-shrink-0 rounded-lg p-1.5 text-surface-400 transition-colors hover:bg-red-50 hover:text-red-500"
                title="删除"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="删除决策"
        message="确定要删除这条决策记录吗？此操作不可撤销。"
        confirmLabel="删除"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        danger
      />
    </div>
  )
}
