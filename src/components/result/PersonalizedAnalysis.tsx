interface PersonalizedAnalysisProps {
  text: string
}

export function PersonalizedAnalysis({ text }: PersonalizedAnalysisProps) {
  // Simple markdown rendering — supports **bold** and line breaks
  const rendered = text
    .split('\n')
    .map((line, i) => {
      if (!line.trim()) return '<br/>'
      // Bold
      const withBold = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      return `<p class="mb-2">${withBold}</p>`
    })
    .join('')

  return (
    <div className="card rounded-xl bg-white p-5">
      <h3 className="mb-3 text-sm font-semibold text-surface-600">个性化分析</h3>
      <div
        className="prose prose-sm max-w-none text-sm leading-relaxed text-surface-700"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    </div>
  )
}
