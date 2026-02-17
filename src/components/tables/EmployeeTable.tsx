import { Employee } from '@/types/Employee'
import { employeesData } from '@/utils/mockData'
import type { TableColumnsType } from 'antd'
import { Table, Tag } from 'antd'

const employeeColumns: TableColumnsType<Employee> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 10,
    sorter: (a, b) => a.id - b.id
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    filterSearch: true,
    filters: Array.from(
      new Set(employeesData.map((employee) => employee.name))
    ).map((name) => ({
      text: name,
      value: name
    })),
    onFilter: (value, record) => record.name === value,
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    title: 'Empresa',
    dataIndex: 'company',
    key: 'company',
    width: 150,
    filterSearch: true,
    filters: Array.from(
      new Set(employeesData.map((employee) => employee.company))
    ).map((company) => ({
      text: company,
      value: company
    })),
    onFilter: (value, record) => record.company === value,
    sorter: (a, b) => a.company.localeCompare(b.company)
  },
  {
    title: 'Cargo',
    dataIndex: 'position',
    key: 'position',
    width: 120,
    filterSearch: true,
    filters: Array.from(
      new Set(employeesData.map((employee) => employee.position))
    ).map((position) => ({
      text: position,
      value: position
    })),
    onFilter: (value, record) => record.position === value,
    sorter: (a, b) => a.position.localeCompare(b.position)
  },
  {
    title: 'Correo electrónico',
    dataIndex: 'email',
    key: 'email',
    width: 180,
    filterSearch: true,
    filters: Array.from(
      new Set(employeesData.map((employee) => employee.email))
    ).map((email) => ({
      text: email,
      value: email
    })),
    onFilter: (value, record) => record.email === value,
    sorter: (a, b) => a.email.localeCompare(b.email)
  },
  {
    title: 'Rutas',
    dataIndex: 'routes',
    key: 'routes',
    width: 120,
    filterSearch: true,
    filters: Array.from(
      new Set(employeesData.map((employee) => employee.routes))
    ).map((routes) => ({
      text: routes,
      value: routes
    })),
    onFilter: (value, record) => record.routes === value,
    sorter: (a, b) => a.routes.localeCompare(b.routes)
  },
  {
    title: 'Acceso',
    dataIndex: 'access',
    key: 'access',
    width: 100,
    render: (access: string) => {
      let color = 'blue'
      if (access === 'Activo') color = 'green'
      if (access === 'Bloqueado') color = 'red'
      return <Tag color={color}>{access}</Tag>
    },
    filterSearch: true,
    filters: Array.from(
      new Set(employeesData.map((employee) => employee.access))
    ).map((access) => ({
      text: access,
      value: access
    })),
    onFilter: (value, record) => record.access === value,
    sorter: (a, b) => a.access.localeCompare(b.access)
  }
]

const EmployeeTable: React.FC = () => {
  return (
    <Table<Employee>
      rowKey={'id'}
      columns={employeeColumns}
      dataSource={employeesData}
      pagination={{
        pageSize: 5,
        total: employeesData.length,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '50']
      }}
      scroll={{ x: 900 }}
    />
  )
}

export default EmployeeTable
