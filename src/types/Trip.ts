export interface Trip {
  id: number
  key: string
  date: string
  route: string
  company: string
  driver: string
  vehicle: string
  startedAt: string
  duration: string
  status: string
  steps?: { startDate: string; endDate: string }[]
}
