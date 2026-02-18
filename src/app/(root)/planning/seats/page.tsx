'use client'

import SeatRouteTable from '@/components/tables/SeatRouteTable'
import {
  customWeekStartEndFormat,
  getDatesOfWeek,
  getMondayOfWeek
} from '@/utils/date'
import type { DatePickerProps, TableColumnsType } from 'antd'
import {
  DatePicker,
  Divider,
  Flex,
  Layout,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  theme,
  Typography
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

const { Header, Content } = Layout
const { Title, Text } = Typography

interface Cliente {
  key: string
  nombreEmpresa: string
  codigoEmpresa: string
}

interface Empleado {
  key: string
  codigoInterno: string
  nombrePasajero: string
  empresa: string
  tituloRuta: string
  estadoReserva: string
  fechaReserva: string // ISO o formato dd/mm/yyyy
  reservaEn: string // fecha y hora: dd/mm/yyyy hh:mm
}

const clientesData: Cliente[] = [
  { key: '1', nombreEmpresa: 'Transporte Plus', codigoEmpresa: 'TP001' },
  { key: '2', nombreEmpresa: 'Viajes Seguros', codigoEmpresa: 'VS002' },
  { key: '3', nombreEmpresa: 'Viajes Express', codigoEmpresa: 'VE003' }
]

const empleadosData: Empleado[] = [
  {
    key: '1',
    codigoInterno: 'E001',
    nombrePasajero: 'Carlos García',
    empresa: 'Transporte Plus',
    tituloRuta: 'Ruta 101',
    estadoReserva: 'Confirmada',
    fechaReserva: '10/02/2026',
    reservaEn: '10/02/2026 06:11'
  },
  {
    key: '2',
    codigoInterno: 'E002',
    nombrePasajero: 'María López',
    empresa: 'Viajes Seguros',
    tituloRuta: 'Ruta 205',
    estadoReserva: 'Pendiente',
    fechaReserva: '11/02/2026',
    reservaEn: '11/02/2026 08:45'
  },
  {
    key: '3',
    codigoInterno: 'E003',
    nombrePasajero: 'Juan Pérez',
    empresa: 'Transporte Plus',
    tituloRuta: 'Ruta 312',
    estadoReserva: 'Cancelada',
    fechaReserva: '09/02/2026',
    reservaEn: '09/02/2026 17:30'
  },
  {
    key: '4',
    codigoInterno: 'E004',
    nombrePasajero: 'Ana Torres',
    empresa: 'Viajes Express',
    tituloRuta: 'Ruta 700',
    estadoReserva: 'Confirmada',
    fechaReserva: '08/02/2026',
    reservaEn: '08/02/2026 12:00'
  },
  {
    key: '5',
    codigoInterno: 'E005',
    nombrePasajero: 'Luis Fernández',
    empresa: 'Transporte Plus',
    tituloRuta: 'Ruta 410',
    estadoReserva: 'Pendiente',
    fechaReserva: '07/02/2026',
    reservaEn: '07/02/2026 09:30'
  },
  {
    key: '6',
    codigoInterno: 'E006',
    nombrePasajero: 'Sofía Ramírez',
    empresa: 'Viajes Seguros',
    tituloRuta: 'Ruta 520',
    estadoReserva: 'Confirmada',
    fechaReserva: '06/02/2026',
    reservaEn: '06/02/2026 15:20'
  },
  {
    key: '7',
    codigoInterno: 'E007',
    nombrePasajero: 'Pedro Castillo',
    empresa: 'Viajes Express',
    tituloRuta: 'Ruta 601',
    estadoReserva: 'Cancelada',
    fechaReserva: '05/02/2026',
    reservaEn: '05/02/2026 18:45'
  },
  {
    key: '8',
    codigoInterno: 'E008',
    nombrePasajero: 'Lucía Gómez',
    empresa: 'Transporte Plus',
    tituloRuta: 'Ruta 101',
    estadoReserva: 'Confirmada',
    fechaReserva: '04/02/2026',
    reservaEn: '04/02/2026 07:10'
  },
  {
    key: '9',
    codigoInterno: 'E009',
    nombrePasajero: 'Miguel Ruiz',
    empresa: 'Viajes Seguros',
    tituloRuta: 'Ruta 205',
    estadoReserva: 'Pendiente',
    fechaReserva: '03/02/2026',
    reservaEn: '03/02/2026 10:55'
  },
  {
    key: '10',
    codigoInterno: 'E010',
    nombrePasajero: 'Valentina Herrera',
    empresa: 'Viajes Express',
    tituloRuta: 'Ruta 312',
    estadoReserva: 'Confirmada',
    fechaReserva: '02/02/2026',
    reservaEn: '02/02/2026 16:40'
  }
]

const diasSemana = [
  { key: 'lunes', label: 'lun.' },
  { key: 'martes', label: 'mar.' },
  { key: 'miercoles', label: 'mié.' },
  { key: 'jueves', label: 'jue.' },
  { key: 'viernes', label: 'vie.' },
  { key: 'sabado', label: 'sáb.' },
  { key: 'domingo', label: 'dom.' }
]

const empleadosColumns: TableColumnsType<Empleado> = [
  {
    title: 'Código Interno',
    dataIndex: 'codigoInterno',
    key: 'codigoInterno',
    width: 100,
    filters: Array.from(new Set(empleadosData.map((e) => e.codigoInterno))).map(
      (codigo) => ({ text: codigo, value: codigo })
    ),
    onFilter: (value, record) => record.codigoInterno === value
  },
  {
    title: 'Nombre del Pasajero',
    dataIndex: 'nombrePasajero',
    key: 'nombrePasajero',
    width: 180,
    filters: Array.from(
      new Set(empleadosData.map((e) => e.nombrePasajero))
    ).map((nombre) => ({ text: nombre, value: nombre })),
    onFilter: (value, record) => record.nombrePasajero === value
  },
  {
    title: 'Empresa',
    dataIndex: 'empresa',
    key: 'empresa',
    width: 150,
    filters: Array.from(new Set(empleadosData.map((e) => e.empresa))).map(
      (empresa) => ({ text: empresa, value: empresa })
    ),
    onFilter: (value, record) => record.empresa === value
  },
  {
    title: 'Título de la Ruta',
    dataIndex: 'tituloRuta',
    key: 'tituloRuta',
    width: 150,
    filters: Array.from(new Set(empleadosData.map((e) => e.tituloRuta))).map(
      (ruta) => ({ text: ruta, value: ruta })
    ),
    onFilter: (value, record) => record.tituloRuta === value
  },
  {
    title: 'Estado de la Reserva',
    dataIndex: 'estadoReserva',
    key: 'estadoReserva',
    width: 150,
    filters: Array.from(new Set(empleadosData.map((e) => e.estadoReserva))).map(
      (estado) => ({ text: estado, value: estado })
    ),
    onFilter: (value, record) => record.estadoReserva === value,
    render: (estado: string) => {
      let color = 'default'
      if (estado === 'Confirmada') color = 'green'
      else if (estado === 'Pendiente') color = 'orange'
      else if (estado === 'Cancelada') color = 'red'
      return <Tag color={color}>{estado}</Tag>
    }
  },
  {
    title: 'Fecha de la Reserva',
    dataIndex: 'fechaReserva',
    key: 'fechaReserva',
    width: 140
  },
  { title: 'Reserva en', dataIndex: 'reservaEn', key: 'reservaEn', width: 160 }
]

export default function SeatsPage() {
  const {
    token: { colorPrimary, colorBgContainer, padding }
  } = theme.useToken()

  const [selectedWeek, setSelectedWeek] = useState<Date>(() => {
    return getMondayOfWeek(new Date())
  })

  const [weekDates, setWeekDates] = useState<Date[]>(() => {
    return getDatesOfWeek(selectedWeek)
  })

  const handleWeekChange: DatePickerProps['onChange'] = (date) => {
    if (!date || Array.isArray(date)) return

    setSelectedWeek(getMondayOfWeek(date.toDate()))
    setWeekDates(getDatesOfWeek(date.toDate()))
  }

  return (
    <Layout style={{ background: colorBgContainer, height: '100%' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingInline: 24,
          background: colorBgContainer
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Reservas de Asientos
        </Title>
      </Header>
      <Divider style={{ margin: 0 }} />
      <Content style={{ padding: padding }}>
        <Tabs
          items={[
            {
              key: '1',
              label: <Text>Por Rutas</Text>,
              children: (
                <Flex orientation="vertical" gap={padding}>
                  <Space>
                    <DatePicker
                      defaultValue={dayjs(selectedWeek)}
                      format={customWeekStartEndFormat}
                      onChange={handleWeekChange}
                      showWeek={false}
                      picker="week"
                      style={{ width: 250 }}
                    />

                    <Select
                      placeholder="Seleccionar empresa"
                      style={{ width: 250 }}
                      options={clientesData.map((cliente) => ({
                        label: cliente.nombreEmpresa,
                        value: cliente.codigoEmpresa
                      }))}
                    />
                  </Space>
                  <SeatRouteTable weekDates={weekDates} />
                </Flex>
              )
            },
            {
              key: '2',
              label: <Text>Por Personas</Text>,
              children: (
                <Flex orientation="vertical" gap={padding}>
                  <Space>
                    <DatePicker
                      defaultValue={dayjs(selectedWeek)}
                      format={customWeekStartEndFormat}
                      onChange={handleWeekChange}
                      picker="week"
                      style={{ width: 250 }}
                    />
                    <Select
                      placeholder="Seleccionar empresa"
                      style={{ width: 250 }}
                      options={clientesData.map((cliente) => ({
                        label: cliente.nombreEmpresa,
                        value: cliente.codigoEmpresa
                      }))}
                    />
                  </Space>
                  <Table<Empleado>
                    columns={empleadosColumns}
                    dataSource={empleadosData}
                    pagination={{
                      pageSize: 5,
                      total: empleadosData.length,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      pageSizeOptions: ['5', '10', '20', '50']
                    }}
                    scroll={{ x: 900 }}
                  />
                </Flex>
              )
            }
          ]}
        />
      </Content>
    </Layout>
  )
}
