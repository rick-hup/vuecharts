export interface LinearRegressionResult {
  xmin: number
  xmax: number
  a: number
  b: number
}

/**
 * The least square linear regression
 * @param data The array of points
 * @returns The domain of x, and the parameter of linear function y = ax + b
 */
export function getLinearRegression(data: ReadonlyArray<{ cx?: number, cy?: number }>): LinearRegressionResult {
  const len = data.length
  let xsum = 0
  let ysum = 0
  let xysum = 0
  let xxsum = 0
  let xmin = Infinity
  let xmax = -Infinity

  for (let i = 0; i < len; i++) {
    const xcurrent = data[i]?.cx || 0
    const ycurrent = data[i]?.cy || 0

    xsum += xcurrent
    ysum += ycurrent
    xysum += xcurrent * ycurrent
    xxsum += xcurrent * xcurrent
    xmin = Math.min(xmin, xcurrent)
    xmax = Math.max(xmax, xcurrent)
  }

  const a = len * xxsum !== xsum * xsum ? (len * xysum - xsum * ysum) / (len * xxsum - xsum * xsum) : 0

  return {
    xmin,
    xmax,
    a,
    b: (ysum - a * xsum) / len,
  }
}
