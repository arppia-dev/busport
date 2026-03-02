import { BaseEntity } from './BaseEntity'

export interface Employee extends BaseEntity {
  code: string
  name: string
  company: string
  position: string
  email: string
  routes: string
  access: string
}
