import { Company } from '@/types/Company'
import { Payload } from '@/types/Payload'
import { fetcher } from '@/utils/fetcher'
import { companiesData } from '@/utils/mockData'
import { useStrapiTableQuery } from '@/utils/useStrapiTableQuery'
import type { TableColumnsType } from 'antd'
import { Table } from 'antd'
import useSWR from 'swr'

const companyColumns: TableColumnsType<Company> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 10,
    sorter: (a, b) => a.id - b.id
  },
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
  }
]

const CompanyTable: React.FC = () => {
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
    />
  )
}

export default CompanyTable
