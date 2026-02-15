import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'

type ItemType = BreadcrumbItemType

/**
 * Generates breadcrumb items for a given pathname.
 * The root path returns only 'Inicio'.
 * Each segment is capitalized and linked, except the last one.
 *
 * @param pathname The current URL path (e.g. '/clients/planning')
 * @returns Array of breadcrumb items for Ant Design Breadcrumb component
 */
export function getBreadcrumbData(pathname: string): ItemType[] {
  // If it's the root, return only 'Inicio'
  if (pathname === '/') {
    return [
      {
        title: 'Inicio',
        href: '/'
      }
    ]
  }

  // Split the path into segments and filter empty ones
  const segments = pathname.split('/').filter(Boolean)

  // Create breadcrumb items
  const items: ItemType[] = [
    {
      title: 'Inicio',
      href: '/'
    }
  ]

  // Build cumulative segments
  let accumulatedPath = ''
  segments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)

    // The last item should not be a link
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
