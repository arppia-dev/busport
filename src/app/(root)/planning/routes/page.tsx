"use client"

import {
  ArrowRightOutlined,
  CarOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  SettingOutlined,
  TeamOutlined
} from "@ant-design/icons"
import type { TableColumnsType } from "antd"
import {
  Button,
  Divider,
  Layout,
  Space,
  Switch,
  Table,
  Tag,
  theme,
  Typography
} from "antd"

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

interface Route {
  key: string
  codigo: string
  estado: "In" | "Out"
  nombre: string
  empresa: string
  dias: string[]
  salida: string
  conductor: string
  automovil: string
  publicado: { conductor: boolean; cliente: boolean }
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

const routesData: Route[] = [
  {
    key: "1",
    codigo: "R101",
    estado: "In",
    nombre: "Centro a Aeropuerto",
    empresa: "Transporte Plus",
    dias: ["Lun", "Mar", "Mie", "Jue", "Vie"],
    salida: "06:30:00",
    conductor: "Carlos García",
    automovil: "*",
    publicado: { conductor: false, cliente: false }
  },
  {
    key: "2",
    codigo: "R205",
    estado: "Out",
    nombre: "Terminal Sur a Estación Central",
    empresa: "Viajes Seguros",
    dias: ["Lun", "Mie", "Vie", "Dom"],
    salida: "07:00:00",
    conductor: "María López",
    automovil: "BUS-2025",
    publicado: { conductor: true, cliente: false }
  },
  {
    key: "3",
    codigo: "R312",
    estado: "In",
    nombre: "Estación Central a Universidad",
    empresa: "Viajes Express",
    dias: ["Mar", "Jue", "Vie"],
    salida: "08:15:00",
    conductor: "Juan Pérez",
    automovil: "BUS-312",
    publicado: { conductor: false, cliente: true }
  },
  {
    key: "4",
    codigo: "R410",
    estado: "Out",
    nombre: "Aeropuerto a Centro",
    empresa: "Transporte Plus",
    dias: ["Sab", "Dom"],
    salida: "09:00:00",
    conductor: "Carlos García",
    automovil: "VAN-410",
    publicado: { conductor: false, cliente: false }
  },
  {
    key: "5",
    codigo: "R520",
    estado: "In",
    nombre: "Universidad a Terminal Sur",
    empresa: "Viajes Seguros",
    dias: ["Lun", "Mar", "Mie", "Jue", "Vie"],
    salida: "10:30:00",
    conductor: "María López",
    automovil: "BUS-520",
    publicado: { conductor: true, cliente: true }
  },
  {
    key: "6",
    codigo: "R601",
    estado: "Out",
    nombre: "Centro a Estación Central",
    empresa: "Viajes Express",
    dias: ["Vie", "Sab"],
    salida: "11:45:00",
    conductor: "Juan Pérez",
    automovil: "VAN-601",
    publicado: { conductor: false, cliente: true }
  },
  {
    key: "7",
    codigo: "R702",
    estado: "In",
    nombre: "Terminal Sur a Universidad",
    empresa: "Transporte Plus",
    dias: ["Mar", "Jue", "Sab"],
    salida: "12:00:00",
    conductor: "Carlos García",
    automovil: "BUS-702",
    publicado: { conductor: true, cliente: false }
  }
]

const diasSemana = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]

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

const routesColumns: TableColumnsType<Route> = [
  {
    title: "Código de Ruta",
    dataIndex: "codigo",
    key: "codigo",
    render: (codigo: string, record: Route) => (
      <Tag color={record.estado === "In" ? "green" : "gold"}>{codigo}</Tag>
    ),
    width: 50
  },
  {
    title: "Título de la Ruta",
    dataIndex: "nombre",
    key: "nombre",
    width: 200
  },
  {
    title: "Empresa",
    dataIndex: "empresa",
    key: "empresa",
    width: 150
  },
  {
    title: "Días de la Semana",
    dataIndex: "dias",
    key: "dias",
    render: (dias: string[]) => (
      <Space>
        {diasSemana.map((dia) => (
          <Tag color={dias.includes(dia) ? "green" : "default"} key={dia}>
            {dia}
          </Tag>
        ))}
      </Space>
    ),
    width: 300
  },
  {
    title: "Primera Salida",
    dataIndex: "salida",
    key: "salida",
    width: 50
  },
  {
    title: "Conductor",
    dataIndex: "conductor",
    key: "conductor",
    width: 150
  },
  {
    title: "Automóvil",
    dataIndex: "automovil",
    key: "automovil",
    render: (auto: string) => (auto === "*" ? <span>*</span> : auto),
    width: 50
  },
  {
    title: "Publicado",
    dataIndex: "publicado",
    key: "publicado",
    render: (pub: boolean, record: Route) => <Switch checked={pub} />,
    width: 50
  },
  {
    title: "Vista",
    key: "vista",
    render: (record: Route) => (
      <Space>
        <Button
          icon={<CarOutlined />}
          size="small"
          type={record.publicado.conductor ? "primary" : "default"}
          onClick={() => alert(`Vista previa de la ruta ${record.codigo}`)}
        />
        <Button
          icon={<TeamOutlined />}
          size="small"
          type={record.publicado.cliente ? "primary" : "default"}
        />
      </Space>
    ),
    width: 50
  },
  {
    title: "Acciones",
    key: "acciones",
    render: () => <Button icon={<SettingOutlined />} size="small" />,
    width: 50
  },
  {
    title: "",
    key: "otra",
    render: () => <Button icon={<ArrowRightOutlined />} size="small" />,
    width: 50
  }
]

export default function RoutesPage() {
  const {
    token: { colorBgContainer, padding }
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
          Lista de Rutas
        </Title>
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>
            Añadir Nueva Planificaciòn
          </Button>
        </Space>
      </Header>
      <Divider style={{ margin: 0 }} />
      <Content style={{ padding: padding }}>
        <Table<Route>
          columns={routesColumns}
          dataSource={routesData}
          pagination={{
            pageSize: 5,
            total: routesData.length,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ["5", "10", "20", "50"]
          }}
          scroll={{ x: 1200 }}
        />
      </Content>
    </Layout>
  )
}
