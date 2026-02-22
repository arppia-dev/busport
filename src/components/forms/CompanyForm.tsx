import { Form, Input, Checkbox, Button, Row, Col } from 'antd'
import { Company } from '@/types/Company'

interface CompanyFormProps {
  onFinish?: (values: Omit<Company, 'id'>) => void
  initialValues?: Omit<Company, 'id'>
  loading?: boolean
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  onFinish,
  initialValues,
  loading = false
}) => {
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              { required: true, message: 'El nombre es requerido' },
              { min: 3, message: 'El nombre debe tener al menos 3 caracteres' }
            ]}
          >
            <Input placeholder="Nombre de la empresa" />
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
            <Input placeholder="Código de la empresa" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            label="Dirección"
            name="address"
            rules={[
              { required: true, message: 'La dirección es requerida' },
              {
                min: 5,
                message: 'La dirección debe tener al menos 5 caracteres'
              }
            ]}
          >
            <Input placeholder="Dirección de la empresa" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          Forzar el uso del código de acceso *Los pasajeros deberán ingresar el
          ID de acceso Activar
          <Form.Item name="accessByCode" valuePropName="checked">
            <Checkbox>Acceso por código</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Guardar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default CompanyForm
