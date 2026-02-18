import { Company } from '@/types/Company'
import { Employee } from '@/types/Employee'
import { Route } from '@/types/Route'
import { SeatRoute } from '@/types/SeatRoute'
import { Trip } from '@/types/Trip'

/**
 * Mock data for Companies
 */
export const companiesData: Company[] = [
  { id: 1, name: 'Transporte Plus', code: 'TP001' },
  { id: 2, name: 'Viajes Seguros', code: 'VS002' },
  { id: 3, name: 'Viajes Express', code: 'VE003' }
]

/**
 * Mock data for Employees
 */
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

/**
 * Mock data for Trips
 */
export const tripData: Trip[] = [
  {
    id: 1,
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

/**
 * Mock data for Routes
 */
export const routesData: Route[] = [
  {
    id: 1,
    code: 'R101',
    status: 'In',
    name: 'Centro a Aeropuerto',
    company: 'Transporte Plus',
    days: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'],
    departure: '06:30:00',
    driver: 'Carlos García',
    vehicle: '*',
    published: { driver: false, client: false }
  },
  {
    id: 2,
    code: 'R205',
    status: 'Out',
    name: 'Terminal Sur a Estación Central',
    company: 'Viajes Seguros',
    days: ['Lun', 'Mie', 'Vie', 'Dom'],
    departure: '07:00:00',
    driver: 'María López',
    vehicle: 'BUS-2025',
    published: { driver: true, client: false }
  },
  {
    id: 3,
    code: 'R312',
    status: 'In',
    name: 'Estación Central a Universidad',
    company: 'Viajes Express',
    days: ['Mar', 'Jue', 'Vie'],
    departure: '08:15:00',
    driver: 'Juan Pérez',
    vehicle: 'BUS-312',
    published: { driver: false, client: true }
  },
  {
    id: 4,
    code: 'R410',
    status: 'Out',
    name: 'Aeropuerto a Centro',
    company: 'Transporte Plus',
    days: ['Sab', 'Dom'],
    departure: '09:00:00',
    driver: 'Carlos García',
    vehicle: 'VAN-410',
    published: { driver: false, client: false }
  },
  {
    id: 5,
    code: 'R520',
    status: 'In',
    name: 'Universidad a Terminal Sur',
    company: 'Viajes Seguros',
    days: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'],
    departure: '10:30:00',
    driver: 'María López',
    vehicle: 'BUS-520',
    published: { driver: true, client: true }
  },
  {
    id: 6,
    code: 'R601',
    status: 'Out',
    name: 'Centro a Estación Central',
    company: 'Viajes Express',
    days: ['Vie', 'Sab'],
    departure: '11:45:00',
    driver: 'Juan Pérez',
    vehicle: 'VAN-601',
    published: { driver: false, client: true }
  },
  {
    id: 7,
    code: 'R702',
    status: 'In',
    name: 'Terminal Sur a Universidad',
    company: 'Transporte Plus',
    days: ['Mar', 'Jue', 'Sab'],
    departure: '12:00:00',
    driver: 'Carlos García',
    vehicle: 'BUS-702',
    published: { driver: true, client: false }
  }
]

/**
 * Mock data for Seat Routes
 */
export const seatRoutesData: SeatRoute[] = [
  {
    id: 1,
    code: 'R700',
    title: 'Ruta 700',
    time: '15:00',
    status: 'Borrador',
    company: 'Transporte Plus',
    capacity: 30,
    days: [
      { day: '2026-02-02', qty: 25 },
      { day: '2026-02-03', qty: 10 },
      { day: '2026-02-04', qty: 30 },
      { day: '2026-02-05', qty: 0 },
      { day: '2026-02-06', qty: 10 },
      { day: '2026-02-07', qty: 23 },
      { day: '2026-02-08', qty: 2 }
    ]
  },
  {
    id: 2,
    code: 'R800',
    title: 'Ruta 800',
    time: '16:30',
    status: 'Publicada',
    company: 'Viajes Seguros',
    capacity: 25,
    days: [
      { day: '2026-02-02', qty: 25 },
      { day: '2026-02-03', qty: 10 },
      { day: '2026-02-04', qty: 30 },
      { day: '2026-02-05', qty: 0 },
      { day: '2026-02-06', qty: 10 },
      { day: '2026-02-07', qty: 23 },
      { day: '2026-02-08', qty: 2 }
    ]
  },
  {
    id: 3,
    code: 'R101',
    title: 'Ruta 101',
    time: '07:00',
    status: 'Publicada',
    company: 'Transporte Plus',
    capacity: 20,
    days: [
      { day: '2026-02-02', qty: 25 },
      { day: '2026-02-03', qty: 10 },
      { day: '2026-02-04', qty: 30 },
      { day: '2026-02-05', qty: 15 },
      { day: '2026-02-06', qty: 10 },
      { day: '2026-02-07', qty: 23 },
      { day: '2026-02-08', qty: 2 }
    ]
  },
  {
    id: 4,
    code: 'R205',
    title: 'Ruta 205',
    time: '08:30',
    status: 'Borrador',
    company: 'Viajes Seguros',
    capacity: 60,
    days: [
      { day: '2026-02-02', qty: 25 },
      { day: '2026-02-03', qty: 0 },
      { day: '2026-02-04', qty: 30 },
      { day: '2026-02-05', qty: 15 },
      { day: '2026-02-06', qty: 10 },
      { day: '2026-02-07', qty: 23 },
      { day: '2026-02-08', qty: 2 }
    ]
  }
]
