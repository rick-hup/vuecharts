export type BaseValue = number | 'dataMin' | 'dataMax'

export interface DataPoint {
  [key: string]: number | string | Date | undefined
}

export interface AreaChartData extends DataPoint {
  value: number
  date?: Date | string
}
