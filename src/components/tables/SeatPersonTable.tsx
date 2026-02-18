import { SeatPerson } from '@/types/SeatPerson'
import { seatPersonData } from '@/utils/mockData'
import type { TableColumnsType } from 'antd'
import { Table, Tag } from 'antd'

const columns: TableColumnsType<SeatPerson> = [
  {
    title: 'Código Interno',
    dataIndex: 'code',
    key: 'code',
    width: 100,
    filterSearch: true,
    filters: Array.from(new Set(seatPersonData.map((e) => e.code))).map(
      (codigo) => ({ text: codigo, value: codigo })
    ),
    onFilter: (value, record) => record.code === value
  },
  {
    title: 'Nombre del Pasajero',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    filterSearch: true,
    filters: Array.from(new Set(seatPersonData.map((e) => e.name))).map(
      (nombre) => ({ text: nombre, value: nombre })
    ),
    onFilter: (value, record) => record.name === value
  },
  {
    title: 'Empresa',
    dataIndex: 'company',
    key: 'company',
    width: 150,
    filterSearch: true,
    filters: Array.from(new Set(seatPersonData.map((e) => e.company))).map(
      (company) => ({ text: company, value: company })
    ),
    onFilter: (value, record) => record.company === value
  },
  {
    title: 'Título de la Ruta',
    dataIndex: 'routeTitle',
    key: 'routeTitle',
    width: 150,
    filterSearch: true,
    filters: Array.from(new Set(seatPersonData.map((e) => e.routeTitle))).map(
      (ruta) => ({ text: ruta, value: ruta })
    ),
    onFilter: (value, record) => record.routeTitle === value
  },
  {
    title: 'Estado de la Reserva',
    dataIndex: 'reservationStatus',
    key: 'reservationStatus',
    width: 150,
    filterSearch: true,
    filters: Array.from(
      new Set(seatPersonData.map((e) => e.reservationStatus))
    ).map((estado) => ({ text: estado, value: estado })),
    onFilter: (value, record) => record.reservationStatus === value,
    render: (estado: string) => {
      let color = 'default'
      if (estado === 'Confirmada') color = 'green'
      else if (estado === 'Pendiente') color = 'orange'
      else if (estado === 'Cancelada') color = 'red'
      return <Tag color={color}>{estado}</Tag>
    }
  },
  {
    title: 'Fecha de la Reserva',
    dataIndex: 'reservationDate',
    key: 'reservationDate',
    width: 140
  },
  {
    title: 'Reserva en',
    dataIndex: 'reservedAt',
    key: 'reservedAt',
    width: 160
  }
]

const SeatPersonTable: React.FC = () => {
  return (
    <Table<SeatPerson>
      rowKey={'id'}
      columns={columns}
      dataSource={seatPersonData}
      pagination={{
        pageSize: 5,
        total: seatPersonData.length,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '50']
      }}
      scroll={{ x: 900 }}
    />
  )
}

export default SeatPersonTable
