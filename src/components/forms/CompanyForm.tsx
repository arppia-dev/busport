'use client'

import { Company } from '@/types/Company'
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  theme
} from 'antd'
import { useState } from 'react'
import OpenLayersMap from '../OpenLayersMap'

interface CompanyFormProps {
  id?: string
  initialValues?: Omit<Company, 'id'>
}

const CompanyForm: React.FC<CompanyFormProps> = ({ id, initialValues }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [coords, setCoords] = useState<[number, number] | null>(null)

  const {
    token: { padding }
  } = theme.useToken()

  const onFinish = async (values: Company) => {
    setLoading(true)

    if (id) {
      console.log('Updating company with ID:', id, 'and values:', values)
    } else {
      console.log('Creating new company with values:', values)
    }

    setLoading(false)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Row gutter={padding}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              { required: true, message: 'El nombre es requerido' },
              { min: 3, message: 'El nombre debe tener al menos 3 caracteres' }
            ]}
          >
            <Input placeholder="Nombre" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Código"
            name="code"
            rules={[
              { required: true, message: 'El código es requerido' },
              { min: 2, message: 'El código debe tener al menos 2 caracteres' }
            ]}
          >
            <Input placeholder="Código" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Dirección"
            name="address"
            rules={[{ required: true, message: 'La dirección es requerida' }]}
          >
            <div style={{ width: '100%', height: '300px' }}>
              <OpenLayersMap center={[-79.5566249, 8.9688727]} zoom={10} />
            </div>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="accessByCode"
            label="Acceso por código QR"
            valuePropName="checked"
            help={
              <Flex orientation="vertical">
                <span>Control de acceso a la app para pasajeros</span>
                <span>
                  Se les solicitará a los usuarios que ingresen su ID de
                  pasajero
                </span>
              </Flex>
            }
          >
            <Checkbox>Activar</Checkbox>
          </Form.Item>
        </Col>
        <Divider />
        <Col xs={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {id ? 'Actualizar' : 'Guardar'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default CompanyForm
