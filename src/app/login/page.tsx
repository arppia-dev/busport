"use client"

import React from "react"
import { Form, Input, Button, Card, Typography } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import styles from "./login.module.css"

const { Title } = Typography

export default function LoginPage() {
  const [form] = Form.useForm()

  const onFinish = (values: { username: string; password: string }) => {
    console.log("Login attempt:", values)
  }

  return (
    <div className={styles.loginWrapper}>
      <Card className={styles.loginCard}>
        <div className={styles.cardInner}>
          <div className={styles.leftPane}>
            <div className={styles.loginHeader}>
              <Title level={2}>BusPort</Title>
            </div>
          </div>

          <div className={styles.rightPane}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Por favor ingresa tu usuario" }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Usuario"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Por favor ingresa tu contraseña" }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              size="large"
            />
          </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                  Iniciar sesión
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  )
}
