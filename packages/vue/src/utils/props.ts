import type { ComponentObjectPropsOptions } from 'vue'

/**
 * 将 defaultProps 的属性值作为 props 的 default 属性
 * @param props - Vue 组件的 props 定义对象
 * @param defaultProps - 默认值对象
 * @returns 新的 Vue 组件 props 对象
 */
export function applyDefaultProps<T extends ComponentObjectPropsOptions>(
  props: T,
  defaultProps: Partial<Record<keyof T, any>>,
): T {
  const newProps = { ...props } as Record<keyof T, any>

  for (const [key, defaultValue] of Object.entries(defaultProps)) {
    if (key in newProps) {
      const propDef = newProps[key as keyof T]
      if (typeof propDef === 'object' && propDef !== null && 'type' in propDef) {
        newProps[key as keyof T] = {
          ...propDef,
          default: defaultValue,
        }
      }
    }
  }

  return newProps as T
}

/**
 * 创建带有默认值的 props 对象
 * @param baseProps - 基础 props 定义
 * @param defaultProps - 默认值配置
 * @returns 合并后的 props 对象
 */
export function createPropsWithDefaults<T extends ComponentObjectPropsOptions>(
  baseProps: T,
  defaultProps: Partial<Record<keyof T, any>>,
): T {
  return applyDefaultProps(baseProps, defaultProps)
}
