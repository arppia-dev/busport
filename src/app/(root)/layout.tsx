"use client"

import { useTheme } from "@/components/ThemeProvider"
import {
  CarOutlined,
  ControlOutlined,
  DashboardOutlined,
  DownOutlined,
  LineChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  RocketOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined
} from "@ant-design/icons"
import {
  Layout as AntLayout,
  Button,
  Divider,
  Dropdown,
  Flex,
  Menu,
  MenuProps,
  Space,
  Switch,
  theme,
  Typography
} from "antd"
import { useState } from "react"
import styles from "./page.module.css"

const { Header, Sider, Content, Footer } = AntLayout
const { Text } = Typography

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const { isDark, setIsDark } = useTheme()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Monitor"
    },
    {
      key: "2",
      icon: <RocketOutlined />,
      label: "Viajes"
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Clientes"
    },
    {
      key: "4",
      icon: <ControlOutlined />,
      label: "Planificaciones"
    },
    {
      key: "5",
      icon: <CarOutlined />,
      label: "Transporte",
      children: [
        {
          key: "5.1",
          icon: <UserOutlined />,
          label: "Conductores"
        },
        {
          key: "5.2",
          icon: <CarOutlined />,
          label: "Carros"
        }
      ]
    },
    {
      key: "7",
      icon: <LineChartOutlined />,
      label: "Reportes"
    }
  ]

  const items: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Mi Perfil"
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Configuración"
    },
    {
      type: "divider"
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Cerrar sesión",
      danger: true
    }
  ]

  return (
    <AntLayout className={styles.dashboardLayout} style={{ minHeight: "100%" }}>
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
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>

      <AntLayout>
        <Header
          className={styles.header}
          style={{ background: colorBgContainer }}
        >
          <Flex justify="space-between" align="center">
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ fontSize: "1.2rem" }} />
                ) : (
                  <MenuFoldOutlined style={{ fontSize: "1.2rem" }} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
            />
            <Space>
              <Switch
                checked={isDark}
                onChange={(checked) => setIsDark(checked)}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
              />
              <Dropdown
                menu={{ items: items }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Text>Bienvenido, SAIRO CARVA (Usuario)</Text>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Space>
          </Flex>
        </Header>

        <Content className={styles.content}>{children}</Content>

        <Divider size="small"></Divider>
        <Footer className={styles.footer}>
          BusPort © 2026 - Sistema de Gestión de Buses
        </Footer>
      </AntLayout>
    </AntLayout>
  )
}
