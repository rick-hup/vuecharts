import { isNumber } from '@/utils/validate'

let idCounter = 0
export function uniqueId(prefix?: string) {
  const id = ++idCounter

  return `${prefix || ''}${id}`
}

export function interpolate(start: unknown, end: number, t: number): number
export function interpolate(start: unknown, end: null, t: number): null
export function interpolate(start: unknown, end: number | null, t: number): number | null
export function interpolate(start: unknown, end: number | null, t: number): number | null {
  if (isNumber(start) && isNumber(end)) {
    return start + t * (end - start)
  }
  return end
}
