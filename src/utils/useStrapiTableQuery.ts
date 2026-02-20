import { TablePaginationConfig } from 'antd'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import { useState } from 'react'
import { buildStrapiQuery, StrapiQuery } from './buildStrapiQuery'

function transformAntDFiltersToStrapi(
  tableFilters: Record<string, FilterValue | null>
) {
  const strapiFilters: Record<string, any> = {}
  Object.entries(tableFilters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      strapiFilters[key] =
        value.length === 1 ? { $eq: value[0] } : { $in: value }
    }
  })
  return strapiFilters
}

export function useStrapiTableQuery(initial: StrapiQuery) {
  const [pagination, setPagination] = useState(
    initial.pagination || { page: 1, pageSize: 10 }
  )
  const [filters, setFilters] = useState<Record<string, any>>(
    initial.filters || {}
  )
  const [sort, setSort] = useState<string | string[]>(
    initial.sort || ['createdAt:desc']
  )

  const updatePagination = (page: number, pageSize: number) => {
    setPagination({ page, pageSize })
  }

  const updateFilters = (newFilters: Record<string, any>) => {
    setFilters(newFilters)
    setPagination({ ...pagination, page: 1 })
  }

  const updateSort = (newSort: string | string[]) => {
    setSort(newSort)
  }

  const query = buildStrapiQuery({
    ...initial,
    pagination,
    filters,
    sort
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: { currentDataSource: any[]; action: 'paginate' | 'sort' | 'filter' }
  ) => {
    updatePagination(pagination.current || 1, pagination.pageSize || 5)
    setFilters(transformAntDFiltersToStrapi(filters))
    if (!Array.isArray(sorter) && sorter.field && sorter.order) {
      const order = sorter.order === 'ascend' ? 'asc' : 'desc'
      setSort([`${sorter.field}:${order}`])
    }
  }

  return {
    pagination,
    query,
    updatePagination,
    updateFilters,
    updateSort,
    handleTableChange
  }
}
