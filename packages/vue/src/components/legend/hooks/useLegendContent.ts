import type { CSSProperties, Component } from 'vue'
import type { LayoutType } from '@/types'
import type { LegendType } from '@/types/legend'
import type { HorizontalAlignmentType, LegendPayload, VerticalAlignmentType } from '@/components/DefaultLegendContent'

interface LegendContentProps {
  layout?: LayoutType
  align?: HorizontalAlignmentType
  verticalAlign?: VerticalAlignmentType
  iconSize?: number
  iconType?: LegendType
  wrapperStyle?: CSSProperties
  contentStyle?: CSSProperties
  formatter?: (value: string, entry: LegendPayload) => string
  onClick?: (data: LegendPayload, index: number) => void
  onMouseEnter?: (data: LegendPayload, index: number) => void
  onMouseLeave?: (data: LegendPayload, index: number) => void
  payload?: LegendPayload[]
  content?: Component | ((props: any) => any)
}

export function useLegendContent(props: LegendContentProps) {
  const getWrapperStyle = (layout: LayoutType = 'horizontal', align: HorizontalAlignmentType = 'center', verticalAlign: VerticalAlignmentType = 'bottom'): CSSProperties => {
    return {
      display: 'flex',
      flexDirection: layout === 'horizontal' ? 'row' : 'column',
      justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
      alignItems: verticalAlign === 'top' ? 'flex-start' : verticalAlign === 'bottom' ? 'flex-end' : 'center',
      flexWrap: 'wrap',
      gap: '8px',
      ...(props.wrapperStyle || {}),
    }
  }

  const getContentStyle = (layout: LayoutType = 'horizontal'): CSSProperties => {
    return {
      display: 'flex',
      flexDirection: layout === 'horizontal' ? 'row' : 'column',
      gap: layout === 'horizontal' ? '16px' : '8px',
      ...(props.contentStyle || {}),
    }
  }

  const getItemStyle = (layout: LayoutType = 'horizontal'): CSSProperties => {
    return {
      display: layout === 'horizontal' ? 'inline-block' : 'block',
      marginRight: '10px',
    }
  }

  const getViewBox = () => {
    return { x: 0, y: 0, width: 32, height: 32 }
  }

  const getSvgStyle = (): CSSProperties => {
    return {
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: '4px',
    }
  }

  const formatValue = (entry: LegendPayload) => {
    return props.formatter ? props.formatter(entry.value, entry) : entry.value
  }

  const handleClick = (entry: LegendPayload, index: number) => {
    props.onClick?.(entry, index)
  }

  const handleMouseEnter = (entry: LegendPayload, index: number) => {
    props.onMouseEnter?.(entry, index)
  }

  const handleMouseLeave = (entry: LegendPayload, index: number) => {
    props.onMouseLeave?.(entry, index)
  }

  return {
    getWrapperStyle,
    getContentStyle,
    getItemStyle,
    getViewBox,
    getSvgStyle,
    formatValue,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  }
}
