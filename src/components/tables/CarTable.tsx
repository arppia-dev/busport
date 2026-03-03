import { Car } from '@/types/Car'
import { Payload } from '@/types/Payload'
import { fetcherToken } from '@/utils/fetcher'
import { useStrapiTableQuery } from '@/utils/useStrapiTableQuery'
import type { TableColumnsType } from 'antd'
import { Space, Table, Tag } from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const columns: TableColumnsType<Car> = [
  {
    title: 'Matricula',
    dataIndex: 'plate',
    key: 'plate',
    width: 100,
    filterSearch: true,
    filters: ['filtro1', 'filtro2', 'filtro3'].map((code) => ({
      text: code,
      value: code
    })),
    onFilter: (value, record) => record.plate === value,
    sorter: (a, b) => a.plate.localeCompare(b.plate)
  },
  {
    title: 'Tipo de Vehículo',
    dataIndex: ['type', 'name'],
    key: 'type',
    width: 100,
    filterSearch: true,
    filters: ['Car', 'Van', 'Bus'].map((code) => ({
      text: code,
      value: code
    })),
    onFilter: (value, record) => record.type.name === value,
    sorter: (a, b) => a.type.name.localeCompare(b.type.name)
  },

  {
    title: 'Capacidad',
    dataIndex: 'capacity',
    key: 'capacity',
    width: 20,
    sorter: (a, b) => a.capacity - b.capacity
  },
  {
    title: 'Empresas autorizadas',
    dataIndex: ['companies', 'code'],
    key: 'company',
    width: 20,
    render: (_, record) => (
      <Space wrap>
        {record.companies.splice(0, 5).map((c) => (
          <Tag key={c.code}>{c.code}</Tag>
        ))}
        {record.companies.length > 1 ? ' ...' : ''}
      </Space>
    )
  }
]

const CarTable: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { query, pagination, updatePagination, handleTableChange } =
    useStrapiTableQuery({
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

  const { data: carData } = useSWR<Payload<Car[]>>(
    [`${process.env.NEXT_PUBLIC_API_URL}/cars${query}`, session?.user.token!],
    ([url, token]) => fetcherToken(url, token as string)
  )

  const isLoading = !carData

  return (
    <Table<Car>
      rowKey={'id'}
      columns={columns}
      dataSource={carData?.data || []}
      loading={isLoading}
      pagination={{
        current: pagination.page,
        pageSize: pagination.pageSize,
        total: carData?.meta?.pagination?.total || 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        onChange: updatePagination
      }}
      scroll={{ x: 600 }}
      onChange={handleTableChange}
      onRow={(record) => ({
        onDoubleClick: () => {
          router.push(`/transport/cars/${record.documentId}`)
        }
      })}
    />
  )
}

export default CarTable
