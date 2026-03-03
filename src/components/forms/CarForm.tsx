'use client'

import { Car } from '@/types/Car'
import { Company } from '@/types/Company'
import { Payload } from '@/types/Payload'
import { TypeOfCar } from '@/types/TypeOfCar'
import { fetcherToken } from '@/utils/fetcher'
import { useStrapiTableQuery } from '@/utils/useStrapiTableQuery'
import {
  Alert,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  theme,
  Transfer,
  TransferProps
} from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useSWR from 'swr'

interface CarFormProps {
  id?: string
}

const CarForm: React.FC<CarFormProps> = ({ id }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>()
  const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>(
    []
  )

  const { query } = useStrapiTableQuery({
    sort: ['createdAt:desc'],
    populate: {
      type: {
        fields: ['name']
      },
      companies: {
        fields: ['name', 'code']
      }
    }
  })

  const {
    token: { padding }
  } = theme.useToken()

  const { data: carData } = useSWR<Payload<Car>>(
    id && session?.user.token
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}${query}`,
          session.user.token as string
        ]
      : null,
    ([url, token]: [string, string]) => fetcherToken(url, token)
  )

  const { data: typeOfCarData } = useSWR<Payload<TypeOfCar[]>>(
    session?.user.token
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/types-of-car`,
          session.user.token as string
        ]
      : null,
    ([url, token]: [string, string]) => fetcherToken(url, token)
  )

  const { data: companyData } = useSWR<Payload<Company[]>>(
    session?.user.token
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/companies`,
          session?.user.token as string
        ]
      : null,
    ([url, token]: [string, string]) => fetcherToken(url, token)
  )

  if (id && !carData && !typeOfCarData && !companyData) {
    return <Skeleton />
  }

  if (id && (carData?.error || typeOfCarData?.error || companyData?.error)) {
    return (
      <Alert
        description="No se pudo cargar los datos. Inténtalo más tarde."
        type="error"
      />
    )
  }

  const isLoadingCompany = !companyData

  const onFinish = async (values: Car) => {
    setLoading(true)

    console.log('Valores del formulario:', values)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cars/${id ? id : ''}`,
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

      router.push('/transport/cars')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onChange: TransferProps['onChange'] = (
    nextTargetKeys,
    direction,
    moveKeys
  ) => {
    console.log('targetKeys:', nextTargetKeys)
    console.log('direction:', direction)
    console.log('moveKeys:', moveKeys)
    setTargetKeys(nextTargetKeys)
  }

  const onSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys)
    console.log('targetSelectedKeys:', targetSelectedKeys)
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const onScroll: TransferProps['onScroll'] = (direction, e) => {
    console.log('direction:', direction)
    console.log('target:', e.target)
  }

  const normalizeCarData = (data: Car | undefined) => {
    if (!data) return undefined

    return {
      ...data,
      type: data.type?.documentId,
      companies: data.companies?.map((c) => c.documentId)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={id ? normalizeCarData(carData?.data) : undefined}
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
            label="Tipo"
            name="type"
            rules={[{ required: true, message: 'El tipo es requerido' }]}
          >
            <Select
              placeholder="Tipo"
              options={typeOfCarData?.data.map((type: TypeOfCar) => ({
                label: type.name,
                value: type.documentId
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Matrícula"
            name="plate"
            rules={[
              { required: true, message: 'La matrícula es requerida' },
              {
                pattern: /^[A-Z]{2}-\d{3}$/,
                message:
                  'La matrícula solo puede contener letras mayúsculas, números y guiones'
              }
            ]}
          >
            <Input placeholder="Matrícula" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="capacity"
            label="Capacidad"
            rules={[{ required: true, message: 'La capacidad es requerida' }]}
          >
            <Input placeholder="Capacidad" type="number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}></Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="companies"
            label="Empresa"
            help="Restringir el acceso a los datos (viajes, planificación, etc.) pertenecientes a las empresas que se indican a continuación."
            valuePropName="targetKeys"
            getValueFromEvent={(nextTargetKeys) => nextTargetKeys}
          >
            {isLoadingCompany ? (
              <Skeleton.Input style={{ width: 200 }} active />
            ) : (
              <Transfer
                key="documentId"
                dataSource={
                  companyData?.data.map((company: Company) => ({
                    key: company.documentId,
                    ...company
                  })) || []
                }
                titles={['Sin Acceso', 'Con Acceso']}
                targetKeys={form.getFieldValue('companies') || []}
                selectedKeys={selectedKeys}
                onChange={(nextTargetKeys) => {
                  setTargetKeys(nextTargetKeys)
                  form.setFieldsValue({ companies: nextTargetKeys })
                }}
                onSelectChange={onSelectChange}
                onScroll={onScroll}
                render={(item) => (
                  <span
                    key={item.documentId}
                  >{`[${item.code}] ${item.name}`}</span>
                )}
                styles={{
                  section: {
                    width: '100%',
                    height: 300
                  }
                }}
              />
            )}
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

export default CarForm
