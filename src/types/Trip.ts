import { BaseEntity } from './BaseEntity'

export interface Trip extends BaseEntity {
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
