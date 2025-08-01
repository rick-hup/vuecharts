import { filterProps } from '@/utils/VueUtils'

/**
 * Render a grid line item, supporting function or default <line> rendering.
 */
export function renderLineItem(option, props) {
  let lineItem

  if (typeof option === 'function') {
    lineItem = option(props)
  }
  else {
    const { x1, y1, x2, y2, key, ...others } = {
      ...props,
    } as any
    const { offset: __, ...restOfFilteredProps } = filterProps(others, false) as any
    lineItem = <line {...restOfFilteredProps} x1={x1} y1={y1} x2={x2} y2={y2} fill="none" key={key} />
  }

  return lineItem
}
