import { BreadcrumbProps } from "antd"
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb"

type ItemType = BreadcrumbItemType

export function getBreadcrumbData(pathname: string): ItemType[] {
  // Si es la raíz, retorna solo "Inicio"
  if (pathname === "/") {
    return [
      {
        title: "Inicio",
        href: "/"
      }
    ]
  }

  // Dividir el path en segmentos y filtrar vacíos
  const segments = pathname.split("/").filter(Boolean)

  // Crear items del breadcrumb
  const items: ItemType[] = [
    {
      title: "Inicio",
      href: "/"
    }
  ]

  // Construir segmentos acumulativos
  let accumulatedPath = ""
  segments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)

    // El último item no debe ser link
    if (index === segments.length - 1) {
      items.push({
        title: label
      })
    } else {
      items.push({
        title: label,
        href: accumulatedPath
      })
    }
  })

  return items
}
