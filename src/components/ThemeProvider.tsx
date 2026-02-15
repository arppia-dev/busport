'use client'

import { themeConfig } from '@/config/theme'
import { ConfigProvider, theme as antdTheme } from 'antd'
import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeContextType = {
  isDark: boolean
  setIsDark: (v: boolean) => void
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  setIsDark: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('isDark')
      if (saved !== null) setIsDark(saved === 'true')
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('isDark', String(isDark))
    } catch (e) {
      // ignore
    }
  }, [isDark])

  const cfg = isDark
    ? { ...themeConfig, algorithm: antdTheme.darkAlgorithm }
    : themeConfig

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <ConfigProvider theme={cfg}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
