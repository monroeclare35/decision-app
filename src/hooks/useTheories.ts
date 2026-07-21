import { useMemo, useState, useCallback } from 'react'
import { useAppContext } from './useAppContext'
import type { Domain } from '../types'

export function useTheories() {
  const { state, rateTheory, addBelief } = useAppContext()
  const { library, userRatings } = state.theories
  const [search, setSearch] = useState('')
  const [domainFilter, setDomainFilter] = useState<Domain | 'all'>('all')
  const [sortBy, setSortBy] = useState<'default' | 'rating_high' | 'rating_low'>('default')

  const filtered = useMemo(() => {
    let result = [...library]

    // Search
    if (search.trim()) {
      const lower = search.trim().toLowerCase()
      result = result.filter(
        (t) =>
          t.content.toLowerCase().includes(lower) ||
          t.tags.some((tag) => tag.toLowerCase().includes(lower))
      )
    }

    // Domain filter
    if (domainFilter !== 'all') {
      result = result.filter((t) => t.domain === domainFilter)
    }

    // Sort
    if (sortBy === 'rating_high') {
      result.sort((a, b) => (userRatings[b.id] ?? 3) - (userRatings[a.id] ?? 3))
    } else if (sortBy === 'rating_low') {
      result.sort((a, b) => (userRatings[a.id] ?? 3) - (userRatings[b.id] ?? 3))
    }

    return result
  }, [library, search, domainFilter, sortBy, userRatings])

  const resetFilters = useCallback(() => {
    setSearch('')
    setDomainFilter('all')
    setSortBy('default')
  }, [])

  return {
    theories: filtered,
    total: library.length,
    filteredCount: filtered.length,
    search,
    setSearch,
    domainFilter,
    setDomainFilter,
    sortBy,
    setSortBy,
    resetFilters,
    userRatings,
    rateTheory,
  }
}
