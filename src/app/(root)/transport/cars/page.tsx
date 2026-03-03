'use client'

import CarTable from '@/components/tables/CarTable'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Layout, Space, theme, Typography } from 'antd'
import { useRouter } from 'next/navigation'

const { Header, Content } = Layout
const { Title } = Typography

export default function CarsPage() {
  const router = useRouter()

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
          Lista de carros
        </Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push('/transport/cars/new')}
          >
            Añadir Carro
          </Button>
        </Space>
      </Header>
      <Divider style={{ margin: 0 }} />
      <Content style={{ padding: padding }}>
        <CarTable />
      </Content>
    </Layout>
  )
}
