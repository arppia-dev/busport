import { BaseEntity } from './BaseEntity'
import { Company } from './Company'
import { TypeOfCar } from './TypeOfCar'

export interface Car extends BaseEntity {
  plate: string
  type: TypeOfCar
  capacity: number
  companies: Company[]
}
