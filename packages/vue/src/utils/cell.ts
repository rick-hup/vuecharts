import { Fragment } from 'vue'
import type { VNode } from 'vue'
import { Cell } from '@/components/Cell'

/**
 * Extract Cell VNode props from a VNode tree.
 * Handles Fragment wrapping from v-for.
 */
export function extractCellProps(vnodes: VNode[]): Record<string, any>[] {
  const result: Record<string, any>[] = []
  for (const vnode of vnodes) {
    if (vnode.type === Cell) {
      result.push(vnode.props ?? {})
    }
    else if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      result.push(...extractCellProps(vnode.children as VNode[]))
    }
  }
  return result
}

/**
 * Filter out Cell VNodes from a VNode tree, preserving non-Cell siblings.
 * Recursively descends Fragment children to preserve co-located content (e.g. LabelList).
 */
export function filterOutCells(vnodes: VNode[]): VNode[] {
  const result: VNode[] = []
  for (const vnode of vnodes) {
    if (vnode.type === Cell) {
      continue
    }
    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      result.push(...filterOutCells(vnode.children as VNode[]))
    }
    else {
      result.push(vnode)
    }
  }
  return result
}
