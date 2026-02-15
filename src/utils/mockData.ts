import { Company } from '@/types/Company'
import { Employee } from '@/types/Employee'
import { Trip } from '@/types/Trip'

export const companiesData: Company[] = [
  { id: 1, name: 'Transporte Plus', code: 'TP001' },
  { id: 2, name: 'Viajes Seguros', code: 'VS002' },
  { id: 3, name: 'Viajes Express', code: 'VE003' }
]

export const employeesData: Employee[] = [
  {
    id: 1,
    code: 'E001',
    name: 'Carlos García',
    company: 'Transporte Plus',
    position: 'Conductor',
    email: 'carlos@plus.com',
    routes: 'Ruta 101, Ruta 312',
    access: 'Activo'
  },
  {
    id: 2,
    code: 'E002',
    name: 'María López',
    company: 'Viajes Seguros',
    position: 'Administradora',
    email: 'maria@seguros.com',
    routes: 'Ruta 205',
    access: 'Bloqueado'
  },
  {
    id: 3,
    code: 'E003',
    name: 'Juan Pérez',
    company: 'Transporte Plus',
    position: 'Supervisor',
    email: 'juan@plus.com',
    routes: 'Ruta 312',
    access: 'Activo'
  }
]

export const tripData: Trip[] = [
  {
    id: 1,
    key: 1,
    date: '07-02-2026',
    route: 'Ruta 101 - Centro a Aeropuerto Internacional',
    company: 'Transporte Plus',
    driver: 'Carlos García',
    vehicle: 'BUS-2024',
    startedAt: '02, 07 2026',
    duration: '45 min',
    status: 'En curso',
    steps: [
      { startDate: '16:24', endDate: '17:00' },
      { startDate: '08:20', endDate: '08:25' },
      { startDate: '08:40', endDate: '' },
      { startDate: '08:45', endDate: '' }
    ]
  },
  {
    id: 2,
    key: 2,
    date: '07-02-2026',
    route: 'Ruta 205 - Terminal Sur a Estación Central',
    company: 'Viajes Seguros',
    driver: 'María López',
    vehicle: 'BUS-2025',
    startedAt: '02, 07 2026',
    duration: '50 min',
    status: 'Finalizado'
  },
  {
    id: 3,
    key: 3,
    date: '08-02-2026',
    route: 'Ruta 312 - Puerto hasta Zona Industrial Noreste',
    company: 'Transporte Plus',
    driver: 'Juan Pérez',
    vehicle: 'BUS-2026',
    startedAt: '02, 08 2026',
    duration: '55 min',
    status: 'Planeado',
    steps: [
      { startDate: '16:24', endDate: '17:00' },
      { startDate: '08:20', endDate: '08:25' },
      { startDate: '08:40', endDate: '' },
      { startDate: '08:45', endDate: '' }
    ]
  },
  {
    id: 4,
    key: 4,
    date: '07-02-2026',
    route: 'Ruta 418 - Campus Universitario a Complejo Deportivo',
    company: 'Viajes Express',
    driver: 'Roberto Díaz',
    vehicle: 'BUS-2027',
    startedAt: '02, 07 2026',
    duration: '48 min',
    status: 'En curso',
    steps: [
      { startDate: '16:24', endDate: '17:00' },
      { startDate: '08:20', endDate: '08:25' },
      { startDate: '08:40', endDate: '' },
      { startDate: '08:45', endDate: '' }
    ]
  },
  {
    id: 5,
    key: 5,
    date: '06-02-2026',
    route: 'Ruta 101 - Centro a Aeropuerto Internacional',
    company: 'Transporte Plus',
    driver: 'Carmen Ruiz',
    vehicle: 'BUS-2023',
    startedAt: '02, 06 2026',
    duration: '46 min',
    status: 'Finalizado',
    steps: [
      { startDate: '16:24', endDate: '17:00' },
      { startDate: '08:20', endDate: '08:25' },
      { startDate: '08:40', endDate: '' },
      { startDate: '08:45', endDate: '' }
    ]
  },
  {
    id: 6,
    key: 6,
    date: '09-02-2026',
    route: 'Ruta 505 - Municipio Vecino a Centro Comercial',
    company: 'Viajes Seguros',
    driver: 'Pedro Sánchez',
    vehicle: 'BUS-2028',
    startedAt: '02, 09 2026',
    duration: '60 min',
    status: 'Planeado',
    steps: [
      { startDate: '16:24', endDate: '17:00' },
      { startDate: '08:20', endDate: '08:25' },
      { startDate: '08:40', endDate: '' },
      { startDate: '08:45', endDate: '' }
    ]
  },
  {
    id: 7,
    key: 7,
    date: '08-02-2026',
    route: 'Ruta 603 - Hospital General a Barrio Residencial Sur',
    company: 'Viajes Express',
    driver: 'Andrés Martínez',
    vehicle: 'BUS-2029',
    startedAt: '02, 08 2026',
    duration: '52 min',
    status: 'En curso',
    steps: [
      { startDate: '16:24', endDate: '17:00' },
      { startDate: '08:20', endDate: '08:25' },
      { startDate: '08:40', endDate: '' },
      { startDate: '08:45', endDate: '' }
    ]
  },
  {
    id: 8,
    key: 8,
    date: '07-02-2026',
    route: 'Ruta 204 - Estación Norte hasta Parque Metropolitano',
    company: 'Transporte Plus',
    driver: 'Sofía Rodríguez',
    vehicle: 'BUS-2030',
    startedAt: '02, 07 2026',
    duration: '58 min',
    status: 'Finalizado',
    steps: [
      { startDate: '16:24', endDate: '17:00' },
      { startDate: '08:20', endDate: '08:25' },
      { startDate: '08:40', endDate: '' },
      { startDate: '08:45', endDate: '' }
    ]
  },
  {
    id: 9,
    key: 9,
    date: '10-02-2026',
    route: 'Ruta 710 - Zona Franca Industrial a Terminal de Carga',
    company: 'Viajes Seguros',
    driver: 'Luis Fernando Gómez',
    vehicle: 'BUS-2031',
    startedAt: '02, 10 2026',
    duration: '65 min',
    status: 'Planeado',
    steps: [
      { startDate: '16:24', endDate: '17:00' },
      { startDate: '08:20', endDate: '08:25' },
      { startDate: '08:40', endDate: '' },
      { startDate: '08:45', endDate: '' }
    ]
  },
  {
    id: 10,
    key: 10,
    date: '06-02-2026',
    route: 'Ruta 415 - Barrio Antiguo hasta Nuevas Urbanizaciones',
    company: 'Viajes Express',
    driver: 'Daniela Vega',
    vehicle: 'BUS-2032',
    startedAt: '02, 06 2026',
    duration: '62 min',
    status: 'Finalizado',
    steps: [
      { startDate: '16:24', endDate: '17:00' },
      { startDate: '08:20', endDate: '08:25' },
      { startDate: '08:40', endDate: '' },
      { startDate: '08:45', endDate: '' }
    ]
  }
]
