'use client'

import LoginForm from '@/components/LoginForm'
import { darken } from '@/utils/colors'
import {
  Card,
  Col,
  ConfigProvider,
  Flex,
  Row,
  Space,
  theme,
  ThemeConfig,
  Typography
} from 'antd'

const { Title, Text } = Typography

const themeConfig: ThemeConfig = {
  components: {
    Card: {
      padding: 0,
      paddingLG: 0
    }
  }
}

export default function LoginPage() {
  const {
    token: { colorPrimary, padding, paddingLG }
  } = theme.useToken()

  const heightCard = '70vh'
  const centerContent = {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <Row justify={'center'} align={'middle'} style={{ minHeight: '100vh' }}>
        <Col span={16}>
          <Card style={{ height: heightCard }}>
            <Row style={{ height: heightCard }}>
              <Col
                span={12}
                style={{
                  height: heightCard,
                  backgroundColor: colorPrimary,
                  ...centerContent
                }}
              >
                <Space orientation="vertical" align="center">
                  <Title level={1} style={{ color: '#fff' }}>
                    BusPort
                  </Title>
                  <Title
                    level={3}
                    type="secondary"
                    style={{ color: darken('#fff', 20) }}
                  >
                    Sistema de Gestión de Buses
                  </Title>
                </Space>
              </Col>
              <Col span={12} style={centerContent}>
                <Flex orientation="vertical" align="center">
                  <Title level={4}>Iniciar Sesión</Title>
                  <LoginForm />
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
