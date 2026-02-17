import { Route } from '@/types/Route'
import { routesData } from '@/utils/mockData'
import {
  ArrowRightOutlined,
  CarOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Button, Space, Switch, Table, Tag, Typography } from 'antd'

const { Text } = Typography

const diasSemana = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']

const routesColumns: TableColumnsType<Route> = [
  {
    title: 'Código de Ruta',
    dataIndex: 'code',
    key: 'code',
    render: (code: string, record: Route) => (
      <>
        <Text>
          {code}{' '}
          <Tag color={record.status === 'In' ? 'green' : 'gold'}>
            {record.status}
          </Tag>
        </Text>
      </>
    ),
    width: 100,
    filterSearch: true,
    filters: routesData.map((route) => ({
      text: route.code,
      value: route.code
    })),
    onFilter: (value, record) => record.code === value,
    sorter: (a, b) => a.code.localeCompare(b.code)
  },
  {
    title: 'Título de la Ruta',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    filterSearch: true,
    filters: routesData.map((route) => ({
      text: route.name,
      value: route.name
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
    filters: routesData.map((route) => ({
      text: route.company,
      value: route.company
    })),
    onFilter: (value, record) => record.company === value,
    sorter: (a, b) => a.company.localeCompare(b.company)
  },
  {
    title: 'Días de la Semana',
    dataIndex: 'days',
    key: 'days',
    render: (dias: string[]) => (
      <Space>
        {diasSemana.map((dia) => (
          <Tag color={dias.includes(dia) ? 'green' : 'default'} key={dia}>
            {dia}
          </Tag>
        ))}
      </Space>
    ),
    width: 300
  },
  {
    title: 'Primera Salida',
    dataIndex: 'departure',
    key: 'departure',
    width: 50
  },
  {
    title: 'Conductor',
    dataIndex: 'driver',
    key: 'driver',
    width: 150,
    filterSearch: true,
    filters: routesData.map((route) => ({
      text: route.driver,
      value: route.driver
    })),
    onFilter: (value, record) => record.driver === value,
    sorter: (a, b) => a.driver.localeCompare(b.driver)
  },
  {
    title: 'Automóvil',
    dataIndex: 'vehicle',
    key: 'vehicle',
    render: (auto: string) => (auto === '*' ? <span>*</span> : auto),
    width: 50,
    filterSearch: true,
    filters: routesData.map((route) => ({
      text: route.vehicle,
      value: route.vehicle
    })),
    onFilter: (value, record) => record.vehicle === value,
    sorter: (a, b) => a.vehicle.localeCompare(b.vehicle)
  },
  {
    title: 'Publicado',
    dataIndex: 'published',
    key: 'published',
    render: (pub: boolean, record: Route) => <Switch checked={pub} />,
    width: 50,
    filterSearch: true,
    filters: [
      { text: 'Publicado', value: 'Publicado' },
      { text: 'No Publicado', value: 'No Publicado' }
    ],
    onFilter: (value, record) =>
      (record.published ? 'Publicado' : 'No Publicado') === value,
    sorter: (a, b) =>
      (a.published ? 'Publicado' : 'No Publicado').localeCompare(
        b.published ? 'Publicado' : 'No Publicado'
      )
  },
  {
    title: 'Vista',
    key: 'view',
    render: (record: Route) => (
      <Space>
        <Button
          icon={<CarOutlined />}
          size="small"
          type={record.published.driver ? 'primary' : 'default'}
          onClick={() => alert(`Vista previa de la ruta ${record.code}`)}
        />
        <Button
          icon={<TeamOutlined />}
          size="small"
          type={record.published.client ? 'primary' : 'default'}
        />
      </Space>
    ),
    width: 50
  },
  {
    title: 'Acciones',
    key: 'actions',
    render: () => <Button icon={<SettingOutlined />} size="small" />,
    width: 50
  },
  {
    title: '',
    key: 'other',
    render: () => <Button icon={<ArrowRightOutlined />} size="small" />,
    width: 50
  }
]

const RouteTable: React.FC = () => {
  return (
    <Table<Route>
      rowKey={'id'}
      columns={routesColumns}
      dataSource={routesData}
      pagination={{
        pageSize: 5,
        total: routesData.length,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '50']
      }}
      scroll={{ x: 600 }}
    />
  )
}

export default RouteTable
