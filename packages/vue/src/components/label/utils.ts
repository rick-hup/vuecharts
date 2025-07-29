import type { CartesianViewBox, PolarViewBox, ViewBox } from '@/cartesian/type'
import type { LabelProps } from '@/components/label/types'
import type { Coordinate } from '@/types'
import { isNumber, isPercent } from '@/utils'
import { getPercentValue } from '@/utils/data'

export function parseViewBox(props: any): ViewBox | undefined {
  const {
    cx,
    cy,
    angle,
    startAngle,
    endAngle,
    r,
    radius,
    innerRadius,
    outerRadius,
    x,
    y,
    top,
    left,
    width,
    height,
    clockWise,
    labelViewBox,
  } = props

  if (labelViewBox) {
    return labelViewBox
  }

  if (isNumber(width) && isNumber(height)) {
    if (isNumber(x) && isNumber(y)) {
      return { x, y, width, height }
    }
    if (isNumber(top) && isNumber(left)) {
      return { x: top, y: left, width, height }
    }
  }

  if (isNumber(x) && isNumber(y)) {
    return { x, y, width: 0, height: 0 }
  }

  if (isNumber(cx) && isNumber(cy)) {
    return {
      cx,
      cy,
      startAngle: startAngle || angle || 0,
      endAngle: endAngle || angle || 0,
      innerRadius: innerRadius || 0,
      outerRadius: outerRadius || radius || r || 0,
      clockWise,
    }
  }

  if (props.viewBox) {
    return props.viewBox
  }

  return undefined
}

export function isPolar(viewBox: CartesianViewBox | PolarViewBox): viewBox is PolarViewBox {
  return 'cx' in viewBox && isNumber(viewBox.cx)
}

export const RADIAN = Math.PI / 180

export function polarToCartesian(cx: number, cy: number, radius: number, angle: number): Coordinate {
  return {
    x: cx + Math.cos(-RADIAN * angle) * radius,
    y: cy + Math.sin(-RADIAN * angle) * radius,
  }
}

export function getAttrsOfPolarLabel(props: LabelProps) {
  const { viewBox, offset, position } = props
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = viewBox as PolarViewBox
  const midAngle = (startAngle! + endAngle!) / 2

  if (position === 'outside') {
    const { x, y } = polarToCartesian(cx!, cy!, outerRadius! + offset!, midAngle)

    return {
      x,
      y,
      textAnchor: x! >= cx! ? 'start' : 'end',
      verticalAnchor: 'middle',
    }
  }

  if (position === 'center') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'middle',
    }
  }

  if (position === 'centerTop') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'start',
    }
  }

  if (position === 'centerBottom') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'end',
    }
  }

  const r = (innerRadius! + outerRadius!) / 2
  const { x, y } = polarToCartesian(cx!, cy!, r, midAngle)

  return {
    x,
    y,
    textAnchor: 'middle',
    verticalAnchor: 'middle',
  }
}

export function getAttrsOfCartesianLabel(props: LabelProps, viewBox: CartesianViewBox) {
  const { parentViewBox, offset, position } = props
  const { x, y, width, height } = viewBox

  // Define vertical offsets and position inverts based on the value being positive or negative
  const verticalSign = height! >= 0 ? 1 : -1
  const verticalOffset = verticalSign * offset!
  const verticalEnd = verticalSign > 0 ? 'end' : 'start'
  const verticalStart = verticalSign > 0 ? 'start' : 'end'

  // Define horizontal offsets and position inverts based on the value being positive or negative
  const horizontalSign = width! >= 0 ? 1 : -1
  const horizontalOffset = horizontalSign * offset!
  const horizontalEnd = horizontalSign > 0 ? 'end' : 'start'
  const horizontalStart = horizontalSign > 0 ? 'start' : 'end'

  if (position === 'top') {
    const attrs = {
      x: x! + width! / 2,
      y: y! - verticalSign * offset!,
      textAnchor: 'middle',
      verticalAnchor: verticalEnd,
    }

    return {
      ...attrs,
      ...(parentViewBox
        ? {
            height: Math.max(y! - (parentViewBox as CartesianViewBox).y!, 0),
            width: width!,
          }
        : {}),
    }
  }

  if (position === 'bottom') {
    const attrs = {
      x: x! + width! / 2,
      y: y! + height! + verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalStart,
    }

    return {
      ...attrs,
      ...(parentViewBox
        ? {
            height: Math.max(
              (parentViewBox as CartesianViewBox).y! + (parentViewBox as CartesianViewBox).height! - (y! + height!),
              0,
            ),
            width: width!,
          }
        : {}),
    }
  }

  if (position === 'left') {
    const attrs = {
      x: x! - horizontalOffset,
      y: y! + height! / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: 'middle',
    }

    return {
      ...attrs,
      ...(parentViewBox
        ? {
            width: Math.max(attrs.x! - (parentViewBox as CartesianViewBox).x!, 0),
            height: height!,
          }
        : {}),
    }
  }

  if (position === 'right') {
    const attrs = {
      x: x! + width! + horizontalOffset,
      y: y! + height! / 2,
      textAnchor: horizontalStart,
      verticalAnchor: 'middle',
    }
    return {
      ...attrs,
      ...(parentViewBox
        ? {
            width: Math.max(
              (parentViewBox as CartesianViewBox).x! + (parentViewBox as CartesianViewBox).width! - attrs.x!,
              0,
            ),
            height: height!,
          }
        : {}),
    }
  }

  const sizeAttrs = parentViewBox ? { width, height } : {}

  if (position === 'insideLeft') {
    return {
      x: x! + horizontalOffset,
      y: y! + height! / 2,
      textAnchor: horizontalStart,
      verticalAnchor: 'middle',
      ...sizeAttrs,
    }
  }

  if (position === 'insideRight') {
    return {
      x: x! + width! - horizontalOffset,
      y: y! + height! / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: 'middle',
      ...sizeAttrs,
    }
  }

  if (position === 'insideTop') {
    return {
      x: x! + width! / 2,
      y: y! + verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalStart,
      ...sizeAttrs,
    }
  }

  if (position === 'insideBottom') {
    return {
      x: x! + width! / 2,
      y: y! + height! - verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalEnd,
      ...sizeAttrs,
    }
  }

  if (position === 'insideTopLeft') {
    return {
      x: x! + horizontalOffset,
      y: y! + verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalStart,
      ...sizeAttrs,
    }
  }

  if (position === 'insideTopRight') {
    return {
      x: x! + width! - horizontalOffset,
      y: y! + verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalStart,
      ...sizeAttrs,
    }
  }

  if (position === 'insideBottomLeft') {
    return {
      x: x! + horizontalOffset,
      y: y! + height! - verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalEnd,
      ...sizeAttrs,
    }
  }

  if (position === 'insideBottomRight') {
    return {
      x: x! + width! - horizontalOffset,
      y: y! + height! - verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalEnd,
      ...sizeAttrs,
    }
  }

  if (
    !!position
    && typeof position === 'object'
    && (isNumber(position.x) || isPercent(position.x!))
    && (isNumber(position.y) || isPercent(position.y!))
  ) {
    return {
      x: x! + getPercentValue(position.x!, width!),
      y: y! + getPercentValue(position.y!, height!),
      textAnchor: 'end',
      verticalAnchor: 'end',
      ...sizeAttrs,
    }
  }

  return {
    x: x! + width! / 2,
    y: y! + height! / 2,
    textAnchor: 'middle',
    verticalAnchor: 'middle',
    ...sizeAttrs,
  }
}
