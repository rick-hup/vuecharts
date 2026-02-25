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
    // Use the inline style dimensions as the coordinate space reference.
    // offsetWidth reflects the actual rendered size, which can differ from the
    // chart's declared width when CSS layout (e.g. flexbox align-items:stretch)
    // resizes the wrapper element. The inline style always holds the chart's
    // intended coordinate space (e.g. "500px"), giving the correct scale factor.
    const styleWidth = el.style ? parseFloat(el.style.width) : NaN
    const styleHeight = el.style ? parseFloat(el.style.height) : NaN
    const coordWidth = styleWidth > 0 ? styleWidth : el.offsetWidth
    const coordHeight = styleHeight > 0 ? styleHeight : el.offsetHeight
    scaleX = coordWidth > 0 ? rect.width / coordWidth : 1
    scaleY = coordHeight > 0 ? rect.height / coordHeight : 1
  }

  return {
    relativeX: Math.round((event.clientX - rect.left) / scaleX),
    relativeY: Math.round((event.clientY - rect.top) / scaleY),
  }
}
