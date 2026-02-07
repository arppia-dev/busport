import type { ThemeConfig } from "antd"

function normalizeHex(hex: string) {
  let h = hex.replace(/^#/, "").trim()
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("")
  return h.toLowerCase()
}

function hexToRgb(hex: string) {
  const h = normalizeHex(hex)
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return { r, g, b }
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (n: number) => {
    const v = Math.max(0, Math.min(255, Math.round(n)))
    return v.toString(16).padStart(2, "0")
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function darken(hex: string, percent: number) {
  const { r, g, b } = hexToRgb(hex)
  const factor = 1 - Math.max(0, Math.min(100, percent)) / 100
  const nr = Math.round(r * factor)
  const ng = Math.round(g * factor)
  const nb = Math.round(b * factor)
  return rgbToHex(nr, ng, nb)
}

const COLOR_PRIMARY = "#07529F"
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
      darkItemColor: "rgba(255, 255, 255, 0.80)",
      darkItemBg: SIDEBAR_BG,
      darkSubMenuItemBg: darken(COLOR_PRIMARY, 60)
    }
  }
}
