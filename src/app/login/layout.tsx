'use client'

import React from 'react'
import { Layout as AntLayout } from 'antd'
import styles from './login.module.css'

const { Content } = AntLayout

export default function LoginLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AntLayout style={{ minHeight: '100%' }}>
      <Content>{children}</Content>
    </AntLayout>
  )
}
