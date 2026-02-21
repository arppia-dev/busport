'use client'

import OpenLayersMap, { CoordsProps } from '@/components/OpenLayersMap'
import { socket } from '@/utils/socketClient'
import {
  Button,
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
import { useEffect, useState } from 'react'
import styles from './page.module.css'

const { Header, Content } = Layout
const { Title, Text } = Typography

export default function DashboardPage() {
  const {
    token: { colorBgContainer, padding }
  } = theme.useToken()

  const [busCoords, setBusCoords] = useState<CoordsProps[]>([])

  useEffect(() => {
    socket.on('message', (data: any) => {
      console.log('Received bus data:', data)
      setBusCoords((prev: CoordsProps[]) => {
        const idx = prev.findIndex((b: CoordsProps) => b.node === data.node)
        if (idx !== -1) {
          const updated = [...prev]
          updated[idx] = data
          return updated
        } else {
          return [...prev, data]
        }
      })
    })
    return () => {
      socket.off('message')
    }
  }, [])

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
              center={[-79.5566249, 8.9688727]}
              zoom={13}
              coords={busCoords}
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
