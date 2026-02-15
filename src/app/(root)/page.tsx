'use client'

import OpenLayersMap from '@/components/OpenLayersMap'
import {
  Col,
  Divider,
  Flex,
  Layout,
  Row,
  Select,
  Space,
  Tag,
  theme,
  Typography
} from 'antd'
import styles from './page.module.css'

const { Header, Content } = Layout
const { Title, Text } = Typography

export default function DashboardPage() {
  const {
    token: { colorBgContainer, padding }
  } = theme.useToken()

  const columns = [
    {
      title: 'Ruta',
      dataIndex: 'route',
      key: 'route'
    },
    {
      title: 'Bus',
      dataIndex: 'bus',
      key: 'bus'
    },
    {
      title: 'Pasajeros',
      dataIndex: 'passengers',
      key: 'passengers',
      align: 'center' as const
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          'En ruta': 'blue',
          Disponible: 'green',
          Mantenimiento: 'red'
        }
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>
      }
    }
  ]

  const data = [
    {
      key: '1',
      route: 'Ruta 1 - Centro',
      bus: 'BS-001',
      passengers: 45,
      status: 'En ruta'
    },
    {
      key: '2',
      route: 'Ruta 2 - Norte',
      bus: 'BS-002',
      passengers: 50,
      status: 'En ruta'
    },
    {
      key: '3',
      route: 'Ruta 3 - Sur',
      bus: 'BS-003',
      passengers: 38,
      status: 'Disponible'
    }
  ]

  return (
    <div className={styles.dashboardPage}>
      <Row
        style={{
          height: 'calc(100vh - 64px - 40px)',
          flexDirection: 'column'
        }}
      >
        <Col span={24} style={{ flex: 8 }}>
          <div style={{ height: '100%' }}>
            <OpenLayersMap
              center={[-79.510298, 9.008566]}
              zoom={13}
              coords={[
                {
                  node: 'Bus-001',
                  date: new Date(),
                  coords: {
                    latitude: 9.008566,
                    longitude: -79.510298,
                    accuracy: 10
                  }
                },
                {
                  node: 'Bus-002',
                  date: new Date(),
                  coords: {
                    latitude: 8.9954,
                    longitude: -79.532,
                    accuracy: 10
                  }
                },
                {
                  node: 'Bus-003',
                  date: new Date(),
                  coords: {
                    latitude: 8.9694,
                    longitude: -79.508,
                    accuracy: 10
                  }
                },
                {
                  node: 'Bus-004',
                  date: new Date(),
                  coords: {
                    latitude: 8.9944,
                    longitude: -79.506,
                    accuracy: 10
                  }
                },
                {
                  node: 'Bus-005',
                  date: new Date(),
                  coords: {
                    latitude: 8.9704,
                    longitude: -79.534,
                    accuracy: 10
                  }
                },
                {
                  node: 'Bus-006',
                  date: new Date(),
                  coords: {
                    latitude: 8.9714,
                    longitude: -79.507,
                    accuracy: 10
                  }
                }
              ]}
            />
          </div>
        </Col>
        <Col span={24} style={{ flex: 2 }}>
          <div
            style={{
              height: '100%',
              paddingTop: padding,
              paddingBottom: padding
            }}
          >
            <Header
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingInline: padding,
                background: colorBgContainer
              }}
            >
              <Title level={5} style={{ margin: 0 }}>
                Viajes
              </Title>
            </Header>
            <Divider style={{ margin: 0 }} />
            <Content
              style={{
                padding: padding,
                background: colorBgContainer
              }}
            >
              <Space size={'large'}>
                <Select
                  defaultValue="all"
                  style={{ width: 300 }}
                  onChange={(value: string) => {
                    console.log(`selected ${value}`)
                  }}
                  options={[
                    { value: 'all', label: 'Todas las Empresas' },
                    { value: 'empresa1', label: 'Empresa 1' },
                    { value: 'empresa2', label: 'Empresa 2' },
                    { value: 'empresa3', label: 'Empresa 3' }
                  ]}
                />
                <Flex gap={100} justify="space-between">
                  <Flex orientation="vertical">
                    <Title level={4} style={{ margin: 0 }}>
                      12
                    </Title>
                    <Text>En curso</Text>
                  </Flex>
                  <Flex orientation="vertical">
                    <Title level={4} style={{ margin: 0 }}>
                      12
                    </Title>
                    <Text>Recién finalizadas</Text>
                  </Flex>
                  <Flex orientation="vertical">
                    <Title level={4} style={{ margin: 0 }}>
                      12
                    </Title>
                    <Text>Total</Text>
                  </Flex>
                  <Flex orientation="vertical">
                    <Title level={4} style={{ margin: 0 }}>
                      12
                    </Title>
                    <Text>Rutas</Text>
                  </Flex>
                  <Flex orientation="vertical">
                    <Title level={4} style={{ margin: 0 }}>
                      12
                    </Title>
                    <Text>Empresas</Text>
                  </Flex>
                </Flex>
              </Space>
            </Content>
          </div>
        </Col>
      </Row>
    </div>
  )
}
