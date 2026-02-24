'use client'

import OpenLayersMap2 from '@/components/OpenLayersMap2'
import {
  Col,
  Divider,
  Flex,
  Layout,
  Row,
  Select,
  Space,
  theme,
  Typography
} from 'antd'
import styles from './page.module.css'
import randomColor from 'randomcolor'

const { Header, Content } = Layout
const { Title, Text } = Typography

export default function DashboardPage() {
  const {
    token: { colorBgContainer, padding }
  } = theme.useToken()
  const color = () => randomColor({ luminosity: 'dark' })

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
            <OpenLayersMap2
              center={[-79.5566249, 8.9688727]}
              zoom={10}
              routes={[
                {
                  color: color(),
                  coords: [
                    { latitude: 8.9735408, longitude: -79.7006662 },
                    { latitude: 8.9630279, longitude: -79.6940572 },
                    { latitude: 8.9584416, longitude: -79.6874482 },
                    { latitude: 8.9520831, longitude: -79.6808392 },
                    { latitude: 8.9412657, longitude: -79.6650124 },
                    { latitude: 8.9285934, longitude: -79.6480456 }
                  ]
                },
                {
                  color: color(),
                  coords: [
                    { latitude: 9.096278, longitude: -79.351124 },
                    { latitude: 9.082998, longitude: -79.398875 },
                    { latitude: 8.986442, longitude: -79.507372 }
                  ]
                },
                {
                  color: color(),
                  coords: [
                    { latitude: 8.897242, longitude: -79.751692 },
                    { latitude: 9.03543, longitude: -79.57787 },
                    { latitude: 9.115209, longitude: -79.57717 }
                  ]
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
