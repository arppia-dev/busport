import { useState } from 'react'
import { buildStrapiQuery, StrapiQuery } from './buildStrapiQuery'

export function useStrapiTableQuery(initial: StrapiQuery) {
  const [pagination, setPagination] = useState(
    initial.pagination || { page: 1, pageSize: 10 }
  )

  const updatePagination = (page: number, pageSize: number) => {
    setPagination({ page, pageSize })
  }

  const query = buildStrapiQuery({
    ...initial,
    pagination
  })

  return {
    query,
    pagination,
    updatePagination
  }
}
