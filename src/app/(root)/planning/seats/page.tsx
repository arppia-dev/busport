"use client"

import { DownloadOutlined, EditOutlined } from "@ant-design/icons"
import type { DatePickerProps, TableColumnsType } from "antd"
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
} from "antd"
import dayjs from "dayjs"
import { useState } from "react"

const { Header, Content } = Layout
const { Title, Text } = Typography

interface Cliente {
  key: string
  nombreEmpresa: string
  codigoEmpresa: string
}

interface Empleado {
  key: string
  id: string
  nombre: string
  empresa: string
  cargo: string
  correo: string
  rutas: string
  acceso: string
}

const clientesData: Cliente[] = [
  { key: "1", nombreEmpresa: "Transporte Plus", codigoEmpresa: "TP001" },
  { key: "2", nombreEmpresa: "Viajes Seguros", codigoEmpresa: "VS002" },
  { key: "3", nombreEmpresa: "Viajes Express", codigoEmpresa: "VE003" }
]

const empleadosData: Empleado[] = [
  {
    key: "1",
    id: "E001",
    nombre: "Carlos García",
    empresa: "Transporte Plus",
    cargo: "Conductor",
    correo: "carlos@plus.com",
    rutas: "Ruta 101, Ruta 312",
    acceso: "Activo"
  },
  {
    key: "2",
    id: "E002",
    nombre: "María López",
    empresa: "Viajes Seguros",
    cargo: "Administradora",
    correo: "maria@seguros.com",
    rutas: "Ruta 205",
    acceso: "Bloqueado"
  },
  {
    key: "3",
    id: "E003",
    nombre: "Juan Pérez",
    empresa: "Transporte Plus",
    cargo: "Supervisor",
    correo: "juan@plus.com",
    rutas: "Ruta 312",
    acceso: "Activo"
  }
]

interface Ruta {
  key: string
  codigo: string
  titulo: string
  hor: string
  estado: "Publicada" | "Borrador"
  empresa: string
  reservados: {
    reservado: number
    capacidad: number
  }
  dias: {
    lunes: number
    martes: number
    miercoles: number
    jueves: number
    viernes: number
    sabado: number
    domingo: number
  }
}

const rutasData: Ruta[] = [
  {
    key: "7",
    codigo: "R700",
    titulo: "Ruta 700",
    hor: "15:00",
    estado: "Borrador",
    empresa: "Transporte Plus",
    reservados: { reservado: 3, capacidad: 45 },
    dias: {
      lunes: 0,
      martes: 0,
      miercoles: 0,
      jueves: 0,
      viernes: 0,
      sabado: 2,
      domingo: 1
    }
  },
  {
    key: "8",
    codigo: "R800",
    titulo: "Ruta 800",
    hor: "16:30",
    estado: "Publicada",
    empresa: "Viajes Seguros",
    reservados: { reservado: 20, capacidad: 45 },
    dias: {
      lunes: 4,
      martes: 4,
      miercoles: 4,
      jueves: 4,
      viernes: 0,
      sabado: 0,
      domingo: 0
    }
  },
  {
    key: "1",
    codigo: "R101",
    titulo: "Ruta 101",
    hor: "07:00",
    estado: "Publicada",
    empresa: "Transporte Plus",
    reservados: { reservado: 97, capacidad: 45 },
    dias: {
      lunes: 14,
      martes: 21,
      miercoles: 23,
      jueves: 20,
      viernes: 15,
      sabado: 3,
      domingo: 1
    }
  },
  {
    key: "2",
    codigo: "R205",
    titulo: "Ruta 205",
    hor: "08:30",
    estado: "Borrador",
    empresa: "Viajes Seguros",
    reservados: { reservado: 94, capacidad: 45 },
    dias: {
      lunes: 18,
      martes: 21,
      miercoles: 18,
      jueves: 20,
      viernes: 17,
      sabado: 0,
      domingo: 0
    }
  },
  {
    key: "3",
    codigo: "R312",
    titulo: "Ruta 312",
    hor: "09:15",
    estado: "Publicada",
    empresa: "Viajes Express",
    reservados: { reservado: 32, capacidad: 45 },
    dias: {
      lunes: 5,
      martes: 5,
      miercoles: 4,
      jueves: 6,
      viernes: 4,
      sabado: 3,
      domingo: 5
    }
  },
  {
    key: "4",
    codigo: "R410",
    titulo: "Ruta 410",
    hor: "10:00",
    estado: "Borrador",
    empresa: "Transporte Plus",
    reservados: { reservado: 10, capacidad: 25 },
    dias: {
      lunes: 1,
      martes: 2,
      miercoles: 2,
      jueves: 1,
      viernes: 2,
      sabado: 1,
      domingo: 1
    }
  },
  {
    key: "5",
    codigo: "R520",
    titulo: "Ruta 520",
    hor: "11:45",
    estado: "Publicada",
    empresa: "Viajes Seguros",
    reservados: { reservado: 28, capacidad: 35 },
    dias: {
      lunes: 4,
      martes: 4,
      miercoles: 4,
      jueves: 4,
      viernes: 4,
      sabado: 4,
      domingo: 4
    }
  },
  {
    key: "6",
    codigo: "R601",
    titulo: "Ruta 601",
    hor: "13:00",
    estado: "Borrador",
    empresa: "Viajes Express",
    reservados: { reservado: 12, capacidad: 20 },
    dias: {
      lunes: 2,
      martes: 2,
      miercoles: 2,
      jueves: 2,
      viernes: 2,
      sabado: 1,
      domingo: 1
    }
  }
]

const diasSemana = [
  { key: "lunes", label: "lun." },
  { key: "martes", label: "mar." },
  { key: "miercoles", label: "mié." },
  { key: "jueves", label: "jue." },
  { key: "viernes", label: "vie." },
  { key: "sabado", label: "sáb." },
  { key: "domingo", label: "dom." }
]

function getFechasSemana(monday: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0")
  return diasSemana.map((dia, idx) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + idx)
    return {
      ...dia,
      fecha: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`
    }
  })
}

const empleadosColumns: TableColumnsType<Empleado> = [
  { title: "ID", dataIndex: "id", key: "id", width: 80 },
  { title: "Nombre", dataIndex: "nombre", key: "nombre", width: 150 },
  { title: "Empresa", dataIndex: "empresa", key: "empresa", width: 150 },
  { title: "Cargo", dataIndex: "cargo", key: "cargo", width: 120 },
  {
    title: "Correo electrónico",
    dataIndex: "correo",
    key: "correo",
    width: 180
  },
  { title: "Rutas", dataIndex: "rutas", key: "rutas", width: 120 },
  {
    title: "Acceso",
    dataIndex: "acceso",
    key: "acceso",
    render: (acceso: string) => {
      let color = "blue"
      if (acceso === "Activo") color = "green"
      if (acceso === "Bloqueado") color = "red"
      return <Tag color={color}>{acceso}</Tag>
    },
    filters: [
      { text: "Activo", value: "Activo" },
      { text: "Bloqueado", value: "Bloqueado" }
    ],
    onFilter: (value, record) => record.acceso === value,
    width: 100
  }
]

const weekFormat = "DD/MMM"

export default function ClientsPage() {
  const {
    token: { colorPrimary, colorBgContainer, padding }
  } = theme.useToken()

  const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
    `${dayjs(value).startOf("week").format(weekFormat)} - ${dayjs(value)
      .endOf("week")
      .format(weekFormat)}`

  // Estado para la semana seleccionada y los días con fecha
  const [semanaSeleccionada, setSemanaSeleccionada] = useState<Date>(() => {
    // Por defecto, el lunes de la semana actual
    const hoy = new Date()
    const diaSemana = hoy.getDay() === 0 ? 6 : hoy.getDay() - 1 // 0=domingo
    const lunes = new Date(hoy)
    lunes.setDate(hoy.getDate() - diaSemana)
    return lunes
  })
  const [diasConFecha, setDiasConFecha] = useState(() =>
    getFechasSemana(semanaSeleccionada)
  )

  // Handler para el cambio de semana en el DatePicker
  const handleWeekChange: DatePickerProps["onChange"] = (date) => {
    if (!date) return
    // Asegurarse de que date es un objeto dayjs
    const dateValue = Array.isArray(date) ? date[0] : date
    const monday = dayjs(dateValue).startOf("week").toDate()
    setSemanaSeleccionada(monday)
    setDiasConFecha(getFechasSemana(monday))
  }

  return (
    <Layout style={{ background: colorBgContainer, height: "100%" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
              key: "1",
              label: <Text>Por Rutas</Text>,
              children: (
                <Flex orientation="vertical" gap={padding}>
                  <Space>
                    <DatePicker
                      defaultValue={dayjs(semanaSeleccionada)}
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
                  <Table<Ruta>
                    columns={[
                      {
                        title: "Título de la Ruta",
                        key: "titulo",
                        width: 220,
                        render: (_: any, record: Ruta) => (
                          <span>
                            {record.codigo} - {record.titulo} - {record.hor}
                          </span>
                        )
                      },
                      {
                        title: "",
                        key: "estado",
                        width: 50,
                        render: (_: any, record: Ruta) => (
                          <Tag
                            color={
                              record.estado === "Publicada" ? "green" : "orange"
                            }
                          >
                            {record.estado}
                          </Tag>
                        )
                      },
                      {
                        title: "Empresa",
                        dataIndex: "empresa",
                        key: "empresa",
                        width: 180
                      },
                      {
                        title: "Reservados",
                        dataIndex: "reservados",
                        key: "reservados",
                        width: 140,
                        render: (reservados: {
                          reservado: number
                          capacidad: number
                        }) => (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6
                            }}
                          >
                            {reservados.reservado} / {reservados.capacidad}
                            <EditOutlined
                              style={{
                                fontSize: 15,
                                color: "#1677ff",
                                cursor: "pointer"
                              }}
                            />
                          </span>
                        )
                      },
                      {
                        title: "Días de la Semana",
                        children: diasConFecha.map((dia) => ({
                          title: (
                            <Flex orientation="vertical">
                              <Text
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4
                                }}
                              >
                                {dia.label} - {dia.fecha}
                              </Text>
                              <DownloadOutlined
                                style={{ fontSize: 14, cursor: "pointer" }}
                              />
                            </Flex>
                          ),
                          key: dia.key,
                          width: 110,
                          render: (_: any, record: Ruta) => {
                            const cantidad =
                              record.dias[dia.key as keyof typeof record.dias]
                            const capacidad = record.reservados.capacidad
                            if (cantidad === undefined || capacidad === 0) {
                              return (
                                <span
                                  style={{ color: "#bbb", fontStyle: "italic" }}
                                >
                                  N/A
                                </span>
                              )
                            }
                            if (cantidad === 0) {
                              return (
                                <span
                                  style={{ color: "#bbb", fontStyle: "italic" }}
                                >
                                  N/A
                                </span>
                              )
                            }
                            const porcentaje = Math.round(
                              (cantidad / capacidad) * 100
                            )
                            let bg = "#e6ffed"
                            let color = "#389e0d"
                            if (porcentaje > 50) {
                              bg = "#fff1f0"
                              color = "#cf1322"
                            } else if (porcentaje > 40) {
                              bg = "#fffbe6"
                              color = "#d48806"
                            }
                            return (
                              <span
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  background: bg,
                                  borderRadius: 6,
                                  padding: "2px 0"
                                }}
                              >
                                <span style={{ fontWeight: 500, color }}>
                                  {porcentaje}%
                                </span>
                                <span style={{ fontSize: 12, color: "#888" }}>
                                  {cantidad} reservas
                                </span>
                              </span>
                            )
                          }
                        }))
                      }
                    ]}
                    dataSource={rutasData}
                    pagination={{
                      pageSize: 5,
                      total: rutasData.length,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      pageSizeOptions: ["5", "10", "20", "50"]
                    }}
                    scroll={{ x: 1200 }}
                  />
                </Flex>
              )
            },
            {
              key: "2",
              label: <Text>Por Personas</Text>,
              children: (
                <Table<Empleado>
                  columns={empleadosColumns}
                  dataSource={empleadosData}
                  pagination={{
                    pageSize: 5,
                    total: empleadosData.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: ["5", "10", "20", "50"]
                  }}
                  scroll={{ x: 900 }}
                />
              )
            }
          ]}
        />
      </Content>
    </Layout>
  )
}
