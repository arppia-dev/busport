export interface Company {
  id: number
  documentId: number
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
