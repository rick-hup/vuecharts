import type { Size } from '@/types'
import { isSsr } from '@/utils/validate'
import type { CSSProperties } from 'vue'

interface StringCache {
  widthCache: Record<string, any>
  cacheCount: number
}

const stringCache: StringCache = {
  widthCache: {},
  cacheCount: 0,
}

const MAX_CACHE_NUM = 2000
const SPAN_STYLE = {
  position: 'absolute',
  top: '-20000px',
  left: 0,
  padding: 0,
  margin: 0,
  border: 'none',
  whiteSpace: 'pre',
}
const MEASUREMENT_SPAN_ID = 'v-charts_measurement_span'

function removeInvalidKeys(obj: Record<string, any>) {
  const copyObj = { ...obj }
  Object.keys(copyObj).forEach((key) => {
    if (!copyObj[key]) {
      delete copyObj[key]
    }
  })
  return copyObj
}

export function getStringSize(text: string | number, style: CSSProperties = {}): Size {
  if (text === undefined || text === null || isSsr) {
    return { width: 0, height: 0 }
  }

  const copyStyle = removeInvalidKeys(style)
  const cacheKey = JSON.stringify({ text, copyStyle })

  if (stringCache.widthCache[cacheKey]) {
    return stringCache.widthCache[cacheKey]
  }

  try {
    let measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID)
    if (!measurementSpan) {
      measurementSpan = document.createElement('span')
      measurementSpan.setAttribute('id', MEASUREMENT_SPAN_ID)
      measurementSpan.setAttribute('aria-hidden', 'true')
      document.body.appendChild(measurementSpan)
    }
    // Need to use CSS Object Model (CSSOM) to be able to comply with Content Security Policy (CSP)
    // https://en.wikipedia.org/wiki/Content_Security_Policy
    const measurementSpanStyle: Record<string, any> = { ...SPAN_STYLE, ...copyStyle }
    Object.assign(measurementSpan.style, measurementSpanStyle)

    measurementSpan.textContent = `${text}`

    const rect = measurementSpan.getBoundingClientRect()
    const result = { width: rect.width, height: rect.height }

    stringCache.widthCache[cacheKey] = result

    if (++stringCache.cacheCount > MAX_CACHE_NUM) {
      stringCache.cacheCount = 0
      stringCache.widthCache = {}
    }

    return result
  }
  catch {
    return { width: 0, height: 0 }
  }
}

export type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K;
}[keyof T]
export type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never;
}[keyof T]
export type DisallowExtraKeys<T, D> = { [K in keyof D]: K extends keyof T ? D[K] : never }

/**
 * This type will take a source type `T` and a default type `D` and will return a new type
 * where all properties that are optional in `T` but required in `D` are made required in the result.
 * Properties that are required in `T` and optional in `D` will remain required.
 * Properties that are optional in both `T` and `D` will remain optional.
 *
 * This is useful for creating a type that represents the resolved props of a component with default props.
 */
export type RequiresDefaultProps<T, D extends Partial<T>> =
  // Section 1: Properties that were already required in T.
  // We use Pick<T, RequiredKeys<T>> to select only the keys that were originally
  // required in T. Pick preserves their required status and original types.
  Pick<T, RequiredKeys<T>> &
    // Section 2: Properties that were optional in T BUT have a default specified in D.
    // These properties should become required in the resulting type.
    // - OptionalKeys<T>: Gets the union of keys that are optional in T.
    // - RequiredKeys<D>: Gets the keys that are required in the default props D.
    // - Extract<..., ...>: Finds the intersection of these two sets – the keys that are optional in T AND required in D.
    // - Pick<T, Extract<...>>: Selects these specific properties from T. At this stage, they still retain their original optional ('?') status from T.
    // - Required<...>: Wraps the picked properties, removing the '?' modifier and making them required. Their underlying type (e.g., `string | undefined`) remains unchanged.
  Required<Pick<T, Extract<OptionalKeys<T>, RequiredKeys<D>>>> &
    // Section 3: Properties that were optional in T AND do NOT have a default in D.
    // These properties should remain optional.
    // - Exclude<OptionalKeys<T>, keyof D>: Finds the keys that are optional in T but are NOT present in D.
    // - Pick<T, Exclude<...>>: Selects these properties from T. Pick preserves their original optional status and types.
  Pick<T, Exclude<OptionalKeys<T>, keyof D>>

/**
 * This function mimics the behavior of the `defaultProps` static property in React.
 * Functional components do not have a defaultProps property, so this function is useful to resolve default props.
 *
 * The common recommendation is to use ES6 destructuring with default values in the function signature,
 * but you need to be careful there and make sure you destructure all the individual properties
 * and not the whole object. See the test file for example.
 *
 * And because destructuring all properties one by one is a faff, and it's easy to miss one property,
 * this function exists.
 *
 * @param realProps - the props object passed to the component by the user
 * @param defaultProps - the default props object defined in the component by Recharts
 * @returns - the props object with all the default props resolved. All `undefined` values are replaced with the default value.
 */
export function resolveDefaultProps<T, D extends Partial<T>>(
  realProps: T,
  defaultProps: D & DisallowExtraKeys<T, D>,
): RequiresDefaultProps<T, D> {
  /*
   * To avoid mutating the original `realProps` object passed to the function, create a shallow copy of it.
   * `resolvedProps` will be modified directly with the defaults.
   */
  const resolvedProps: T = { ...realProps }
  /*
   * Since the function guarantees `D extends Partial<T>`, this assignment is safe.
   * It allows TypeScript to work with the well-defined `Partial<T>` type inside the loop,
   * making subsequent type inference (especially for `dp[key]`) much more straightforward for the compiler.
   * This is a key step to improve type safety *without* value assertions later.
   */
  const dp: Partial<T> = defaultProps
  /*
   * `Object.keys` doesn't preserve strong key types - it always returns Array<string>.
   * However, due to the `D extends Partial<T>` constraint,
   * we know these keys *must* also be valid keys of `T`.
   * This assertion informs TypeScript of this relationship, avoiding type errors when using `key` to index `acc` (type T).
   *
   * Type assertions are not sound but in this case it's necessary
   * as `Object.keys` does not do what we want it to do.
   */
  const keys = Object.keys(defaultProps) as Array<keyof T>
  const withDefaults: T = keys.reduce((acc: T, key: keyof T): T => {
    if (acc[key] === undefined && dp[key] !== undefined) {
      acc[key] = dp[key]
    }
    return acc
  }, resolvedProps)
  /*
   * And again type assertions are not safe but here we have done the runtime work
   * so let's bypass the lack of static type safety and tell the compiler what happened.
   */
  return withDefaults as RequiresDefaultProps<T, D>
}

/**
 * merge props and attrs
 * @param props - props
 * @param attrs - attrs
 * @returns merged props
 */
export function mergePropAttrs<T extends object>(props: T, attrs: any) {
  function toObject() {
    return {
      ...props,
      ...attrs,
    }
  }
  return new Proxy({
    ...props,
    ...attrs,
  }, {
    get(_, key) {
      if (key === 'toObject') {
        return toObject
      }
      return props[key as keyof T] ?? attrs[key]
    },
  }) as T & { toObject: () => T }
}
