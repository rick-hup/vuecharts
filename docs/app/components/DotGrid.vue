<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { AnimationPlaybackControls } from 'motion-v'

const props = withDefaults(defineProps<DotGridProps>(), {
  dotSize: 16,
  gap: 32,
  baseColor: '#27FF64',
  activeColor: '#27FF64',
  proximity: 150,
  speedTrigger: 100,
  shockRadius: 250,
  shockStrength: 5,
  maxSpeed: 5000,
})

function throttle<T extends unknown[]>(func: (...args: T) => void, limit: number) {
  let lastCall = 0
  return function (this: unknown, ...args: T) {
    const now = performance.now()
    if (now - lastCall >= limit) {
      lastCall = now
      func.apply(this, args)
    }
  }
}

interface Dot {
  cx: number
  cy: number
  xOffset: number
  yOffset: number
  _inertiaApplied: boolean
  _decayRaf?: number
  _controlsX?: AnimationPlaybackControls
  _controlsY?: AnimationPlaybackControls
}

export interface DotGridProps {
  dotSize?: number
  gap?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  speedTrigger?: number
  shockRadius?: number
  shockStrength?: number
  maxSpeed?: number
}

const wrapperRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()
const dots = ref<Dot[]>([])
const pointer = ref({
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 0,
  lastTime: 0,
  lastX: 0,
  lastY: 0,
})

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!m)
    return { r: 0, g: 0, b: 0 }
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  }
}

const baseRgb = computed(() => hexToRgb(props.baseColor))
const activeRgb = computed(() => hexToRgb(props.activeColor))

const circlePath = computed(() => {
  if (typeof window === 'undefined' || !window.Path2D)
    return null
  const p = new Path2D()
  p.arc(0, 0, props.dotSize / 2, 0, Math.PI * 2)
  return p
})

function buildGrid() {
  const wrap = wrapperRef.value
  const canvas = canvasRef.value
  if (!wrap || !canvas)
    return

  const { width, height } = wrap.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  const ctx = canvas.getContext('2d')
  if (ctx)
    ctx.scale(dpr, dpr)

  const cell = props.dotSize + props.gap
  const cols = Math.floor((width + props.gap) / cell)
  const rows = Math.floor((height + props.gap) / cell)

  const gridW = cell * cols - props.gap
  const gridH = cell * rows - props.gap

  const startX = (width - gridW) / 2 + props.dotSize / 2
  const startY = (height - gridH) / 2 + props.dotSize / 2

  const newDots: Dot[] = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      newDots.push({
        cx: startX + x * cell,
        cy: startY + y * cell,
        xOffset: 0,
        yOffset: 0,
        _inertiaApplied: false,
      })
    }
  }
  dots.value = newDots
}

let rafId: number
let resizeObserver: ResizeObserver | null = null

function draw() {
  const canvas = canvasRef.value
  if (!canvas)
    return
  const ctx = canvas.getContext('2d')
  if (!ctx)
    return
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const { x: px, y: py } = pointer.value
  const proxSq = props.proximity * props.proximity

  for (const dot of dots.value) {
    const ox = dot.cx + dot.xOffset
    const oy = dot.cy + dot.yOffset
    const dx = dot.cx - px
    const dy = dot.cy - py
    const dsq = dx * dx + dy * dy

    let style = props.baseColor
    if (dsq <= proxSq) {
      const dist = Math.sqrt(dsq)
      const t = 1 - dist / props.proximity
      const r = Math.round(baseRgb.value.r + (activeRgb.value.r - baseRgb.value.r) * t)
      const g = Math.round(baseRgb.value.g + (activeRgb.value.g - baseRgb.value.g) * t)
      const b = Math.round(baseRgb.value.b + (activeRgb.value.b - baseRgb.value.b) * t)
      style = `rgb(${r},${g},${b})`
    }

    if (circlePath.value) {
      ctx.save()
      ctx.translate(ox, oy)
      ctx.fillStyle = style
      ctx.fill(circlePath.value)
      ctx.restore()
    }
  }

  rafId = requestAnimationFrame(draw)
}

/**
 * Kick a dot — single continuous underdamped spring simulation.
 * Full analytical solution with initial displacement x₀ AND velocity v₀:
 *   x(t) = e^(-γt) · [x₀·cos(ωd·t) + ((v₀ + γ·x₀)/ωd)·sin(ωd·t)]
 * When re-kicked mid-animation, captures current offset as x₀ so the
 * new animation continues smoothly from the current position.
 */
function kickDot(dot: Dot, pushX: number, pushY: number) {
  dot._controlsX?.stop()
  dot._controlsY?.stop()
  if (dot._decayRaf) {
    cancelAnimationFrame(dot._decayRaf)
    dot._decayRaf = undefined
  }
  dot._inertiaApplied = true

  // Spring parameters
  const stiffness = 35
  const damping = 2.5
  const mass = 1

  const gamma = damping / (2 * mass)
  const omegaD = Math.sqrt(stiffness / mass - gamma * gamma)

  // Capture current position as initial displacement (smooth re-kick)
  const x0 = dot.xOffset
  const y0 = dot.yOffset

  // Add new push velocity on top of current displacement
  const vx = pushX * 1.2
  const vy = pushY * 1.2

  // Precompute coefficients for sin term: (v₀ + γ·x₀) / ωd
  const sinCoeffX = (vx + gamma * x0) / omegaD
  const sinCoeffY = (vy + gamma * y0) / omegaD

  const startTime = performance.now()
  const restThreshold = 0.3

  function springTick(now: number) {
    const t = (now - startTime) / 1000
    const envelope = Math.exp(-gamma * t)
    const cosT = Math.cos(omegaD * t)
    const sinT = Math.sin(omegaD * t)

    // x(t) = e^(-γt) · [x₀·cos(ωd·t) + sinCoeff·sin(ωd·t)]
    dot.xOffset = envelope * (x0 * cosT + sinCoeffX * sinT)
    dot.yOffset = envelope * (y0 * cosT + sinCoeffY * sinT)

    // Amplitude envelope: check if max possible displacement is small enough
    const ampX = Math.sqrt(x0 * x0 + sinCoeffX * sinCoeffX)
    const ampY = Math.sqrt(y0 * y0 + sinCoeffY * sinCoeffY)
    if (envelope * Math.max(ampX, ampY) > restThreshold) {
      dot._decayRaf = requestAnimationFrame(springTick)
    }
    else {
      dot.xOffset = 0
      dot.yOffset = 0
      dot._decayRaf = undefined
      dot._inertiaApplied = false
    }
  }

  dot._decayRaf = requestAnimationFrame(springTick)
}

function onMove(e: MouseEvent) {
  const now = performance.now()
  const pr = pointer.value
  const dt = pr.lastTime ? now - pr.lastTime : 16
  const dx = e.clientX - pr.lastX
  const dy = e.clientY - pr.lastY
  let vx = (dx / dt) * 1000
  let vy = (dy / dt) * 1000
  let speed = Math.hypot(vx, vy)
  if (speed > props.maxSpeed) {
    const scale = props.maxSpeed / speed
    vx *= scale
    vy *= scale
    speed = props.maxSpeed
  }
  pr.lastTime = now
  pr.lastX = e.clientX
  pr.lastY = e.clientY
  pr.vx = vx
  pr.vy = vy
  pr.speed = speed

  const canvas = canvasRef.value
  if (!canvas)
    return
  const rect = canvas.getBoundingClientRect()
  pr.x = e.clientX - rect.left
  pr.y = e.clientY - rect.top

  for (const dot of dots.value) {
    const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y)
    if (speed > props.speedTrigger && dist < props.proximity) {
      // Push direction: away from cursor + mouse velocity contribution
      const pushX = dot.cx - pr.x + vx * 0.005
      const pushY = dot.cy - pr.y + vy * 0.005
      kickDot(dot, pushX, pushY)
    }
  }
}

function onClick(e: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas)
    return
  const rect = canvas.getBoundingClientRect()
  const cx = e.clientX - rect.left
  const cy = e.clientY - rect.top

  for (const dot of dots.value) {
    const dist = Math.hypot(dot.cx - cx, dot.cy - cy)
    if (dist < props.shockRadius) {
      const falloff = Math.max(0, 1 - dist / props.shockRadius)
      const pushX = (dot.cx - cx) * props.shockStrength * falloff
      const pushY = (dot.cy - cy) * props.shockStrength * falloff
      kickDot(dot, pushX, pushY)
    }
  }
}

const throttledMove = throttle(onMove, 50)

onMounted(async () => {
  await nextTick()

  buildGrid()

  if (circlePath.value) {
    draw()
  }

  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(buildGrid)
    if (wrapperRef.value) {
      resizeObserver.observe(wrapperRef.value)
    }
  }
  else {
    window.addEventListener('resize', buildGrid)
  }

  window.addEventListener('mousemove', throttledMove, { passive: true })
  window.addEventListener('click', onClick)
})

onUnmounted(() => {
  if (rafId)
    cancelAnimationFrame(rafId)
  if (resizeObserver)
    resizeObserver.disconnect()
  else window.removeEventListener('resize', buildGrid)
  window.removeEventListener('mousemove', throttledMove)
  window.removeEventListener('click', onClick)

  for (const dot of dots.value) {
    if (dot._decayRaf)
      cancelAnimationFrame(dot._decayRaf)
    dot._controlsX?.stop()
    dot._controlsY?.stop()
  }
})

watch([() => props.dotSize, () => props.gap], () => {
  buildGrid()
})

watch([() => props.proximity, () => props.baseColor, activeRgb, baseRgb, circlePath], () => {
  if (rafId)
    cancelAnimationFrame(rafId)
  if (circlePath.value)
    draw()
})
</script>

<template>
  <div
    ref="wrapperRef"
    class="dot-grid-wrapper"
  >
    <canvas
      ref="canvasRef"
      class="dot-grid-canvas"
    />
  </div>
</template>

<style scoped>
.dot-grid-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.dot-grid-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
