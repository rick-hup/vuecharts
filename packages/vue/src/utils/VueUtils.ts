import type { FilteredSvgElementType } from '@/cartesian/cartesian-grid/const'
import { FilteredElementKeyMap, SVGElementPropKeys } from '@/cartesian/cartesian-grid/const'
import { EventKeys } from '@/types'

/**
 * Checks if the property is valid to spread onto an SVG element or onto a specific component
 * @param {unknown} property property value currently being compared
 * @param {string} key property key currently being compared
 * @param {boolean} includeEvents if events are included in spreadable props
 * @param {boolean} svgElementType checks against map of SVG element types to attributes
 * @returns {boolean} is prop valid
 */
export function isValidSpreadableProp(property: unknown, key: string, includeEvents?: boolean, svgElementType?: FilteredSvgElementType) {
  /**
   * If the svg element type is explicitly included, check against the filtered element key map
   * to determine if there are attributes that should only exist on that element type.
   * @todo Add an internal cjs version of https://github.com/wooorm/svg-element-attributes for full coverage.
   */
  const matchingElementTypeKeys = (svgElementType && FilteredElementKeyMap?.[svgElementType]) ?? []

  return (
    key.startsWith('data-')
    || (typeof property !== 'function'
      && ((svgElementType && matchingElementTypeKeys.includes(key)) || SVGElementPropKeys.includes(key)))
    || (includeEvents && EventKeys.includes(key))
  )
}

export function filterProps(props: Record<string, any> | boolean | unknown, includeEvents: boolean, svgElementType?: FilteredSvgElementType) {
  if (!props || typeof props === 'function' || typeof props === 'boolean') {
    return null
  }

  const inputProps = props as Record<string, any>

  if (typeof inputProps !== 'object' && typeof inputProps !== 'function') {
    return null
  }

  const out: Record<string, any> = {}

  /**
   * Props are blindly spread onto SVG elements. This loop filters out properties that we don't want to spread.
   * Items filtered out are as follows:
   *   - functions in properties that are SVG attributes (functions are included when includeEvents is true)
   *   - props that are SVG attributes but don't matched the passed svgElementType
   *   - any prop that is not in SVGElementPropKeys (or in EventKeys if includeEvents is true)
   */
  Object.keys(inputProps).forEach((key) => {
    if (isValidSpreadableProp(inputProps?.[key], key, includeEvents, svgElementType)) {
      out[key] = inputProps[key]
    }
  })

  return out
}
