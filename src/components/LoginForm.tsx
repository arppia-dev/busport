import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Checkbox, Flex, Form, Input } from 'antd'
import Password from 'antd/es/input/Password'
import { on } from 'events'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [errorLogin, setErrorLogin] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)

    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (response?.error) {
      setErrorLogin(response.error)
    } else {
      router.push('/profile')
    }

    setLoading(false)
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      {errorLogin && (
        <Alert
          description={errorLogin}
          type="error"
          closable={{
            closeIcon: true,
            onClose: () => setErrorLogin(null),
            'aria-label': 'close'
          }}
        />
      )}
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Por favor ingresa tu correo electrónico' }
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
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
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
        >
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
