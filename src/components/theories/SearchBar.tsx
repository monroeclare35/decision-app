interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-sage-400">
        🔍
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索理论或标签..."
        className="w-full rounded-xl border border-sage-200 bg-white py-3 pl-10 pr-4 text-sm text-sage-800 placeholder-sage-300 transition-colors focus:border-warm-400 focus:outline-none focus:ring-2 focus:ring-warm-100"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600"
        >
          ✕
        </button>
      )}
    </div>
  )
}
