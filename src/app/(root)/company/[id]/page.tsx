'use client'

import FormLayout from '@/components/FormLayout'
import CompanyForm from '@/components/forms/CompanyForm'
import { Flex, Tag, theme } from 'antd'
import { useParams } from 'next/navigation'

export default function EditFormPage() {
  const params = useParams<{ id: string }>()

  const {
    token: { colorPrimary, padding }
  } = theme.useToken()

  return (
    <FormLayout
      title={
        params.id ? (
          <Flex align="center" gap={padding}>
            Editar <Tag color={colorPrimary}>ID: {params.id}</Tag>
          </Flex>
        ) : (
          <span>Añadir</span>
        )
      }
    >
      <CompanyForm id={params.id} />
    </FormLayout>
  )
}
