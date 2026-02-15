'use client'

import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Button, Divider, Layout, Space, Table, theme, Typography } from 'antd'
import styles from './page.module.css'

const { Header, Content } = Layout
const { Title } = Typography

interface Vehiculo {
  key: string
  numero: string
  matricula: string
  tipo: string
  capacidad: number
}

const vehiculosData: Vehiculo[] = [
  { key: '1', numero: '001', matricula: 'ABC-123', tipo: 'Bus', capacidad: 40 },
  { key: '2', numero: '002', matricula: 'DEF-456', tipo: 'Van', capacidad: 12 },
  {
    key: '3',
    numero: '003',
    matricula: 'GHI-789',
    tipo: 'Micro',
    capacidad: 20
  },
  { key: '4', numero: '004', matricula: 'JKL-012', tipo: 'Bus', capacidad: 50 },
  { key: '5', numero: '005', matricula: 'MNO-345', tipo: 'Van', capacidad: 15 }
]

const vehiculosColumns: TableColumnsType<Vehiculo> = [
  {
    title: 'Número',
    dataIndex: 'numero',
    key: 'numero',
    width: 120,
    filters: Array.from(new Set(vehiculosData.map((v) => v.numero))).map(
      (n) => ({ text: n, value: n })
    ),
    onFilter: (value, record) => record.numero === value,
    filterSearch: true
  },
  {
    title: 'Matrícula',
    dataIndex: 'matricula',
    key: 'matricula',
    width: 150,
    filters: Array.from(new Set(vehiculosData.map((v) => v.matricula))).map(
      (m) => ({ text: m, value: m })
    ),
    onFilter: (value, record) => record.matricula === value,
    filterSearch: true
  },
  {
    title: 'Tipo',
    dataIndex: 'tipo',
    key: 'tipo',
    width: 140,
    filters: Array.from(new Set(vehiculosData.map((v) => v.tipo))).map((t) => ({
      text: t,
      value: t
    })),
    onFilter: (value, record) => record.tipo === value,
    filterSearch: true
  },
  {
    title: 'Capacidad',
    dataIndex: 'capacidad',
    key: 'capacidad',
    width: 120,
    sorter: (a, b) => a.capacidad - b.capacidad,
    defaultSortOrder: 'ascend'
  }
]

export default function CarsPage() {
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
          Lista de vehículos
        </Title>
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>
            Añadir Vehículo
          </Button>
        </Space>
      </Header>
      <Divider style={{ margin: 0 }} />
      <Content style={{ padding: padding }}>
        <Table<Vehiculo>
          columns={vehiculosColumns}
          dataSource={vehiculosData}
          pagination={{
            pageSize: 5,
            total: vehiculosData.length,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['5', '10', '20', '50']
          }}
          scroll={{ x: 600 }}
        />
      </Content>
    </Layout>
  )
}
