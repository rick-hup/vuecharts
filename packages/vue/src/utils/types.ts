/**
 * This object defines the offset of the chart area and width and height and brush and ... it's a bit too much information all in one.
 * We use it internally but let's not expose it to the outside world.
 * If you are looking for this information, instead import `ChartOffset` or `PlotArea` from `recharts`.
 */
export type ChartOffsetInternal = {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
  brushBottom: number
}
