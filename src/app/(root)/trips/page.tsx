'use client'

import TripTable from '@/components/tables/TripTable'
import { EyeInvisibleFilled, EyeOutlined } from '@ant-design/icons'
import {
  Badge,
  Button,
  Divider,
  Layout,
  Space,
  Tabs,
  theme,
  Typography
} from 'antd'
import React from 'react'
import styles from './page.module.css'

const { Header, Content } = Layout
const { Title, Text } = Typography

export default function TripsPage() {
  const [expandable, setExpandable] = React.useState(false)
  const {
    token: { colorPrimary, colorBgContainer }
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
          Lista de Viajes por Estado
        </Title>
        <Button
          icon={expandable ? <EyeInvisibleFilled /> : <EyeOutlined />}
          onClick={() => setExpandable(!expandable)}
        >
          {expandable
            ? 'Ocultar Progreso de Paradas'
            : 'Mostrar Progreso de Paradas'}
        </Button>
      </Header>
      <Divider style={{ margin: 0 }} />
      <Content className={styles.tripsPage}>
        <Tabs
          items={[
            {
              key: '1',
              label: (
                <Space>
                  <Text>En Curso</Text>
                  <Badge count={5} style={{ backgroundColor: colorPrimary }} />
                </Space>
              ),
              children: <TripTable expandable={expandable} />
            },
            {
              key: '2',
              label: (
                <Space>
                  <Text>Finalizadas</Text>
                  <Badge count={8} style={{ backgroundColor: colorPrimary }} />
                </Space>
              ),
              children: <TripTable expandable={expandable} />
            },
            {
              key: '3',
              label: (
                <Space>
                  <Text>Planeadas</Text>
                  <Badge count={3} style={{ backgroundColor: colorPrimary }} />
                </Space>
              ),
              children: <TripTable expandable={expandable} />
            }
          ]}
        />
      </Content>
    </Layout>
  )
}
