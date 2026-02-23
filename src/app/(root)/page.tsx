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

const { Header, Content } = Layout
const { Title, Text } = Typography

export default function DashboardPage() {
  const {
    token: { colorBgContainer, padding }
  } = theme.useToken()

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
            <OpenLayersMap2 center={[-79.5566249, 8.9688727]} zoom={10} />
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
