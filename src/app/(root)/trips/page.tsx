"use client"

import { EyeOutlined } from "@ant-design/icons"
import type { TableColumnsType } from "antd"
import {
  Badge,
  Button,
  Divider,
  Layout,
  Space,
  Table,
  Tabs,
  Tag,
  theme,
  Typography
} from "antd"
import styles from "./page.module.css"

const { Header, Content } = Layout
const { Title, Text } = Typography

interface Trip {
  key: string
  fecha: string
  ruta: string
  empresa: string
  conductor: string
  automovil: string
  iniciadaEn: string
  duracion: string
  status: string
  steps?: { fechaInicio: string; fechaFin: string }[]
}

const tripData: Trip[] = [
  {
    key: "1",
    fecha: "07-02-2026",
    ruta: "Ruta 101 - Centro a Aeropuerto Internacional",
    empresa: "Transporte Plus",
    conductor: "Carlos García",
    automovil: "BUS-2024",
    iniciadaEn: "02, 07 2026",
    duracion: "45 min",
    status: "En curso",
    steps: [
      { fechaInicio: "16:24", fechaFin: "17:00" },
      { fechaInicio: "08:20", fechaFin: "08:25" },
      { fechaInicio: "08:40", fechaFin: "" },
      { fechaInicio: "08:45", fechaFin: "" }
    ]
  },
  {
    key: "2",
    fecha: "07-02-2026",
    ruta: "Ruta 205 - Terminal Sur a Estación Central",
    empresa: "Viajes Seguros",
    conductor: "María López",
    automovil: "BUS-2025",
    iniciadaEn: "02, 07 2026",
    duracion: "50 min",
    status: "Finalizado"
  },
  {
    key: "3",
    fecha: "08-02-2026",
    ruta: "Ruta 312 - Puerto hasta Zona Industrial Noreste",
    empresa: "Transporte Plus",
    conductor: "Juan Pérez",
    automovil: "BUS-2026",
    iniciadaEn: "02, 08 2026",
    duracion: "55 min",
    status: "Planeado",
    steps: [
      { fechaInicio: "16:24", fechaFin: "17:00" },
      { fechaInicio: "08:20", fechaFin: "08:25" },
      { fechaInicio: "08:40", fechaFin: "" },
      { fechaInicio: "08:45", fechaFin: "" }
    ]
  },
  {
    key: "4",
    fecha: "07-02-2026",
    ruta: "Ruta 418 - Campus Universitario a Complejo Deportivo",
    empresa: "Viajes Express",
    conductor: "Roberto Díaz",
    automovil: "BUS-2027",
    iniciadaEn: "02, 07 2026",
    duracion: "48 min",
    status: "En curso",
    steps: [
      { fechaInicio: "16:24", fechaFin: "17:00" },
      { fechaInicio: "08:20", fechaFin: "08:25" },
      { fechaInicio: "08:40", fechaFin: "" },
      { fechaInicio: "08:45", fechaFin: "" }
    ]
  },
  {
    key: "5",
    fecha: "06-02-2026",
    ruta: "Ruta 101 - Centro a Aeropuerto Internacional",
    empresa: "Transporte Plus",
    conductor: "Carmen Ruiz",
    automovil: "BUS-2023",
    iniciadaEn: "02, 06 2026",
    duracion: "46 min",
    status: "Finalizado",
    steps: [
      { fechaInicio: "16:24", fechaFin: "17:00" },
      { fechaInicio: "08:20", fechaFin: "08:25" },
      { fechaInicio: "08:40", fechaFin: "" },
      { fechaInicio: "08:45", fechaFin: "" }
    ]
  },
  {
    key: "6",
    fecha: "09-02-2026",
    ruta: "Ruta 505 - Municipio Vecino a Centro Comercial",
    empresa: "Viajes Seguros",
    conductor: "Pedro Sánchez",
    automovil: "BUS-2028",
    iniciadaEn: "02, 09 2026",
    duracion: "60 min",
    status: "Planeado",
    steps: [
      { fechaInicio: "16:24", fechaFin: "17:00" },
      { fechaInicio: "08:20", fechaFin: "08:25" },
      { fechaInicio: "08:40", fechaFin: "" },
      { fechaInicio: "08:45", fechaFin: "" }
    ]
  },
  {
    key: "7",
    fecha: "08-02-2026",
    ruta: "Ruta 603 - Hospital General a Barrio Residencial Sur",
    empresa: "Viajes Express",
    conductor: "Andrés Martínez",
    automovil: "BUS-2029",
    iniciadaEn: "02, 08 2026",
    duracion: "52 min",
    status: "En curso",
    steps: [
      { fechaInicio: "16:24", fechaFin: "17:00" },
      { fechaInicio: "08:20", fechaFin: "08:25" },
      { fechaInicio: "08:40", fechaFin: "" },
      { fechaInicio: "08:45", fechaFin: "" }
    ]
  },
  {
    key: "8",
    fecha: "07-02-2026",
    ruta: "Ruta 204 - Estación Norte hasta Parque Metropolitano",
    empresa: "Transporte Plus",
    conductor: "Sofía Rodríguez",
    automovil: "BUS-2030",
    iniciadaEn: "02, 07 2026",
    duracion: "58 min",
    status: "Finalizado",
    steps: [
      { fechaInicio: "16:24", fechaFin: "17:00" },
      { fechaInicio: "08:20", fechaFin: "08:25" },
      { fechaInicio: "08:40", fechaFin: "" },
      { fechaInicio: "08:45", fechaFin: "" }
    ]
  },
  {
    key: "9",
    fecha: "10-02-2026",
    ruta: "Ruta 710 - Zona Franca Industrial a Terminal de Carga",
    empresa: "Viajes Seguros",
    conductor: "Luis Fernando Gómez",
    automovil: "BUS-2031",
    iniciadaEn: "02, 10 2026",
    duracion: "65 min",
    status: "Planeado",
    steps: [
      { fechaInicio: "16:24", fechaFin: "17:00" },
      { fechaInicio: "08:20", fechaFin: "08:25" },
      { fechaInicio: "08:40", fechaFin: "" },
      { fechaInicio: "08:45", fechaFin: "" }
    ]
  },
  {
    key: "10",
    fecha: "06-02-2026",
    ruta: "Ruta 415 - Barrio Antiguo hasta Nuevas Urbanizaciones",
    empresa: "Viajes Express",
    conductor: "Daniela Vega",
    automovil: "BUS-2032",
    iniciadaEn: "02, 06 2026",
    duracion: "62 min",
    status: "Finalizado",
    steps: [
      { fechaInicio: "16:24", fechaFin: "17:00" },
      { fechaInicio: "08:20", fechaFin: "08:25" },
      { fechaInicio: "08:40", fechaFin: "" },
      { fechaInicio: "08:45", fechaFin: "" }
    ]
  }
]

const columns: TableColumnsType<Trip> = [
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha",
    sorter: (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
    width: 100
  },
  {
    title: "Ruta",
    dataIndex: "ruta",
    key: "ruta",
    filters: [
      { text: "Ruta 101", value: "Ruta 101" },
      { text: "Ruta 205", value: "Ruta 205" },
      { text: "Ruta 312", value: "Ruta 312" },
      { text: "Ruta 418", value: "Ruta 418" },
      { text: "Ruta 505", value: "Ruta 505" }
    ],
    onFilter: (value, record) => record.ruta === value,
    width: 300
  },
  {
    title: "Empresa",
    dataIndex: "empresa",
    key: "empresa",
    filters: [
      { text: "Transporte Plus", value: "Transporte Plus" },
      { text: "Viajes Seguros", value: "Viajes Seguros" },
      { text: "Viajes Express", value: "Viajes Express" }
    ],
    onFilter: (value, record) => record.empresa === value,
    width: 100
  },
  {
    title: "Conductor",
    dataIndex: "conductor",
    key: "conductor",
    width: 100
  },
  {
    title: "Automóvil",
    dataIndex: "automovil",
    key: "automovil",
    width: 80
  },
  {
    title: "Iniciada En",
    dataIndex: "iniciadaEn",
    key: "iniciadaEn",
    width: 120
  },
  {
    title: "Duración",
    dataIndex: "duracion",
    key: "duracion",
    width: 100
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      let color = "blue"
      if (status === "Finalizado") color = "green"
      if (status === "Planeado") color = "orange"
      return <Tag color={color}>{status}</Tag>
    },
    filters: [
      { text: "En curso", value: "En curso" },
      { text: "Finalizado", value: "Finalizado" },
      { text: "Planeado", value: "Planeado" }
    ],
    onFilter: (value, record) => record.status === value,
    width: 100
  }
]

export default function TripsPage() {
  const {
    token: { colorPrimary, colorBgContainer }
  } = theme.useToken()

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
          Lista de Viajes por Estado
        </Title>
        <Button icon={<EyeOutlined />}>Mostrar Progreso de Paradas</Button>
      </Header>
      <Divider style={{ margin: 0 }} />
      <Content className={styles.tripsPage}>
        <Tabs
          items={[
            {
              key: "1",
              label: (
                <Space>
                  <Text>En Curso</Text>
                  <Badge count={5} style={{ backgroundColor: colorPrimary }} />
                </Space>
              ),
              children: (
                <Table<Trip>
                  columns={columns}
                  dataSource={tripData}
                  pagination={{
                    pageSize: 5,
                    total: tripData.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: ["5", "10", "20", "50"]
                  }}
                  scroll={{ x: 1000 }}
                  expandable={{
                    expandedRowRender: (record) => (
                      <Space orientation="vertical">
                        <Text style={{ marginBottom: 8, display: "block" }}>
                          Progreso de Paradas
                        </Text>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap"
                          }}
                        >
                          {record.steps?.map((step, index) => (
                            <Tag
                              key={index}
                              color={step.fechaFin ? "green" : "default"}
                            >
                              {step.fechaInicio} -{" "}
                              {step.fechaFin || "Pendiente"}
                            </Tag>
                          ))}
                        </div>
                      </Space>
                    ),
                    rowExpandable: (record) => record.ruta !== "Not Expandable"
                  }}
                />
              )
            },
            {
              key: "2",
              label: (
                <Space>
                  <Text>Finalizadas</Text>
                  <Badge count={8} style={{ backgroundColor: colorPrimary }} />
                </Space>
              ),
              children: (
                <Table<Trip>
                  columns={columns}
                  dataSource={tripData}
                  pagination={{
                    pageSize: 5,
                    total: tripData.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: ["5", "10", "20", "50"]
                  }}
                  scroll={{ x: 1000 }}
                />
              )
            },
            {
              key: "3",
              label: (
                <Space>
                  <Text>Planeadas</Text>
                  <Badge count={3} style={{ backgroundColor: colorPrimary }} />
                </Space>
              ),
              children: (
                <Table<Trip>
                  columns={columns}
                  dataSource={tripData}
                  pagination={{
                    pageSize: 10,
                    total: tripData.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: ["5", "10", "20", "50"]
                  }}
                  scroll={{ x: 1000 }}
                />
              )
            }
          ]}
        />
      </Content>
    </Layout>
  )
}
