'use client'

import FormLayout from '@/components/FormLayout'
import CompanyForm from '@/components/forms/CompanyForm'
import { Company } from '@/types/Company'
import { Flex, Tag, theme } from 'antd'
import { useParams } from 'next/navigation'

export default function EditFormPage() {
  const params = useParams<{ id: string }>()

  const {
    token: { colorPrimary, padding }
  } = theme.useToken()

  const data: Company = {
    id: Number.parseInt(params.id!),
    name: 'DELL',
    code: 'DELL',
    accessByCode: true,
    address: 'Calle 123, Ciudad'
  }

  return (
    <FormLayout
      title={
        params.id ? (
          <Flex align="center" gap={padding}>
            Editar <Tag color={colorPrimary}>ID: {data.id}</Tag>
          </Flex>
        ) : (
          <span>Añadir</span>
        )
      }
    >
      <CompanyForm id={params.id} initialValues={data} />
    </FormLayout>
  )
}
