import { Car } from '@/types/Car'
import { Payload } from '@/types/Payload'
import { fetcherToken } from '@/utils/fetcher'
import { useStrapiTableQuery } from '@/utils/useStrapiTableQuery'
import type { TableColumnsType } from 'antd'
import { Table } from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const columns: TableColumnsType<Car> = [
  {
    title: 'Matricula',
    dataIndex: 'plate',
    key: 'plate',
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
    dataIndex: 'type',
    key: 'type',
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
    sorter: (a, b) => a.capacity - b.capacity
  }
]

const CarTable: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { query, pagination, updatePagination, handleTableChange } =
    useStrapiTableQuery({
      sort: ['createdAt:desc']
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
        onClick: () => {
          router.push(`/car/${record.documentId}`)
        }
      })}
    />
  )
}

export default CarTable
