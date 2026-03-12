<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

useSeoMeta({
  title: 'vccs — Vue 3 Charting Components',
  description: 'Composable charting components for Vue 3, ported from Recharts',
})

const chartList = [
  defineAsyncComponent(() => import('~/charts/bar-charts/simple-bar-chart.vue')),
  defineAsyncComponent(() => import('~/charts/area-charts/gradient-area-chart.vue')),
  defineAsyncComponent(() => import('~/charts/line-charts/multi-line-chart.vue')),
  defineAsyncComponent(() => import('~/charts/pie-charts/simple-pie-chart.vue')),
  defineAsyncComponent(() => import('~/charts/radar-charts/simple-radar-chart.vue')),
  defineAsyncComponent(() => import('~/charts/bar-charts/stacked-bar-chart.vue')),
  defineAsyncComponent(() => import('~/charts/area-charts/simple-area-chart.vue')),
  defineAsyncComponent(() => import('~/charts/radial-charts/simple-radial-chart.vue')),
  defineAsyncComponent(() => import('~/charts/line-charts/dashed-line-chart.vue')),
]

const features = [
  { color: '#6366f1', icon: 'i-lucide-blocks', title: 'Composable API', desc: 'Build charts declaratively — Area, Bar, Line, Scatter, Composed, Pie, Radar, and RadialBar.' },
  { color: '#f59e0b', icon: 'i-lucide-zap', title: 'Vue 3 Native', desc: 'Composition API, reactive state, and JSX rendering.' },
  { color: '#10b981', icon: 'i-lucide-repeat', title: 'Recharts Compatible', desc: 'Same API design — easy migration from React.' },
  { color: '#f472b6', icon: 'i-lucide-sparkles', title: 'Animated', desc: 'Smooth transitions powered by Motion for Vue.' },
  { color: '#38bdf8', icon: 'i-lucide-palette', title: 'Themeable', desc: 'CSS variables and props for full customization.' },
  { color: '#a78bfa', icon: 'i-lucide-file-code', title: 'TypeScript', desc: 'Full type support for props, events, and slots.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <!-- Decorative blobs -->
      <div
        class="hero-blobs"
        aria-hidden="true"
      >
        <div class="blob blob-1" />
        <div class="blob blob-2" />
        <div class="blob blob-3" />
        <div class="blob blob-4" />
        <div class="blob blob-5" />
      </div>

      <!-- Background: Perspective chart grid -->
      <div
        class="hero-bg"
        aria-hidden="true"
      >
        <ClientOnly>
          <div class="chart-grid">
            <div
              v-for="(chart, i) in chartList"
              :key="i"
              class="chart-cell"
              :style="{ animationDelay: `${i * 0.12}s` }"
            >
              <Suspense>
                <component :is="chart" />
                <template #fallback>
                  <div class="chart-cell-skeleton" />
                </template>
              </Suspense>
            </div>
          </div>
        </ClientOnly>
      </div>

      <!-- Frosted overlay -->
      <div class="hero-frost" />

      <!-- Hero content -->
      <div class="hero-content">
        <h1 class="hero-title">
          vccs
        </h1>
        <p class="hero-desc">
          Composable charting components for Vue 3
        </p>
        <p class="hero-sub">
          An unofficial port of <a
            href="https://recharts.org"
            target="_blank"
            rel="noopener"
          >Recharts</a>
        </p>
        <div class="hero-actions">
          <UButton
            size="xl"
            to="/getting-started/introduction"
            trailing-icon="i-lucide-arrow-right"
          >
            Get Started
          </UButton>
          <UButton
            size="xl"
            variant="outline"
            color="neutral"
            icon="i-simple-icons-github"
            to="https://github.com/nicepkg/vccs"
            target="_blank"
          >
            GitHub
          </UButton>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features-section">
      <h2 class="features-heading">
        Build charts with composable components
      </h2>
      <div class="features-grid">
        <div
          v-for="f in features"
          :key="f.title"
          class="feature"
        >
          <div
            class="feature-icon-wrap"
            :style="{ '--accent': f.color }"
          >
            <UIcon
              :name="f.icon"
              class="feature-icon"
            />
          </div>
          <h3 class="feature-name">
            {{ f.title }}
          </h3>
          <p class="feature-desc">
            {{ f.desc }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ─── Hero ─── */
.hero {
  position: relative;
  min-height: calc(100dvh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--ui-bg);
}

/* ─── Decorative blobs ─── */
.hero-blobs {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.45;
  filter: blur(2px);
}

.blob-1 {
  width: 120px;
  height: 120px;
  background: #fbbf24;
  top: 8%;
  left: 6%;
  animation: float-blob 14s ease-in-out infinite;
}

.blob-2 {
  width: 80px;
  height: 80px;
  background: #f472b6;
  top: 12%;
  right: 10%;
  animation: float-blob 11s ease-in-out infinite reverse;
}

.blob-3 {
  width: 60px;
  height: 60px;
  background: #34d399;
  bottom: 18%;
  left: 12%;
  animation: float-blob 16s ease-in-out infinite;
}

.blob-4 {
  width: 90px;
  height: 90px;
  background: #6366f1;
  bottom: 12%;
  right: 8%;
  animation: float-blob 13s ease-in-out infinite reverse;
}

.blob-5 {
  width: 50px;
  height: 50px;
  background: #38bdf8;
  top: 40%;
  left: 3%;
  animation: float-blob 15s ease-in-out infinite;
}

/* Background wrapper */
.hero-bg {
  position: absolute;
  inset: -150px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  perspective-origin: 50% 45%;
}

/* 3x3 chart grid */
.chart-grid {
  display: grid;
  grid-template-columns: repeat(3, 360px);
  gap: 24px;
  transform-style: preserve-3d;
  transform: rotateX(32deg) rotateY(-6deg) translateY(0);
  animation: grid-drift 18s ease-in-out infinite;
  will-change: transform;
  pointer-events: none;
  user-select: none;
}

/* Individual chart card */
.chart-cell {
  height: 250px;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgb(0 0 0 / 0.06);
  background: #fff;
  box-shadow:
    0 1px 3px rgb(0 0 0 / 0.04),
    0 4px 24px rgb(0 0 0 / 0.06);
  opacity: 0;
  animation: cell-enter 0.7s ease-out forwards;
}

.chart-cell-skeleton {
  width: 100%;
  height: 100%;
  background: var(--ui-bg-elevated);
}

/* Frosted overlay */
.hero-frost {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  background: rgb(255 255 255 / 0.5);
}

/* ─── Dark mode ─── */
:global(.dark .hero-bg) {
  display: none;
}

:global(.dark .hero-frost) {
  display: none;
}

:global(.dark .hero-blobs .blob) {
  opacity: 0.2;
  filter: blur(40px);
}

:global(.dark .blob-1) {
  width: 280px;
  height: 280px;
}

:global(.dark .blob-2) {
  width: 200px;
  height: 200px;
}

:global(.dark .blob-3) {
  width: 160px;
  height: 160px;
}

:global(.dark .blob-4) {
  width: 240px;
  height: 240px;
}

:global(.dark .blob-5) {
  width: 140px;
  height: 140px;
}

/* Hero text */
.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
}

.hero-title {
  font-size: clamp(4.5rem, 14vw, 9rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1;
  margin: 0 0 1.25rem;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 40%, #f472b6 70%, #fb923c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

:global(.dark .hero-title) {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 40%, #f9a8d4 70%, #fdba74 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.hero-desc {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: var(--ui-text-muted);
  margin: 0 0 0.5rem;
  line-height: 1.5;
}

.hero-sub {
  font-size: clamp(0.875rem, 1.8vw, 1rem);
  color: var(--ui-text-dimmed);
  margin: 0 0 2.5rem;
}

.hero-sub a {
  color: var(--ui-text-muted);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.15s;
}

.hero-sub a:hover {
  color: var(--ui-text);
}

.hero-actions {
  display: flex;
  gap: 0.875rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ─── Keyframes ─── */
@keyframes grid-drift {
  0%, 15% {
    transform: rotateX(32deg) rotateY(-6deg) translateY(0) translateX(0);
  }
  25%, 40% {
    transform: rotateX(26deg) rotateY(2deg) translateY(-50px) translateX(30px);
  }
  50%, 65% {
    transform: rotateX(30deg) rotateY(-10deg) translateY(-20px) translateX(-25px);
  }
  75%, 90% {
    transform: rotateX(24deg) rotateY(-3deg) translateY(-60px) translateX(10px);
  }
  100% {
    transform: rotateX(32deg) rotateY(-6deg) translateY(0) translateX(0);
  }
}

@keyframes cell-enter {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes float-blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(15px, -20px) scale(1.05);
  }
  50% {
    transform: translate(-10px, 10px) scale(0.95);
  }
  75% {
    transform: translate(20px, 15px) scale(1.08);
  }
}

/* ─── Features ─── */
.features-section {
  max-width: 72rem;
  margin: 0 auto;
  padding: 5rem 2rem 7rem;
}

.features-heading {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 0 0 3rem;
  color: var(--ui-text);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 2.5rem;
}

.feature {
  padding: 1.25rem;
  border-radius: 12px;
  transition: background 0.2s ease;
}

.feature:hover {
  background: var(--ui-bg-elevated);
}

.feature-icon-wrap {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

.feature-icon {
  font-size: 1.25rem;
  color: var(--accent);
}

.feature-name {
  font-size: 1.0625rem;
  font-weight: 600;
  margin: 0 0 0.375rem;
  color: var(--ui-text);
}

.feature-desc {
  font-size: 0.9375rem;
  color: var(--ui-text-muted);
  margin: 0;
  line-height: 1.55;
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .chart-grid {
    grid-template-columns: repeat(3, 280px);
    gap: 18px;
  }
  .chart-cell {
    height: 200px;
  }
}

@media (max-width: 768px) {
  .chart-grid {
    grid-template-columns: repeat(2, 240px);
    gap: 14px;
  }
  .chart-cell {
    height: 180px;
  }
  .hero-bg {
    inset: -100px;
  }
  .features-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .features-heading {
    margin-bottom: 2rem;
  }
  .blob-1 { width: 80px; height: 80px; }
  .blob-2 { width: 50px; height: 50px; }
  .blob-3 { width: 40px; height: 40px; }
  .blob-4 { width: 60px; height: 60px; }
  .blob-5 { width: 35px; height: 35px; }
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  .chart-grid {
    animation: none;
    transform: rotateX(32deg) rotateY(-6deg);
  }
  .chart-cell {
    animation: none;
    opacity: 1;
  }
  .blob {
    animation: none;
  }
}
</style>
