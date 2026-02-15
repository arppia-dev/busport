import { darken } from '@/utils/colors'
import type { ThemeConfig } from 'antd'

const COLOR_PRIMARY = '#07529F'
const SIDEBAR_BG = darken(COLOR_PRIMARY, 40)

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: COLOR_PRIMARY,
    fontFamily: `'Geist', sans-serif`
  },
  components: {
    Layout: {
      siderBg: SIDEBAR_BG
    },
    Menu: {
      darkItemColor: 'rgba(255, 255, 255, 0.80)',
      darkItemBg: SIDEBAR_BG,
      darkSubMenuItemBg: darken(COLOR_PRIMARY, 60)
    },
    Table: {
      rowExpandedBg: 'rgba(225,210,210,0.02)'
    }
  }
}
