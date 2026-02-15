import { Company } from '@/types/Company'
import { Employee } from '@/types/Employee'

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
