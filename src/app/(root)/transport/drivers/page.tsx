'use client'

import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Button, Divider, Layout, Space, Table, theme, Typography } from 'antd'
import styles from './page.module.css'

const { Header, Content } = Layout
const { Title } = Typography

interface Conductor {
  key: string
  nombreConductor: string
  operador: string
  nombreUsuario: string // cédula panameña
}

const conductoresData: Conductor[] = [
  {
    key: '1',
    nombreConductor: 'Carlos García',
    operador: 'Transporte Plus',
    nombreUsuario: '8-123-456'
  },
  {
    key: '2',
    nombreConductor: 'María López',
    operador: 'Viajes Seguros',
    nombreUsuario: '8-234-567'
  },
  {
    key: '3',
    nombreConductor: 'Juan Pérez',
    operador: 'Transporte Plus',
    nombreUsuario: '8-345-678'
  },
  {
    key: '4',
    nombreConductor: 'Ana Castillo',
    operador: 'Rápidos del Sur',
    nombreUsuario: '8-456-789'
  },
  {
    key: '5',
    nombreConductor: 'Luis Martínez',
    operador: 'Transporte Express',
    nombreUsuario: '8-567-890'
  },
  {
    key: '6',
    nombreConductor: 'Pedro Sánchez',
    operador: 'Viajes Seguros',
    nombreUsuario: '8-678-901'
  },
  {
    key: '7',
    nombreConductor: 'Sofía Herrera',
    operador: 'Transporte Plus',
    nombreUsuario: '8-789-012'
  },
  {
    key: '8',
    nombreConductor: 'Ricardo Díaz',
    operador: 'Rápidos del Sur',
    nombreUsuario: '8-890-123'
  }
]

const conductoresColumns: TableColumnsType<Conductor> = [
  {
    title: 'Nombre del conductor',
    dataIndex: 'nombreConductor',
    key: 'nombreConductor',
    width: 200,
    filters: Array.from(
      new Set(conductoresData.map((c) => c.nombreConductor))
    ).map((nombre) => ({ text: nombre, value: nombre })),
    onFilter: (value, record) => record.nombreConductor === value,
    filterSearch: true
  },
  {
    title: 'Operador',
    dataIndex: 'operador',
    key: 'operador',
    width: 180,
    filters: Array.from(new Set(conductoresData.map((c) => c.operador))).map(
      (operador) => ({ text: operador, value: operador })
    ),
    onFilter: (value, record) => record.operador === value,
    filterSearch: true
  },
  {
    title: 'Nombre de usuario',
    dataIndex: 'nombreUsuario',
    key: 'nombreUsuario',
    width: 150,
    filters: Array.from(
      new Set(conductoresData.map((c) => c.nombreUsuario))
    ).map((nombreUsuario) => ({ text: nombreUsuario, value: nombreUsuario })),
    onFilter: (value, record) => record.nombreUsuario === value,
    filterSearch: true
  }
]

export default function DriversPage() {
  const {
    token: { colorPrimary, colorBgContainer, padding }
  } = theme.useToken()

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
          Lista de Conductores
        </Title>
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>
            Añadir Conductor
          </Button>
        </Space>
      </Header>
      <Divider style={{ margin: 0 }} />
      <Content style={{ padding: padding }}>
        <Table<Conductor>
          columns={conductoresColumns}
          dataSource={conductoresData}
          pagination={{
            pageSize: 10,
            total: conductoresData.length,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
          scroll={{ x: 600 }}
        />
      </Content>
    </Layout>
  )
}
