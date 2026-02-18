export interface SeatRoute {
  id: number
  code: string
  title: string
  time: string
  status: 'Publicada' | 'Borrador'
  company: string
  capacity: number
  days: { day: string; qty: number }[]
}
