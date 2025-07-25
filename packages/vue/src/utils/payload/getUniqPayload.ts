import { uniqBy } from 'es-toolkit/compat'

type UniqueFunc<T> = (entry: T) => unknown

export type UniqueOption<T> = boolean | UniqueFunc<T>

export function getUniqPayload<T>(
  payload: ReadonlyArray<T>,
  option: UniqueOption<T>,
  defaultUniqBy: UniqueFunc<T>,
): ReadonlyArray<T> {
  if (option === true) {
    return uniqBy(payload, defaultUniqBy)
  }

  if (typeof option === 'function') {
    return uniqBy(payload, option)
  }

  return payload
}
