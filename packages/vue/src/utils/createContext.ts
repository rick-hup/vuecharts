import { type InjectionKey, inject, provide } from 'vue'

/**
 * @param providerComponentName - The name(s) of the component(s) providing the context.
 *
 * There are situations where context can come from multiple components. In such cases, you might need to give an array of component names to provide your context, instead of just a single string.
 *
 * @param contextName The description for injection key symbol.
 */
export function createContext<ContextValue>(
  contextName?: string,
) {
  const symbolDescription = contextName

  const injectionKey: InjectionKey<ContextValue | null> = Symbol(symbolDescription)

  /**
   * @param fallback The context value to return if the injection fails.
   *
   * @throws When context injection failed and no fallback is specified.
   * This happens when the component injecting the context is not a child of the root component providing the context.
   */
  const injectContext = <
    T extends ContextValue | null | undefined = ContextValue,
  >(
    fallback?: T,
  ): T extends null ? ContextValue | null : ContextValue => {
    const context = inject(injectionKey, fallback)

    if (context === undefined) {
      throw new Error(
        `Injection \`${injectionKey.toString()}\` not found. Component must be used within ${
          `\`${contextName}\``
        }`,
      )
    }
    return context as T extends null ? ContextValue | null : ContextValue
  }

  const provideContext = (contextValue: ContextValue) => {
    provide(injectionKey, contextValue)
    return contextValue
  }

  return [injectContext, provideContext] as const
}
