# Bar Charts Playground Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement 10 shadcn-style Bar Chart demos in playground/nuxt to verify vccs bar chart functionality.

**Architecture:** Each chart variant is a standalone SFC in `playground/nuxt/app/pages/bar-charts/` directory, composed into a parent `bar-charts.vue` page. Index page updated with Bar Chart navigation entry. All charts use shadcn Card layout (header/content/footer with trend indicator).

**Tech Stack:** Nuxt 3, vccs (Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend), shadcn-vue Card components, lucide-vue-next (TrendingUp), Tailwind CSS v4.

---

### Task 1: Update index.vue navigation

**Files:**
- Modify: `playground/nuxt/app/pages/index.vue`

Add Bar Chart entry to routes array. Restyle with shadcn Card components + Tailwind (remove inline CSS).

---

### Task 2: Create bar-charts.vue page with 10 chart sections

**Files:**
- Create: `playground/nuxt/app/pages/bar-charts.vue`

Single page file containing all 10 bar chart demos, each wrapped in a shadcn Card. Charts inline in one file for simplicity.

**10 variants:**

1. **Bar Chart** - single series, radius corners
2. **Bar Chart - Horizontal** - layout="vertical"
3. **Bar Chart - Multiple** - two series side by side (desktop/mobile)
4. **Bar Chart - Stacked + Legend** - stackId + Legend component
5. **Bar Chart - Label** - Bar label prop with position
6. **Bar Chart - Custom Label** - Bar label prop with custom render via slot
7. **Bar Chart - Mixed** - each bar different color via Cell/data fill
8. **Bar Chart - Active** - hover highlight with activeBar
9. **Bar Chart - Negative** - negative values with conditional fill colors
10. **Bar Chart - Interactive** - toggle buttons switching Desktop/Mobile with computed totals

**Data:** 6-month visitor data (Jan-Jun 2024), consistent with shadcn demos.

---

### Task 3: Verify and fix

Run `pnpm play`, check all 10 charts render correctly, fix any issues.
