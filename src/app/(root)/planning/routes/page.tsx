'use client'

import RouteTable from '@/components/tables/RouteTabla'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Layout, Space, Table, theme, Typography } from 'antd'

const { Header, Content } = Layout
const { Title } = Typography

export default function RoutesPage() {
  const {
    token: { colorBgContainer, padding }
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
        <RouteTable />
      </Content>
    </Layout>
  )
}
