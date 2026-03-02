import { BaseEntity } from './BaseEntity'

export interface Company extends BaseEntity {
  name: string
  code: string
  address: {
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  accessByCode: boolean
}
