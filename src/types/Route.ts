export interface Route {
  id: number
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
