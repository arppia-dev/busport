import BusLayout from '@/components/BusLayout'
import { SeatRoute } from '@/types/SeatRoute'
import { seatRoutesData } from '@/utils/mockData'
import {
  CheckSquareOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  EditOutlined
} from '@ant-design/icons'
import {
  Drawer,
  Flex,
  Space,
  Table,
  Tag,
  theme,
  Tooltip,
  Typography
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

const { Text } = Typography

const SeatRouteTable: React.FC<{ weekDates: Date[] }> = ({ weekDates }) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const {
    token: { paddingXS }
  } = theme.useToken()

  const showDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      <Table<SeatRoute>
        rowKey={'id'}
        columns={[
          {
            title: 'Título de la Ruta',
            key: 'title',
            width: 500,
            filters: Array.from(
              new Set(seatRoutesData.map((r) => r.title))
            ).map((title) => ({ text: title, value: title })),
            onFilter: (value, record) => record.title === value,
            render: (_: any, record: SeatRoute) => (
              <span>
                {record.code} - {record.title} - {record.time}
              </span>
            )
          },
          {
            title: 'Estado',
            key: 'estado',
            width: 50,
            filters: [
              { text: 'Publicada', value: 'Publicada' },
              { text: 'Borrador', value: 'Borrador' }
            ],
            onFilter: (value, record) => record.status === value,
            render: (_: any, record: SeatRoute) => (
              <Tag color={record.status === 'Publicada' ? 'green' : 'orange'}>
                {record.status}
              </Tag>
            )
          },
          {
            title: 'Empresa',
            dataIndex: 'company',
            key: 'company',
            width: 200,
            filters: Array.from(
              new Set(seatRoutesData.map((r) => r.company))
            ).map((company) => ({ text: company, value: company })),
            onFilter: (value, record) => record.company === value
          },
          {
            title: 'Reservados',
            dataIndex: 'reserved',
            key: 'reserved',
            width: 150,
            render: (_: any, record: SeatRoute) => {
              const totalReserved = record.days.reduce(
                (sum, d) => sum + (d.qty > 0 ? d.qty : 0),
                0
              )
              const totalCapacity = record.days.reduce(
                (sum, d) => sum + (d.qty > 0 ? record.capacity : 0),
                0
              )

              return (
                <Flex gap={paddingXS}>
                  <Text>
                    {totalReserved}/{totalCapacity}
                  </Text>
                  <EditOutlined
                    style={{
                      fontSize: 15,
                      color: '#1677ff',
                      cursor: 'pointer'
                    }}
                  />
                </Flex>
              )
            }
          },
          {
            title: 'Días de la Semana',
            children: weekDates.map((day, index) => ({
              title: (
                <Flex orientation="vertical">
                  <Text>{dayjs(day).locale('es').format('ddd DD/MM')}</Text>
                  <DownloadOutlined
                    style={{ fontSize: 14, cursor: 'pointer' }}
                  />
                </Flex>
              ),
              key: day.toISOString(),
              width: 110,
              render: (_: any, record: SeatRoute) => {
                const dayData = record.days[index]

                if (
                  dayData.qty === 0 ||
                  dayjs(day).format('YYYY-MM-DD') !==
                    dayjs(dayData.day).format('YYYY-MM-DD')
                ) {
                  return (
                    <Text italic type="secondary">
                      N/A
                    </Text>
                  )
                }

                const porcentaje = Math.round(
                  (dayData.qty! / record.capacity) * 100
                )

                let color = 'green'
                if (porcentaje > 50) color = 'red'
                else if (porcentaje > 40) color = 'orange'

                return (
                  <Tooltip
                    title={
                      <Flex orientation="vertical">
                        <span>{`${porcentaje}% reservado`}</span>
                        <span>{`capacidad: ${record.capacity}`}</span>
                        <span>{`reservados: ${dayData.qty}`}</span>
                        <span>{`disponibles: ${record.capacity - dayData.qty}`}</span>
                      </Flex>
                    }
                  >
                    <Tag
                      color={color}
                      variant="outlined"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        showDrawer()
                      }}
                    >
                      <Flex orientation="vertical" align="center">
                        <Space>
                          <Text style={{ color: color }}>{porcentaje}%</Text>
                          <Text type="secondary">
                            ({dayData.qty}/{record.capacity})
                          </Text>
                        </Space>
                        <Text
                          type="secondary"
                          style={{ color: porcentaje === 100 ? 'green' : '' }}
                        >
                          <Space>
                            {record.capacity - dayData.qty}
                            {porcentaje === 100 ? (
                              <CheckSquareOutlined />
                            ) : (
                              <ClockCircleOutlined />
                            )}
                          </Space>
                        </Text>
                      </Flex>
                    </Tag>
                  </Tooltip>
                )
              }
            }))
          }
        ]}
        dataSource={seatRoutesData}
        pagination={{
          pageSize: 5,
          total: seatRoutesData.length,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['5', '10', '20', '50']
        }}
        scroll={{ x: 1200 }}
      />
      <Drawer
        title="Capacidad Detallada"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={showDrawer}
        open={openDrawer}
      >
        <BusLayout capacity={40} reserved={20} />
      </Drawer>
    </>
  )
}

export default SeatRouteTable
