import type { DatePickerProps } from 'antd'
import dayjs from 'dayjs'

export const customWeekStartEndFormat: DatePickerProps['format'] = (value) => {
  const weekFormat = 'DD/MMM'
  const startDay = dayjs(value).startOf('week').add(1, 'day')
  const endDay = dayjs(value).endOf('week').add(1, 'day')
  return `${startDay.format(weekFormat)} - ${endDay.format(weekFormat)}`
}

export const getMondayOfWeek = (date: Date): Date => {
  const dayWeek = date.getDay() === 0 ? 6 : date.getDay() - 1
  const monday = new Date(date)
  monday.setDate(date.getDate() - dayWeek)
  return monday
}

export const getDatesOfWeek = (date: Date) => {
  const startWeek = dayjs(date).startOf('week').add(1, 'day')
  const daysOfWeek: Date[] = []

  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(startWeek.add(i, 'day').toDate())
  }

  return daysOfWeek
}
