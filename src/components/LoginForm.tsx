import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Form, Input } from 'antd'
import Link from 'next/link'
import React from 'react'

const LoginForm: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: { username: string; password: string }) => {
    console.log('Login attempt:', values)
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Usuario" size="large" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
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

      <Form.Item name="remember" valuePropName="checked" label={null}>
        <Flex justify="space-between" align="center">
          <Checkbox>Recuérdame</Checkbox>
          <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </Flex>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
