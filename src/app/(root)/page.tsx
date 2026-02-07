"use client"

import { Row, Col, Card, Statistic, Table, Tag } from "antd"
import {
  BugOutlined,
  UserOutlined,
  DollarOutlined,
  CheckCircleOutlined
} from "@ant-design/icons"
import styles from "./page.module.css"

export default function DashboardPage() {
  const columns = [
    {
      title: "Ruta",
      dataIndex: "route",
      key: "route"
    },
    {
      title: "Bus",
      dataIndex: "bus",
      key: "bus"
    },
    {
      title: "Pasajeros",
      dataIndex: "passengers",
      key: "passengers",
      align: "center" as const
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          "En ruta": "blue",
          Disponible: "green",
          Mantenimiento: "red"
        }
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>
      }
    }
  ]

  const data = [
    {
      key: "1",
      route: "Ruta 1 - Centro",
      bus: "BS-001",
      passengers: 45,
      status: "En ruta"
    },
    {
      key: "2",
      route: "Ruta 2 - Norte",
      bus: "BS-002",
      passengers: 50,
      status: "En ruta"
    },
    {
      key: "3",
      route: "Ruta 3 - Sur",
      bus: "BS-003",
      passengers: 38,
      status: "Disponible"
    }
  ]

  return (
    <div className={styles.dashboardPage}>
      <Row gutter={[16, 16]} className={styles.statsRow}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Buses Activos"
              value={12}
              prefix={<BugOutlined />}
              styles={{ content: { color: "#667eea" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pasajeros Hoy"
              value={1238}
              prefix={<UserOutlined />}
              styles={{ content: { color: "#52c41a" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ingresos"
              value={45230}
              prefix={<DollarOutlined />}
              styles={{ content: { color: "#faad14" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Rutas Completadas"
              value={89}
              prefix={<CheckCircleOutlined />}
              styles={{ content: { color: "#1890ff" } }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className={styles.tableRow}>
        <Col span={24}>
          <Card title="Buses en Servicio">
            <Table columns={columns} dataSource={data} pagination={false} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
