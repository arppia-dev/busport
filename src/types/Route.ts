import { BaseEntity } from './BaseEntity'

export interface Route extends BaseEntity {
  code: string
  status: 'In' | 'Out'
  name: string
  company: string
  days: string[]
  departure: string
  driver: string
  vehicle: string
  published: { driver: boolean; client: boolean }
}
