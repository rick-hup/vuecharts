import { type Ref, computed, ref, watch } from 'vue'

/**
 * Tracks whether a component is currently animating.
 *
 * When `isAnimationActive` is `false`, always returns `false` regardless of
 * internal state — this ensures `isAnimationActive={false}` immediately
 * disables all animation-gated rendering (e.g. deferred LabelList).
 *
 * When `isAnimationActive` is `true`, starts as `true` and can be set to
 * `false` via the returned ref (typically on animation end).
 *
 * Re-entering `isAnimationActive=true` resets internal state to `true`.
 */
export function useIsAnimating(isAnimationActive: () => boolean): Ref<boolean> {
  const internal = ref(isAnimationActive())

  watch(isAnimationActive, (active) => {
    if (active) {
      internal.value = true
    }
  })

  return computed({
    get: () => isAnimationActive() && internal.value,
    set: (val: boolean) => {
      internal.value = val
    },
  })
}
