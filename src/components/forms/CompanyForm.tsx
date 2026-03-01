'use client'

import { Company } from '@/types/Company'
import { fetcherToken } from '@/utils/fetcher'
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Skeleton,
  Tag,
  theme
} from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import OpenLayersMap from '../OpenLayersMap'

interface CompanyFormProps {
  id?: string
}

const CompanyForm: React.FC<CompanyFormProps> = ({ id }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [form] = Form.useForm()
  const [coords, setCoords] = useState<[number, number] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const {
    token: { colorPrimary, padding }
  } = theme.useToken()

  const { data: companyData } = useSWR(
    id && session?.user.token
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`,
          session.user.token as string
        ]
      : null,
    ([url, token]: [string, string]) => fetcherToken(url, token)
  )

  useEffect(() => {
    const company: Company = companyData?.data

    if (company?.address && company.address.coordinates) {
      setCoords([
        company.address.coordinates.longitude,
        company.address.coordinates.latitude
      ])
      form.setFieldValue(
        'address',
        JSON.stringify({ coordinates: company.address.coordinates })
      )
    }
  }, [companyData])

  if (id && !companyData) {
    return <Skeleton />
  }

  if (id && companyData?.error) {
    return (
      <Alert
        description="No se pudo cargar los datos. Inténtalo más tarde."
        type="error"
      />
    )
  }

  const onFinish = async (values: Company) => {
    setLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/companies/${id ? id : ''}`,
        {
          method: id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user.token as string}`
          },
          body: JSON.stringify({
            data: values
          })
        }
      )

      if (!response.ok) {
        throw new Error(
          `No se pudo ${id ? 'actualizar' : 'guardar'} el registro. Inténtalo más tarde.`
        )
      }

      router.push('/company')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={id ? companyData?.data : undefined}
    >
      <Row gutter={padding}>
        <Col xs={24}>
          {error && (
            <Form.Item>
              <Alert
                description={error}
                type="error"
                closable={{
                  closeIcon: true,
                  onClose: () => setError(null),
                  'aria-label': 'close'
                }}
              />
            </Form.Item>
          )}
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Código"
            name="code"
            rules={[
              { required: true, message: 'El código es requerido' },
              { min: 2, message: 'El código debe tener al menos 2 caracteres' },
              {
                max: 5,
                message: 'El código no puede tener más de 5 caracteres'
              }
            ]}
          >
            <Input placeholder="Código" />
          </Form.Item>
        </Col>
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
        <Col xs={24} md={12}>
          <Form.Item
            label="Dirección"
            name="address"
            rules={[{ required: true, message: 'La dirección es requerida' }]}
          >
            <Flex gap="small" wrap>
              <div
                style={{ width: '100%', height: '300px', overflow: 'hidden' }}
              >
                <OpenLayersMap
                  center={coords ?? [-79.5566249, 8.9688727]}
                  zoom={10}
                  points={
                    coords
                      ? [
                          {
                            latitude: coords[1],
                            longitude: coords[0]
                          }
                        ]
                      : undefined
                  }
                  onCallback={(selectedCoords) => {
                    setCoords(selectedCoords)
                    form.setFieldValue(
                      'address',
                      JSON.stringify({
                        coordinates: {
                          latitude: selectedCoords[1],
                          longitude: selectedCoords[0]
                        }
                      })
                    )
                  }}
                />
              </div>
              {coords && (
                <Tag color={colorPrimary}>
                  {`Lat: ${coords[1].toFixed(6)}, Lon: ${coords[0].toFixed(6)}`}
                </Tag>
              )}
            </Flex>
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
