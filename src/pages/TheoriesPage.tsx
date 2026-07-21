import { PageHeader } from '../components/layout/PageHeader'
import { SearchBar } from '../components/theories/SearchBar'
import { DomainFilter } from '../components/theories/DomainFilter'
import { TheoryCard } from '../components/theories/TheoryCard'
import { useTheories } from '../hooks/useTheories'

export function TheoriesPage() {
  const {
    theories,
    filteredCount,
    total,
    search,
    setSearch,
    domainFilter,
    setDomainFilter,
    sortBy,
    setSortBy,
    userRatings,
    rateTheory,
  } = useTheories()

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="理论库"
        subtitle={`${filteredCount} / ${total} 条理论`}
        icon="📚"
      />

      <div className="space-y-3">
        <SearchBar value={search} onChange={setSearch} />
        <div className="flex gap-2">
          <DomainFilter value={domainFilter} onChange={setDomainFilter} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-xl border border-sage-200 bg-white px-3 py-2 text-xs text-sage-600 focus:outline-none"
          >
            <option value="default">默认排序</option>
            <option value="rating_high">评分高→低</option>
            <option value="rating_low">评分低→高</option>
          </select>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {theories.length === 0 ? (
          <div className="rounded-xl border border-dashed border-sage-200 p-8 text-center">
            <span className="text-3xl">🔍</span>
            <p className="mt-2 text-sm text-sage-500">没有找到匹配的理论</p>
          </div>
        ) : (
          theories.map((theory) => (
            <TheoryCard
              key={theory.id}
              theory={theory}
              rating={userRatings[theory.id] ?? null}
              onRate={(score) => rateTheory(theory.id, score)}
            />
          ))
        )}
      </div>
    </div>
  )
}
