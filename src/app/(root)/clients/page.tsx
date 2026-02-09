"use client"

import { PlusOutlined } from "@ant-design/icons"
import type { TableColumnsType } from "antd"
import {
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

const clientesColumns: TableColumnsType<Cliente> = [
  {
    title: "Nombre de la empresa",
    dataIndex: "nombreEmpresa",
    key: "nombreEmpresa",
    width: 200
  },
  {
    title: "Código de la empresa",
    dataIndex: "codigoEmpresa",
    key: "codigoEmpresa",
    width: 150
  }
]

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

export default function ClientsPage() {
  const {
    token: { colorPrimary, colorBgContainer, padding }
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
          Lista de Clientes
        </Title>
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>
            Añadir Empresa
          </Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Añadir Empleado
          </Button>
        </Space>
      </Header>
      <Divider style={{ margin: 0 }} />
      <Content style={{ padding: padding }}>
        <Tabs
          items={[
            {
              key: "1",
              label: <Text>Clientes</Text>,
              children: (
                <Table<Cliente>
                  columns={clientesColumns}
                  dataSource={clientesData}
                  pagination={{
                    pageSize: 5,
                    total: clientesData.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: ["5", "10", "20", "50"]
                  }}
                  scroll={{ x: 600 }}
                />
              )
            },
            {
              key: "2",
              label: <Text>Empleados</Text>,
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
