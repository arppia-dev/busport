import Card from 'antd/es/card'
import React from 'react'

interface FormLayoutProps {
  title: string | React.ReactNode
  children: React.ReactNode
}

export default function FormLayout({ title, children }: FormLayoutProps) {
  return <Card title={title}>{children}</Card>
}
