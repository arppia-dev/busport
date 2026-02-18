import { SeatPerson } from '@/types/SeatPerson'
import { seatPersonData } from '@/utils/mockData'
import type { TableColumnsType } from 'antd'
import { Table, Tag } from 'antd'

const columns: TableColumnsType<SeatPerson> = [
  {
    title: 'Código Interno',
    dataIndex: 'codigoInterno',
    key: 'codigoInterno',
    width: 100,
    filterSearch: true,
    filters: Array.from(
      new Set(seatPersonData.map((e) => e.codigoInterno))
    ).map((codigo) => ({ text: codigo, value: codigo })),
    onFilter: (value, record) => record.codigoInterno === value
  },
  {
    title: 'Nombre del Pasajero',
    dataIndex: 'nombrePasajero',
    key: 'nombrePasajero',
    width: 180,
    filterSearch: true,
    filters: Array.from(
      new Set(seatPersonData.map((e) => e.nombrePasajero))
    ).map((nombre) => ({ text: nombre, value: nombre })),
    onFilter: (value, record) => record.nombrePasajero === value
  },
  {
    title: 'Empresa',
    dataIndex: 'empresa',
    key: 'empresa',
    width: 150,
    filterSearch: true,
    filters: Array.from(new Set(seatPersonData.map((e) => e.empresa))).map(
      (empresa) => ({ text: empresa, value: empresa })
    ),
    onFilter: (value, record) => record.empresa === value
  },
  {
    title: 'Título de la Ruta',
    dataIndex: 'tituloRuta',
    key: 'tituloRuta',
    width: 150,
    filterSearch: true,
    filters: Array.from(new Set(seatPersonData.map((e) => e.tituloRuta))).map(
      (ruta) => ({ text: ruta, value: ruta })
    ),
    onFilter: (value, record) => record.tituloRuta === value
  },
  {
    title: 'Estado de la Reserva',
    dataIndex: 'estadoReserva',
    key: 'estadoReserva',
    width: 150,
    filterSearch: true,
    filters: Array.from(
      new Set(seatPersonData.map((e) => e.estadoReserva))
    ).map((estado) => ({ text: estado, value: estado })),
    onFilter: (value, record) => record.estadoReserva === value,
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
    dataIndex: 'fechaReserva',
    key: 'fechaReserva',
    width: 140
  },
  { title: 'Reserva en', dataIndex: 'reservaEn', key: 'reservaEn', width: 160 }
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
