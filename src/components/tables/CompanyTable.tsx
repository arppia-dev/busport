import { Company } from '@/types/Company'
import { Payload } from '@/types/Payload'
import { fetcher } from '@/utils/fetcher'
import { useStrapiTableQuery } from '@/utils/useStrapiTableQuery'
import type { TableColumnsType } from 'antd'
import { Switch, Table } from 'antd'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const companyColumns: TableColumnsType<Company> = [
  {
    title: 'Código ',
    dataIndex: 'code',
    key: 'code',
    width: 100,
    filterSearch: true,
    filters: ['ACP', 'TEST', 'DELL'].map((code) => ({
      text: code,
      value: code
    })),
    onFilter: (value, record) => record.code === value,
    sorter: (a, b) => a.code.localeCompare(b.code)
  },
  {
    title: 'Nombre ',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    filterSearch: true,
    filters: ['Test', 'DELL', 'Autoridad del Canal de Panama'].map((code) => ({
      text: code,
      value: code
    })),
    onFilter: (value, record) => record.name === value,
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    title: 'Acceso por Código QR',
    dataIndex: 'accessByCode',
    key: 'accessByCode',
    width: 1,
    render: (pub: boolean, record: Company) => <Switch checked={pub} />,
    filterSearch: true,
    filters: ['Activo', 'Inactivo'].map((code) => ({
      text: code,
      value: code === 'Activo'
    })),
    onFilter: (value, record) => record.accessByCode === value,
    sorter: (a, b) => (a.accessByCode ? 1 : 0) - (b.accessByCode ? 1 : 0)
  }
]

const CompanyTable: React.FC = () => {
  const router = useRouter()
  const { query, pagination, updatePagination, handleTableChange } =
    useStrapiTableQuery({
      sort: ['createdAt:desc']
    })

  const { data: companyData, error: errorCompany } = useSWR<Payload<Company[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/companies${query}`,
    fetcher
  )

  const isLoading = !companyData && !errorCompany

  return (
    <Table<Company>
      rowKey={'id'}
      columns={companyColumns}
      dataSource={companyData?.data || []}
      loading={isLoading}
      pagination={{
        current: pagination.page,
        pageSize: pagination.pageSize,
        total: companyData?.meta?.pagination?.total || 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        onChange: updatePagination
      }}
      scroll={{ x: 600 }}
      onChange={handleTableChange}
      onRow={(record) => ({
        onClick: () => {
          router.push(`/company/${record.id}`)
        }
      })}
    />
  )
}

export default CompanyTable
