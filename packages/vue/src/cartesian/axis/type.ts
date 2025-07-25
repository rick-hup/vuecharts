import type { DataKey } from '@/types'
import type { AxisDomain, AxisDomainType, AxisRange } from '@/types/axis'
import type { RechartsScale, ScaleType } from '@/types/scale'
import type { SVGAttributes } from 'vue'

export interface BaseAxisProps {
  /** The type of axis */
  type?: AxisDomainType
  /** The key of data displayed in the axis */
  dataKey?: DataKey<any>
  /** Whether display the axis */
  hide?: boolean
  /** The scale type as a string, or scale function */
  scale?: ScaleType | RechartsScale
  /** The option for tick */
  tick?: object
  /** The count of ticks */
  tickCount?: number
  /** The option for axisLine */
  axisLine?: boolean | SVGAttributes
  /** The option for tickLine */
  tickLine?: boolean | SVGAttributes
  /** The size of tick line */
  tickSize?: number
  /** The formatter function of tick */
  tickFormatter?: (value: any, index: number) => string
  /**
   * When domain of the axis is specified and the type of the axis is 'number',
   * if allowDataOverflow is set to be false,
   * the domain will be adjusted when the minimum value of data is smaller than domain[0] or
   * the maximum value of data is greater than domain[1] so that the axis displays all data values.
   * If set to true, graphic elements (line, area, bars) will be clipped to conform to the specified domain.
   */
  allowDataOverflow?: boolean
  /**
   * Allow the axis has duplicated categories or not when the type of axis is "category".
   */
  allowDuplicatedCategory?: boolean
  /**
   * Allow the ticks of axis to be decimals or not.
   */
  allowDecimals?: boolean
  /** The domain of scale in this axis */
  domain?: AxisDomain
  /** Consider hidden elements when computing the domain (defaults to false) */
  includeHidden?: boolean
  /** The name of data displayed in the axis */
  name?: string
  /** The unit of data displayed in the axis */
  unit?: string
  range?: AxisRange
  /** axis vue component  ?as? */
  AxisComp?: any
  /** Needed to allow usage of the label prop on the X and Y axis */
  // TODO: label slot?
  label?: string | number | object
  /** The HTML element's class name */
  className?: string
}
