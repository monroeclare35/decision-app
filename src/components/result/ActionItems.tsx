interface ActionItemsProps {
  items: string[]
}

export function ActionItems({ items }: ActionItemsProps) {
  return (
    <div className="card-shadow rounded-xl bg-white p-5">
      <h3 className="mb-3 text-sm font-semibold text-sage-600">✅ 你可以这样做</h3>
      <ol className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-sage-700">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage-100 text-xs font-medium text-sage-600">
              {i + 1}
            </span>
            <span className="pt-0.5">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
