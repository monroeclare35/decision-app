interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-surface-400">
        🔍
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索理论或标签..."
        className="w-full rounded-xl border border-surface-200 bg-white py-3 pl-10 pr-4 text-sm text-surface-800 placeholder-surface-300 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
        >
          ✕
        </button>
      )}
    </div>
  )
}
