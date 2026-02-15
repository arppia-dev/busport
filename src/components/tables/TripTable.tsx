import { Company } from '@/types/Company'
import { Trip } from '@/types/Trip'
import { companiesData, tripData } from '@/utils/mockData'
import type { TableColumnsType } from 'antd'
import { Space, Table, Tag, Typography } from 'antd'

const { Text } = Typography

const columns: TableColumnsType<Trip> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 10,
    sorter: (a, b) => a.id - b.id
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    width: 100
  },
  {
    title: 'Ruta',
    dataIndex: 'route',
    key: 'route',
    width: 300,
    filterSearch: true,
    filters: Array.from(new Set(tripData.map((trip) => trip.route))).map(
      (route) => ({
        text: route,
        value: route
      })
    ),
    onFilter: (value, record) => record.route === value,
    sorter: (a, b) => a.route.localeCompare(b.route)
  },
  {
    title: 'Empresa',
    dataIndex: 'company',
    key: 'company',
    filterSearch: true,
    filters: Array.from(new Set(tripData.map((trip) => trip.company))).map(
      (company) => ({
        text: company,
        value: company
      })
    ),
    onFilter: (value, record) => record.company === value,
    sorter: (a, b) => a.company.localeCompare(b.company)
  },
  {
    title: 'Conductor',
    dataIndex: 'driver',
    key: 'driver',
    filterSearch: true,
    filters: Array.from(new Set(tripData.map((trip) => trip.driver))).map(
      (driver) => ({
        text: driver,
        value: driver
      })
    ),
    onFilter: (value, record) => record.driver === value,
    sorter: (a, b) => a.driver.localeCompare(b.driver)
  },
  {
    title: 'Automóvil',
    dataIndex: 'vehicle',
    key: 'vehicle',
    filterSearch: true,
    filters: Array.from(new Set(tripData.map((trip) => trip.vehicle))).map(
      (vehicle) => ({
        text: vehicle,
        value: vehicle
      })
    ),
    onFilter: (value, record) => record.vehicle === value,
    sorter: (a, b) => a.vehicle.localeCompare(b.vehicle)
  },
  {
    title: 'Iniciada En',
    dataIndex: 'startedAt',
    key: 'startedAt',
    sorter: (a, b) => a.startedAt.localeCompare(b.startedAt)
  },
  {
    title: 'Duración',
    dataIndex: 'duration',
    key: 'duration',
    sorter: (a, b) => a.duration.localeCompare(b.duration)
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      let color = 'blue'
      if (status === 'Finalizado') color = 'green'
      if (status === 'Planeado') color = 'orange'
      return <Tag color={color}>{status}</Tag>
    },
    filterSearch: true,
    filters: Array.from(new Set(tripData.map((trip) => trip.status))).map(
      (status) => ({
        text: status,
        value: status
      })
    ),
    onFilter: (value, record) => record.status === value,
    sorter: (a, b) => a.status.localeCompare(b.status)
  }
]

const TripTable: React.FC = () => {
  return (
    <Table<Trip>
      columns={columns}
      dataSource={tripData}
      pagination={{
        pageSize: 5,
        total: tripData.length,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '50']
      }}
      scroll={{ x: 1000 }}
      expandable={{
        expandedRowRender: (record) => (
          <Space orientation="vertical">
            <Text style={{ marginBottom: 8, display: 'block' }}>
              Progreso de Paradas
            </Text>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}
            >
              {record.steps?.map((step, index) => (
                <Tag key={index} color={step.endDate ? 'green' : 'default'}>
                  {step.startDate} - {step.endDate || 'Pendiente'}
                </Tag>
              ))}
            </div>
          </Space>
        ),
        rowExpandable: (record) => record.route !== 'Not Expandable'
      }}
    />
  )
}

export default TripTable
