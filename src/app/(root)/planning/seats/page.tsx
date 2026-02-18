'use client'

import SeatPersonTable from '@/components/tables/SeatPersonTable'
import SeatRouteTable from '@/components/tables/SeatRouteTable'
import {
  customWeekStartEndFormat,
  getDatesOfWeek,
  getMondayOfWeek
} from '@/utils/date'
import type { DatePickerProps } from 'antd'
import {
  DatePicker,
  Divider,
  Flex,
  Layout,
  Space,
  Tabs,
  theme,
  Typography
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

const { Header, Content } = Layout
const { Title, Text } = Typography

export default function SeatsPage() {
  const {
    token: { colorBgContainer, padding }
  } = theme.useToken()

  const [selectedWeek, setSelectedWeek] = useState<Date>(() => {
    return getMondayOfWeek(new Date())
  })

  const [weekDates, setWeekDates] = useState<Date[]>(() => {
    return getDatesOfWeek(selectedWeek)
  })

  const handleWeekChange: DatePickerProps['onChange'] = (date) => {
    if (!date || Array.isArray(date)) return

    setSelectedWeek(getMondayOfWeek(date.toDate()))
    setWeekDates(getDatesOfWeek(date.toDate()))
  }

  return (
    <Layout style={{ background: colorBgContainer, height: '100%' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingInline: padding,
          background: colorBgContainer
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Reservas de Asientos
        </Title>
      </Header>
      <Divider style={{ margin: 0 }} />
      <Content style={{ padding: padding }}>
        <Tabs
          items={[
            {
              key: '1',
              label: <Text>Por Rutas</Text>,
              children: (
                <Flex orientation="vertical" gap={padding}>
                  <Space>
                    <DatePicker
                      defaultValue={dayjs(selectedWeek)}
                      format={customWeekStartEndFormat}
                      onChange={handleWeekChange}
                      showWeek={false}
                      picker="week"
                      style={{ width: 250 }}
                    />
                  </Space>
                  <SeatRouteTable weekDates={weekDates} />
                </Flex>
              )
            },
            {
              key: '2',
              label: <Text>Por Personas</Text>,
              children: (
                <Flex orientation="vertical" gap={padding}>
                  <Space>
                    <DatePicker
                      defaultValue={dayjs(selectedWeek)}
                      format={customWeekStartEndFormat}
                      onChange={handleWeekChange}
                      picker="week"
                      style={{ width: 250 }}
                    />
                  </Space>
                  <SeatPersonTable />
                </Flex>
              )
            }
          ]}
        />
      </Content>
    </Layout>
  )
}
