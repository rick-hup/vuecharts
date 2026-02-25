export type RelativePointer = { relativeX: number, relativeY: number }

type MousePointer = { clientX: number, clientY: number, currentTarget: Element | HTMLElement }

function isSvgPointer(pointer: MousePointer): pointer is MousePointer & { currentTarget: SVGGraphicsElement } {
  return 'getBBox' in pointer.currentTarget && typeof (pointer.currentTarget as any).getBBox === 'function'
}

export function getRelativeCoordinate(event: MousePointer): RelativePointer {
  const rect = event.currentTarget.getBoundingClientRect()
  let scaleX: number
  let scaleY: number

  if (isSvgPointer(event)) {
    const bbox = (event.currentTarget as SVGGraphicsElement).getBBox()
    scaleX = bbox.width > 0 ? rect.width / bbox.width : 1
    scaleY = bbox.height > 0 ? rect.height / bbox.height : 1
  }
  else {
    const el = event.currentTarget as HTMLElement
    scaleX = el.offsetWidth > 0 ? rect.width / el.offsetWidth : 1
    scaleY = el.offsetHeight > 0 ? rect.height / el.offsetHeight : 1
  }

  return {
    relativeX: Math.round((event.clientX - rect.left) / scaleX),
    relativeY: Math.round((event.clientY - rect.top) / scaleY),
  }
}
