'use client'

import LoginForm from '@/components/forms/LoginForm'
import {
  Card,
  Col,
  ConfigProvider,
  Flex,
  Row,
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
    token: { colorPrimary, margin }
  } = theme.useToken()

  const heightCard = '70vh'

  return (
    <ConfigProvider theme={themeConfig}>
      <Row justify={'center'} align={'middle'} style={{ minHeight: '100vh' }}>
        <Col xs={22} md={16}>
          <Card style={{ height: heightCard }}>
            <Row style={{ height: heightCard }}>
              <Col
                xs={0}
                lg={12}
                style={{
                  height: heightCard
                }}
              >
                <Flex
                  orientation="vertical"
                  justify="center"
                  align="center"
                  style={{ backgroundColor: colorPrimary, height: heightCard }}
                >
                  <div style={{ width: '70%', height: 'auto' }}>
                    <img
                      src="/logo.svg"
                      alt="BusPort Logo"
                      style={{
                        width: '100%',
                        filter: 'invert(1) brightness(10)'
                      }}
                    />
                  </div>
                </Flex>
              </Col>
              <Col
                xs={24}
                lg={12}
                style={{
                  height: heightCard
                }}
              >
                <Flex
                  orientation="vertical"
                  justify="center"
                  align="center"
                  style={{ height: heightCard }}
                >
                  <Row
                    justify="center"
                    align="middle"
                    style={{ marginBottom: margin }}
                  >
                    <Col lg={0}>
                      <img
                        src="/logo.svg"
                        alt="BusPort Logo"
                        style={{
                          width: '150px'
                        }}
                      />
                    </Col>
                  </Row>
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
