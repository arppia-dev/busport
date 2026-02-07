import type { ThemeConfig } from "antd"

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1890ff",
    borderRadius: 6,
    fontFamily: `'Geist', sans-serif`
  },
  components: {
    Button: {
      controlHeight: 40,
      borderRadius: 6
    },
    Input: {
      controlHeight: 40,
      borderRadius: 6
    },
    Select: {
      controlHeight: 40,
      borderRadius: 6
    },
    DatePicker: {
      controlHeight: 40,
      borderRadius: 6
    }
  }
}
