export interface SeatPerson {
  id: number
  codigoInterno: string
  nombrePasajero: string
  empresa: string
  tituloRuta: string
  estadoReserva: string
  fechaReserva: string // ISO o formato dd/mm/yyyy
  reservaEn: string // fecha y hora: dd/mm/yyyy hh:mm
}
