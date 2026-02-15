/**
 * Normalizes a hexadecimal color to 6 digits, without the '#' prefix.
 * @param hex Hex color (example: '#fff', 'fff', '#ffffff', 'ffffff')
 * @returns Normalized lowercase 6-digit hex string, without '#'.
 */
export function normalizeHex(hex: string) {
  let h = hex.replace(/^#/, '').trim()
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  return h.toLowerCase()
}

/**
 * Converts a hexadecimal color to an RGB object.
 * @param hex Hex color (example: '#fff', '#ffffff')
 * @returns Object with properties r, g, b (values 0-255)
 */
export function hexToRgb(hex: string) {
  const h = normalizeHex(hex)
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return { r, g, b }
}

/**
 * Converts RGB values to a hexadecimal color.
 * @param r Red value (0-255)
 * @param g Green value (0-255)
 * @param b Blue value (0-255)
 * @returns Hex color in format '#rrggbb'
 */
export function rgbToHex(r: number, g: number, b: number) {
  const toHex = (n: number) => {
    const v = Math.max(0, Math.min(255, Math.round(n)))
    return v.toString(16).padStart(2, '0')
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Darkens a hexadecimal color by a given percentage.
 * @param hex Hex color (example: '#fff', '#ffffff')
 * @param percent Percentage to darken (0-100)
 * @returns Darkened hex color
 */
export function darken(hex: string, percent: number) {
  const { r, g, b } = hexToRgb(hex)
  const factor = 1 - Math.max(0, Math.min(100, percent)) / 100
  const nr = Math.round(r * factor)
  const ng = Math.round(g * factor)
  const nb = Math.round(b * factor)
  return rgbToHex(nr, ng, nb)
}
