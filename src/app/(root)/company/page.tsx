'use client'

import CompanyTable from '@/components/tables/CompanyTable'
import EmployeeTable from '@/components/tables/EmployeeTable'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Layout, Space, Tabs, theme, Typography } from 'antd'

const { Header, Content } = Layout
const { Title, Text } = Typography

export default function ClientsPage() {
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
              key: '1',
              label: <Text>Empresas</Text>,
              children: <CompanyTable />
            },
            {
              key: '2',
              label: <Text>Empleados</Text>,
              children: <EmployeeTable />
            }
          ]}
        />
      </Content>
    </Layout>
  )
}
