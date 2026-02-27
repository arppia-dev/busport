'use client'

import { useTheme } from '@/components/ThemeProvider'
import { getBreadcrumbData } from '@/utils/getBreadcrumbData'
import {
  CarOutlined,
  ControlOutlined,
  DashboardOutlined,
  DownOutlined,
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  RocketOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined
} from '@ant-design/icons'
import {
  Layout as AntLayout,
  Breadcrumb,
  Button,
  Col,
  ConfigProvider,
  Divider,
  Dropdown,
  Menu,
  MenuProps,
  Row,
  Segmented,
  Space,
  theme,
  Typography
} from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

const { Header, Sider, Content, Footer } = AntLayout
const { Text } = Typography

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const breadcrumbItems = getBreadcrumbData(pathname)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const { isDark, setIsDark } = useTheme()
  const { data: session } = useSession()

  useEffect(() => {
    const isCollapsed = localStorage.getItem('isCollapsed')
    setCollapsed(isCollapsed ? JSON.parse(isCollapsed) : false)
  }, [])

  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    const logoutAfterInactivity = () => {
      signOut()
    }
    const resetTimer = () => {
      if (inactivityTimeout.current) clearTimeout(inactivityTimeout.current)
      inactivityTimeout.current = setTimeout(
        logoutAfterInactivity,
        5 * 60 * 1000
      )
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    events.forEach((event) => window.addEventListener(event, resetTimer))
    resetTimer()
    return () => {
      if (inactivityTimeout.current) clearTimeout(inactivityTimeout.current)
      events.forEach((event) => window.removeEventListener(event, resetTimer))
    }
  }, [])

  const {
    token: { colorPrimary, colorBgContainer, padding }
  } = theme.useToken()

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link href="/">Monitor</Link>
    },
    {
      key: '2',
      icon: <RocketOutlined />,
      label: <Link href="/trips">Viajes</Link>
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: <Link href="/clients">Clientes</Link>
    },
    {
      key: '4',
      icon: <ControlOutlined />,
      label: 'Planificaciones',
      children: [
        {
          key: '4.1',
          icon: <ControlOutlined />,
          label: <Link href="/planning/routes">Viajes con Ruta</Link>
        },
        {
          key: '4.2',
          icon: <ControlOutlined />,
          label: <Link href="/planning/seats">Reserva de Asiento</Link>
        }
      ]
    },
    {
      key: '5',
      icon: <CarOutlined />,
      label: 'Transporte',
      children: [
        {
          key: '5.1',
          icon: <UserOutlined />,
          label: <Link href="/transport/drivers">Conductores</Link>
        },
        {
          key: '5.2',
          icon: <CarOutlined />,
          label: <Link href="/transport/cars">Vehículos</Link>
        }
      ]
    },
    {
      key: '7',
      icon: <LineChartOutlined />,
      label: 'Reportes'
    }
  ]

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Mi Perfil'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Configuración'
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Cerrar sesión',
      onClick: () => signOut(),
      danger: true
    }
  ]

  return (
    <AntLayout className={styles.dashboardLayout} style={{ minHeight: '100%' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
      >
        <div className={styles.logo}>
          {!collapsed ? (
            <span>
              <img
                src="/logo.svg"
                alt="BusPort Logo"
                className={styles.logoImage}
              />
            </span>
          ) : (
            <span>B</span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />
      </Sider>

      <AntLayout>
        <Header
          className={styles.header}
          style={{ background: colorBgContainer }}
        >
          <Row align="middle" gutter={padding}>
            <Col flex="none">
              <Button
                type="text"
                icon={
                  collapsed ? (
                    <MenuUnfoldOutlined style={{ fontSize: '1.2rem' }} />
                  ) : (
                    <MenuFoldOutlined style={{ fontSize: '1.2rem' }} />
                  )
                }
                onClick={() => {
                  setCollapsed(!collapsed)
                  localStorage.setItem(
                    'isCollapsed',
                    JSON.stringify(!collapsed)
                  )
                }}
              />
            </Col>
            <Col flex="none" xs={0} md={12}>
              {breadcrumbItems.length > 1 && (
                <Breadcrumb
                  items={[
                    {
                      title: <HomeOutlined />,
                      href: '/'
                    },
                    ...breadcrumbItems.slice(1)
                  ]}
                />
              )}
            </Col>
            <Col flex="none" style={{ marginLeft: 'auto' }}>
              <ConfigProvider
                theme={{
                  components: {
                    Segmented: {
                      itemSelectedColor: '#fff',
                      itemSelectedBg: colorPrimary
                    }
                  }
                }}
              >
                <Segmented
                  size={'small'}
                  shape="round"
                  value={isDark ? 'false' : 'true'}
                  onChange={() => setIsDark(!isDark)}
                  options={[
                    { value: 'true', icon: <SunOutlined /> },
                    { value: 'false', icon: <MoonOutlined /> }
                  ]}
                />
              </ConfigProvider>
            </Col>
            <Col flex="none" xs={0} lg={12}>
              <Dropdown
                menu={{ items: items }}
                placement="bottomRight"
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Text>
                      Bienvenido, {session?.user?.name}{' '}
                      {session?.user?.lastname}
                    </Text>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Col>
          </Row>
        </Header>

        <Content className={styles.content} style={{ padding: padding }}>
          {children}
        </Content>

        <Divider size="small"></Divider>
        <Footer className={styles.footer}>
          BusPort © 2026 - Sistema de Gestión de Buses
        </Footer>
      </AntLayout>
    </AntLayout>
  )
}
