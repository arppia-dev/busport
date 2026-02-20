import qs from 'qs'

export type StrapiQuery = {
  pagination?: {
    page?: number
    pageSize?: number
  }
  sort?: string | string[]
  fields?: string[]
  populate?: string[] | string | Record<string, any>
  filters?: Record<string, any>
  locale?: string
  publicationState?: 'live' | 'preview'
}

export const buildStrapiQuery = (query: StrapiQuery) => {
  const qsString = qs.stringify(query, {
    encodeValuesOnly: true
  })
  return qsString ? `?${qsString}` : ''
}
