import { useState } from 'react'

export function BeliefGuidance() {
  const [show, setShow] = useState(false)

  return (
    <div className="rounded-xl border border-surface-200 bg-white p-4">
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="flex w-full items-center justify-between text-sm"
      >
        <span className="font-medium text-surface-600">💡 什么是核心信念？</span>
        <span className="text-xs text-surface-400">{show ? '收起 ▲' : '了解更多 ▼'}</span>
      </button>
      {show && (
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-surface-600">
          <p>
            核心信念是你确立的、长期有效的个人原则。它们会<strong>强制融入</strong>每一次 AI
            决策分析中。
          </p>
          <p className="font-medium">好的例子：</p>
          <ul className="ml-4 list-disc space-y-1 text-surface-500">
            <li>"我要减少生活中的熵增——做任何决定都应让事情更有序"</li>
            <li>"健康永远排在第一位"</li>
            <li>"做一个长期主义者，不被短期诱惑动摇"</li>
            <li>"保持好奇心，优先选择能带来学习机会的选项"</li>
          </ul>
          <p className="text-xs text-surface-400">
            这些信念即使和某些理论评分矛盾，也会以信念为优先。
          </p>
        </div>
      )}
    </div>
  )
}
