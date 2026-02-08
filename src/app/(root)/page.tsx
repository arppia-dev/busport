"use client"

import OpenLayersMap from "@/components/OpenLayersMap"
import {
  BugOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Card, Col, Row, Statistic, Tag } from "antd"
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
      <Row
        gutter={[16, 16]}
        className={styles.statsRow}
        justify={"space-between"}
      >
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="En Curso"
              value={12}
              prefix={<BugOutlined />}
              styles={{ content: { color: "#667eea" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="Recién Finalizadas"
              value={1238}
              prefix={<UserOutlined />}
              styles={{ content: { color: "#52c41a" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="Total"
              value={45230}
              prefix={<DollarOutlined />}
              styles={{ content: { color: "#faad14" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="Rutas"
              value={89}
              prefix={<CheckCircleOutlined />}
              styles={{ content: { color: "#1890ff" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="Empresas"
              value={89}
              prefix={<CheckCircleOutlined />}
              styles={{ content: { color: "#1890ff" } }}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ minHeight: "100%" }}>
        <Col span={24}>
          <OpenLayersMap
            center={[-79.5199, 8.9824]}
            zoom={13}
            coords={[
              {
                node: "Bus-001",
                date: new Date(),
                coords: {
                  latitude: 8.9924,
                  longitude: -79.5299,
                  accuracy: 10
                }
              },
              {
                node: "Bus-002",
                date: new Date(),
                coords: {
                  latitude: 8.9954,
                  longitude: -79.532,
                  accuracy: 10
                }
              },
              {
                node: "Bus-003",
                date: new Date(),
                coords: {
                  latitude: 8.9694,
                  longitude: -79.508,
                  accuracy: 10
                }
              },
              {
                node: "Bus-004",
                date: new Date(),
                coords: {
                  latitude: 8.9944,
                  longitude: -79.506,
                  accuracy: 10
                }
              },
              {
                node: "Bus-005",
                date: new Date(),
                coords: {
                  latitude: 8.9704,
                  longitude: -79.534,
                  accuracy: 10
                }
              },
              {
                node: "Bus-006",
                date: new Date(),
                coords: {
                  latitude: 8.9714,
                  longitude: -79.507,
                  accuracy: 10
                }
              }
            ]}
          />
        </Col>
      </Row>
    </div>
  )
}
