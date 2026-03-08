import { filterProps } from '@/utils/VueUtils'

/**
 * Render a grid line item.
 * Priority: slot > default <line> with optional SVG attr overrides from `option`.
 */
export function renderLineItem(slot: ((...args: any[]) => any) | undefined, option: boolean | object, props: any) {
  if (slot) {
    return slot(props)
  }

  const { x1, y1, x2, y2, key, ...others } = { ...props } as any
  const { offset: __, ...restOfFilteredProps } = filterProps(others, false) as any
  return <line {...restOfFilteredProps} x1={x1} y1={y1} x2={x2} y2={y2} fill="none" key={key} />
}
