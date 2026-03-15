# Changelog

All notable changes to this project will be documented in this file.

## 2f907344390b0dc2b4a569ed748f7192215c21bc...v0.1.0

[compare changes](https://github.com/rick-hup/vuecharts/compare/2f907344390b0dc2b4a569ed748f7192215c21bc...v0.1.0)

### 🚀 Enhancements

- Add Label and LabelList components for enhanced labeling in Area chart ([801cc4f](https://github.com/rick-hup/vuecharts/commit/801cc4f))
- Introduce Brush component with state management and synchronization features ([bc6bbac](https://github.com/rick-hup/vuecharts/commit/bc6bbac))
- Add Nuxt playground with initial configuration and dependencies ([a6ddeef](https://github.com/rick-hup/vuecharts/commit/a6ddeef))
- Add Animate component for animations and integrate it into BarRectangles ([b4f2373](https://github.com/rick-hup/vuecharts/commit/b4f2373))
- Enhance Animate component with onUpdate callback and integrate into ClipRect for animation control ([c6735c7](https://github.com/rick-hup/vuecharts/commit/c6735c7))
- Add animation components and utilities section to documentation; update ClipRect to streamline animation handling ([ea84895](https://github.com/rick-hup/vuecharts/commit/ea84895))
- Refactor Area component to support animation with StaticArea and ClipRect; remove RenderArea component ([7af48c2](https://github.com/rick-hup/vuecharts/commit/7af48c2))
- Add animation completion handling to Area and ClipRect components ([52d69d0](https://github.com/rick-hup/vuecharts/commit/52d69d0))
- Add animation properties to Bar component and enhance BarRectangles for improved interaction handling ([d28c212](https://github.com/rick-hup/vuecharts/commit/d28c212))
- Introduce LineChart component and related line functionalities, including ActivePoints and StaticLine for enhanced line rendering ([fa98d8f](https://github.com/rick-hup/vuecharts/commit/fa98d8f))
- Enhance Bar component and Storybook stories for interactive behavior ([5f9006d](https://github.com/rick-hup/vuecharts/commit/5f9006d))
- Enhance Tooltip and Bar components with improved rendering and interaction ([61961e6](https://github.com/rick-hup/vuecharts/commit/61961e6))
- Implement ErrorBar component with context for error visualization in charts ([8cec8f5](https://github.com/rick-hup/vuecharts/commit/8cec8f5))
- Update Bar component to support ErrorBar context and enhance Storybook stories ([8544845](https://github.com/rick-hup/vuecharts/commit/8544845))
- Enhance Storybook BarChart stories ([ee64f7d](https://github.com/rick-hup/vuecharts/commit/ee64f7d))
- Enhance Tooltip component with chart-specific cursor rendering and shared prop functionality ([be1e449](https://github.com/rick-hup/vuecharts/commit/be1e449))
- Refactor Brush component with resize-aware position recalculation ([e5f0aef](https://github.com/rick-hup/vuecharts/commit/e5f0aef))
- Add Panorama support to Brush and fix Slide fill-opacity ([281c89b](https://github.com/rick-hup/vuecharts/commit/281c89b))
- Add StackedWithBrush Storybook story for BarChart ([453cffe](https://github.com/rick-hup/vuecharts/commit/453cffe))
- Add Bar label prop with LabelList and fix label z-index via Teleport ([f622854](https://github.com/rick-hup/vuecharts/commit/f622854))
- Add NoPadding Storybook story and support object background prop on Bar ([9e0175b](https://github.com/rick-hup/vuecharts/commit/9e0175b))
- Add WithMinPointSize and OneDataPointPercentSize stories, remove Bar default fill ([ab26538](https://github.com/rick-hup/vuecharts/commit/ab26538))
- Add RangedBarChart story and fix Bar tooltip color to use fill ([ec70c5a](https://github.com/rick-hup/vuecharts/commit/ec70c5a))
- Add CustomCursorBarChart story with SVG layer z-ordering system ([e4e5565](https://github.com/rick-hup/vuecharts/commit/e4e5565))
- Add ChangingDataKey story and fix Bar label visibility during animation ([a109279](https://github.com/rick-hup/vuecharts/commit/a109279))
- Add ChangingDataKeyAndStacked and ChangingData stories, fix Animate transition merging ([0e3986c](https://github.com/rick-hup/vuecharts/commit/0e3986c))
- Add VerticalWithLabelLists story and fix LabelList slot-based data flow ([e461b24](https://github.com/rick-hup/vuecharts/commit/e461b24))
- Add parentViewBox to BarRectangleItem for label text wrapping ([53489f2](https://github.com/rick-hup/vuecharts/commit/53489f2))
- Add WithAbsolutePositionAndFlexboxParents ChartLayout story ([04a787c](https://github.com/rick-hup/vuecharts/commit/04a787c))
- Add AreaChartWithAccessibilityLayer story ([479f048](https://github.com/rick-hup/vuecharts/commit/479f048))
- Add ComposedChart and AccessibilityLayer story ([54e8614](https://github.com/rick-hup/vuecharts/commit/54e8614))
- Add AccessibleWithButton story to ComposedChart ([6935083](https://github.com/rick-hup/vuecharts/commit/6935083))
- Add BoxPlotChart story and Bar shape prop ([e655f75](https://github.com/rick-hup/vuecharts/commit/e655f75))
- Add ZAxis, Scatter, and Symbols components ([f29b2e1](https://github.com/rick-hup/vuecharts/commit/f29b2e1))
- Add animation support to Scatter component ([d8a4b41](https://github.com/rick-hup/vuecharts/commit/d8a4b41))
- Fix Line dots fill, add interval prop to axes, and add EquidistantPreserveEnd story ([64b3533](https://github.com/rick-hup/vuecharts/commit/64b3533))
- Fix Line dots fill, add interval prop to axes, and add EquidistantPreserveEnd story" ([317a260](https://github.com/rick-hup/vuecharts/commit/317a260))
- Fix Line dots fill, add interval prop to axes, and add EquidistantPreserveEnd story ([18926f0](https://github.com/rick-hup/vuecharts/commit/18926f0))
- Add Bar isAnimating tracking, fix stale coordinate interpolation, and add ChangingDataKey story ([26cf285](https://github.com/rick-hup/vuecharts/commit/26cf285))
- Add DualLineChart story with time-based X axis ([0bd27f5](https://github.com/rick-hup/vuecharts/commit/0bd27f5))
- Add LineChart and ScatterChart Storybook stories ([b02fa8a](https://github.com/rick-hup/vuecharts/commit/b02fa8a))
- Add LogarithmicYAxis story with symlog scale support ([9f02e90](https://github.com/rick-hup/vuecharts/commit/9f02e90))
- Add ReferenceLine, ReferenceArea, label/tick slots, and fix dashed line animation ([f1dee62](https://github.com/rick-hup/vuecharts/commit/f1dee62))
- Add Sector shape component for pie chart arcs ([f1def12](https://github.com/rick-hup/vuecharts/commit/f1def12))
- Add SetPolarGraphicalItem and replacePolarGraphicalItem ([057d8da](https://github.com/rick-hup/vuecharts/commit/057d8da))
- Implement computePieSectors and complete pie selectors ([ad489d2](https://github.com/rick-hup/vuecharts/commit/ad489d2))
- Add Pie component and PieChart container ([792403f](https://github.com/rick-hup/vuecharts/commit/792403f))
- Export PieChart and Pie from package index ([d4409a8](https://github.com/rick-hup/vuecharts/commit/d4409a8))
- Add getRelativeCoordinate mouse coordinate utility ([55bc6fa](https://github.com/rick-hup/vuecharts/commit/55bc6fa))
- Add DraggablePie storybook story with interactive drag ([27ff507](https://github.com/rick-hup/vuecharts/commit/27ff507))
- Add label rendering to Pie component ([7d229c2](https://github.com/rick-hup/vuecharts/commit/7d229c2))
- Add label line and fix label rendering to match Recharts ([4507b8b](https://github.com/rick-hup/vuecharts/commit/4507b8b))
- Add CustomActiveShapePieChart story with shape slot and activeIndex prop ([9bad5bb](https://github.com/rick-hup/vuecharts/commit/9bad5bb))
- Add Pie entrance animation and fix sector stroke gaps ([6f3c449](https://github.com/rick-hup/vuecharts/commit/6f3c449))
- Add PieColorSync story demonstrating per-sector fill via shape slot ([dafda39](https://github.com/rick-hup/vuecharts/commit/dafda39))
- Add PieWithLegend story with ResponsiveContainer and Legend ([412e6e2](https://github.com/rick-hup/vuecharts/commit/412e6e2))
- Add PieWithStep story and support outerRadius function callback ([7d56669](https://github.com/rick-hup/vuecharts/commit/7d56669))
- Implement RadarChart with Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis components ([565e84b](https://github.com/rick-hup/vuecharts/commit/565e84b))
- Add animation to Radar component ([8001117](https://github.com/rick-hup/vuecharts/commit/8001117))
- Add active dot to Radar on tooltip hover ([dcdc0e3](https://github.com/rick-hup/vuecharts/commit/dcdc0e3))
- Add RadialBar component with radial cursor support ([b49b456](https://github.com/rick-hup/vuecharts/commit/b49b456))
- Register ErrorBar in Redux for axis domain extension, add ScatterChart Cross cursor, fix tooltip sync for item-based charts ([d9daae1](https://github.com/rick-hup/vuecharts/commit/d9daae1))
- Add Tooltip stories, enable RadialBar item-level tooltip interaction ([1e13fd8](https://github.com/rick-hup/vuecharts/commit/1e13fd8))
- Add docs site with Nuxt 3, Tailwind CSS 4, shadcn-nuxt ([88003f3](https://github.com/rick-hup/vuecharts/commit/88003f3))
- Migrate docs to content-driven architecture with fumadocs-style layout ([02e359b](https://github.com/rick-hup/vuecharts/commit/02e359b))
- **docs:** Add lucide icons to sidebar menu items ([e827cc3](https://github.com/rick-hup/vuecharts/commit/e827cc3))
- **playground:** Add 10 shadcn-style bar chart demos ([dc8cef3](https://github.com/rick-hup/vuecharts/commit/dc8cef3))
- **playground:** Add shadcn chart wrapper components and integrate ChartConfig ([98309b6](https://github.com/rick-hup/vuecharts/commit/98309b6))
- **playground:** Add layout, dark mode, and normalize design to shadcn tokens ([f333494](https://github.com/rick-hup/vuecharts/commit/f333494))
- **tooltip:** Add typed #content slot and fix indicator color in Tailwind v4 ([8adc302](https://github.com/rick-hup/vuecharts/commit/8adc302))
- **bar:** Add Cell component, activeIndex/activeBar slot, and per-entry fill ([21d6a8b](https://github.com/rick-hup/vuecharts/commit/21d6a8b))
- **playground:** Support icon indicator in ChartTooltipContent ([6c77f75](https://github.com/rick-hup/vuecharts/commit/6c77f75))
- Export Dot component from vccs public API ([d4e75c6](https://github.com/rick-hup/vuecharts/commit/d4e75c6))
- **playground:** Add 10 line chart demos and extract area chart SFCs ([93f8b20](https://github.com/rick-hup/vuecharts/commit/93f8b20))
- **playground:** Add 10 pie chart demos and refactor Pie component ([a7faecf](https://github.com/rick-hup/vuecharts/commit/a7faecf))
- **playground:** Add 11 radar chart demos and enhance polar components ([0ea5fe9](https://github.com/rick-hup/vuecharts/commit/0ea5fe9))
- **radial-bar:** Add radial chart demos and fix rendering ([929e13a](https://github.com/rick-hup/vuecharts/commit/929e13a))
- **playground:** Add 9 tooltip chart demos, fix radial-bar labels, and apply blue theme ([039a2a9](https://github.com/rick-hup/vuecharts/commit/039a2a9))
- **docs:** Lazy-load chart demos with Shiki syntax highlighting ([d2026f2](https://github.com/rick-hup/vuecharts/commit/d2026f2))
- **docs:** Add 14 new chart demos across all chart types ([0210928](https://github.com/rick-hup/vuecharts/commit/0210928))
- **docs:** Enhance documentation and add new chart types ([5afc0e9](https://github.com/rick-hup/vuecharts/commit/5afc0e9))
- **docs:** Fix featured chart flicker and add staggered hero animation ([8b125c0](https://github.com/rick-hup/vuecharts/commit/8b125c0))
- **docs:** Add ChartTooltipContent and disable cursor on all chart demos ([b72c369](https://github.com/rick-hup/vuecharts/commit/b72c369))
- **docs:** Add 2D grid background with X+Y spring-animated category panning ([cefa6a7](https://github.com/rick-hup/vuecharts/commit/cefa6a7))
- **docs:** Replace category chevron with Lucide icon and layoutId shared animation ([389f52c](https://github.com/rick-hup/vuecharts/commit/389f52c))
- **docs:** Switch UI theme to emerald and fix ClientOnly SSR wrapper ([2fa09cd](https://github.com/rick-hup/vuecharts/commit/2fa09cd))
- **docs:** Add interactive DotGrid canvas background with spring physics ([2647f5a](https://github.com/rick-hup/vuecharts/commit/2647f5a))
- **docs:** Update README ([5fc6443](https://github.com/rick-hup/vuecharts/commit/5fc6443))
- Add new skill source and refactor Sector component ([10542f8](https://github.com/rick-hup/vuecharts/commit/10542f8))

### 🩹 Fixes

- Clean up unused console logs, update active dot rendering in tests ([910a406](https://github.com/rick-hup/vuecharts/commit/910a406))
- Set default values for xAxisId and yAxisId props across components ([7fe1342](https://github.com/rick-hup/vuecharts/commit/7fe1342))
- Simplify label prop type in AreaVueProps and enhance AreaChart tests ([962810c](https://github.com/rick-hup/vuecharts/commit/962810c))
- Add points prop to Dots component and update usage in StaticArea ([c26d5b3](https://github.com/rick-hup/vuecharts/commit/c26d5b3))
- Update clipPathId format and improve AreaChart tests with context hooks ([6143ada](https://github.com/rick-hup/vuecharts/commit/6143ada))
- Add .env to .gitignore, refactor Bar component to use RenderBar, and improve data handling in BarBackground and BarRectangles ([81bd93c](https://github.com/rick-hup/vuecharts/commit/81bd93c))
- Clean up tsconfig and Vite config includes/excludes; adjust YAxis settings type ([3656d1f](https://github.com/rick-hup/vuecharts/commit/3656d1f))
- Use SVG path element in Rectangle to support negative width/height ([b1def61](https://github.com/rick-hup/vuecharts/commit/b1def61))
- Smooth Bar animation during Brush drag ([cdb1ce3](https://github.com/rick-hup/vuecharts/commit/cdb1ce3))
- Stacked bar initial animation grows from shared baseline ([b2d18f0](https://github.com/rick-hup/vuecharts/commit/b2d18f0))
- Align BoxPlot story data and margin with React Recharts ([f418214](https://github.com/rick-hup/vuecharts/commit/f418214))
- Fix ComposedChart with Bars rendering empty by correcting selectHasBar and axis dataKey defaults ([d63681d](https://github.com/rick-hup/vuecharts/commit/d63681d))
- Respect isAnimationActive and pass label slot correctly in StaticLine ([7c0e4d2](https://github.com/rick-hup/vuecharts/commit/7c0e4d2))
- Forward event handler attrs to RechartsWrapper in chart factory ([0f419e4](https://github.com/rick-hup/vuecharts/commit/0f419e4))
- Line clipping, animation chase, slot reactivity, and reference area zoom ([472d1f4](https://github.com/rick-hup/vuecharts/commit/472d1f4))
- Line animation not recovering after resize during in-flight animation ([0d54768](https://github.com/rick-hup/vuecharts/commit/0d54768))
- Simplify legend default content to match React's structure ([777378e](https://github.com/rick-hup/vuecharts/commit/777378e))
- Render axis label in CartesianAxis and pass angle to Label Text ([3c709c6](https://github.com/rick-hup/vuecharts/commit/3c709c6))
- Apply label style as CSS inline styles instead of SVG attributes ([e8125a6](https://github.com/rick-hup/vuecharts/commit/e8125a6))
- Missing findEntryInArray import, legend icon shapes, and story fix ([f70ae51](https://github.com/rick-hup/vuecharts/commit/f70ae51))
- Skip legend entries with type 'none' in default content ([3e99cc6](https://github.com/rick-hup/vuecharts/commit/3e99cc6))
- Text dx/dy props, tooltip domain validation, and story layout ([2e6553d](https://github.com/rick-hup/vuecharts/commit/2e6553d))
- Export Sector from barrel and add outerRadius < innerRadius guard ([181230f](https://github.com/rick-hup/vuecharts/commit/181230f))
- Stable EMPTY_CELLS constant and clean up optional chaining in pieSelectors ([7415cfb](https://github.com/rick-hup/vuecharts/commit/7415cfb))
- Pie data sync, remove as any, add defineComponent generic ([39971b6](https://github.com/rick-hup/vuecharts/commit/39971b6))
- PascalCase event handlers and correct handler signatures in DraggablePie story ([f69eee6](https://github.com/rick-hup/vuecharts/commit/f69eee6))
- Decompose Pie sectors selector to support reactive prop changes ([5b8dc7f](https://github.com/rick-hup/vuecharts/commit/5b8dc7f))
- Make externalEventsMiddleware synchronous to preserve e.currentTarget ([b1f797d](https://github.com/rick-hup/vuecharts/commit/b1f797d))
- Use inline style width as coordinate space reference for flex-shrunk elements ([15971c3](https://github.com/rick-hup/vuecharts/commit/15971c3))
- Use SVG getScreenCTM for coordinate mapping to handle preserveAspectRatio letterboxing ([8336615](https://github.com/rick-hup/vuecharts/commit/8336615))
- Match Recharts chain-sweep animation for Pie sectors ([88ad67e](https://github.com/rick-hup/vuecharts/commit/88ad67e))
- Implement selectPieLegend and dispatch legend payload from Pie component ([b64e0b5](https://github.com/rick-hup/vuecharts/commit/b64e0b5))
- Dispatch tooltip item interaction from Pie sectors on hover ([9312338](https://github.com/rick-hup/vuecharts/commit/9312338))
- Remove hardcoded font-size=12 from Pie labels to match Recharts default ([a4f643e](https://github.com/rick-hup/vuecharts/commit/a4f643e))
- Dispatch polarOptions via ReportPolarOptions to enable RadarChart rendering ([887c3ff](https://github.com/rick-hup/vuecharts/commit/887c3ff))
- Add PolarGrid to RadarWithChangingDataKey story and align with Recharts reference ([a29e755](https://github.com/rick-hup/vuecharts/commit/a29e755))
- Repeat first point in polygon path to fix range Radar fill for negative baselines ([c0b9efe](https://github.com/rick-hup/vuecharts/commit/c0b9efe))
- Teleport Radar dots and active dot to graphical layer ([e39d8b6](https://github.com/rick-hup/vuecharts/commit/e39d8b6))
- Remove Teleport from inside Animate slot to prevent error on data key switch ([23fc951](https://github.com/rick-hup/vuecharts/commit/23fc951))
- Fix Radar proxy freeze on dataKey switch, add label support, match Recharts axis styling ([6503861](https://github.com/rick-hup/vuecharts/commit/6503861))
- Use correct fill/stroke for Radar regular dots to match Recharts ([ed42e47](https://github.com/rick-hup/vuecharts/commit/ed42e47))
- Pass dataKey prop through PolarRadiusAxis to Redux store ([8b839e1](https://github.com/rick-hup/vuecharts/commit/8b839e1))
- Remove incorrect polar scale type overrides so PolarRadiusAxis type=number works in radial layout ([2004779](https://github.com/rick-hup/vuecharts/commit/2004779))
- Resolve ResponsiveContainer not passing width/height to chart children ([d382e9b](https://github.com/rick-hup/vuecharts/commit/d382e9b))
- Add missing prop declarations for XAxis, YAxis, and CartesianGrid ([8470203](https://github.com/rick-hup/vuecharts/commit/8470203))
- Rename cursor class to v-charts prefix and fix tooltip slot props ([542f9f7](https://github.com/rick-hup/vuecharts/commit/542f9f7))
- Teleport Line and Area into graphical layer for correct cursor z-ordering ([68ded8b](https://github.com/rick-hup/vuecharts/commit/68ded8b))
- **radial-bar:** Fix bar thickness, stacked overlap, and corner radius ([946be1c](https://github.com/rick-hup/vuecharts/commit/946be1c))
- **docs:** Eliminate extra line gaps in Shiki code blocks ([2eb317f](https://github.com/rick-hup/vuecharts/commit/2eb317f))
- **docs:** Fix Shiki dark mode in code blocks ([56ee18e](https://github.com/rick-hup/vuecharts/commit/56ee18e))
- Resolve test failures across Legend, Tooltip, XAxis, Line, Animate and fix mouse event middleware ([a6a1224](https://github.com/rick-hup/vuecharts/commit/a6a1224))
- **docs:** Use full 100vh for hero to prevent showcase charts bleeding into first screen ([de3ff39](https://github.com/rick-hup/vuecharts/commit/de3ff39))
- V0.1.0 release prep — fix build config, click bug, exports, and metadata ([d10b03c](https://github.com/rick-hup/vuecharts/commit/d10b03c))
- Fix Legend indentation and correct legend import path in test ([c63f675](https://github.com/rick-hup/vuecharts/commit/c63f675))
- Resolve all TypeScript build errors with proper type fixes ([c39ea70](https://github.com/rick-hup/vuecharts/commit/c39ea70))
- Accessibility hardening and code review fixes ([b5a92c2](https://github.com/rick-hup/vuecharts/commit/b5a92c2))
- Animation cleanup, reduced-motion support, and dead code removal ([1a3b1c7](https://github.com/rick-hup/vuecharts/commit/1a3b1c7))

### 💅 Refactors

- Remove default values for xAxisId and yAxisId props, clean up console logs ([33408da](https://github.com/rick-hup/vuecharts/commit/33408da))
- Streamline x-axis coordinate calculation and remove default dataKey prop ([4b12aeb](https://github.com/rick-hup/vuecharts/commit/4b12aeb))
- Remove console log from ActivePoints, add isWellBehavedNumber check in ClipRect ([e0c5554](https://github.com/rick-hup/vuecharts/commit/e0c5554))
- Remove unused LabelList import from Area, update label handling in RenderArea ([4ced09e](https://github.com/rick-hup/vuecharts/commit/4ced09e))
- Remove TASKS.md, update isAnimating logic and improve empty data handling in AreaChart tests ([99a3bb3](https://github.com/rick-hup/vuecharts/commit/99a3bb3))
- Remove RenderBar component, integrate BarBackground and BarRectangles directly into Bar, and enhance clipping functionality ([c361423](https://github.com/rick-hup/vuecharts/commit/c361423))
- Streamline animation handling in Area and ClipRect components; integrate isClipRectAnimating state ([9cdf1ab](https://github.com/rick-hup/vuecharts/commit/9cdf1ab))
- Migrate Bar shape from prop to slot ([f1e6a3e](https://github.com/rick-hup/vuecharts/commit/f1e6a3e))
- **docs:** Simplify docs UI and remove zh locale ([12f6a8d](https://github.com/rick-hup/vuecharts/commit/12f6a8d))
- **playground:** Extract bar chart demos into individual SFC components ([14c1bc9](https://github.com/rick-hup/vuecharts/commit/14c1bc9))
- **playground:** Update bar chart demos to match shadcn/ui source ([8da50b2](https://github.com/rick-hup/vuecharts/commit/8da50b2))
- **playground:** Extract bar chart demos into individual SFC components ([bc195bf](https://github.com/rick-hup/vuecharts/commit/bc195bf))
- **docs:** Migrate docs site to Docus and simplify CLAUDE.md ([3b3f13b](https://github.com/rick-hup/vuecharts/commit/3b3f13b))
- Replace packages/vue/README.md with symlink to root README ([c91985c](https://github.com/rick-hup/vuecharts/commit/c91985c))
- Replace motion.div with imperative animate() in TooltipBoundingBox ([8717fad](https://github.com/rick-hup/vuecharts/commit/8717fad))
- Drop CJS build, upgrade to Vite 8 with Rolldown, auto-externalize deps ([3035ae1](https://github.com/rick-hup/vuecharts/commit/3035ae1))

### 📖 Documentation

- Update README ([4d832a4](https://github.com/rick-hup/vuecharts/commit/4d832a4))
- Update CLAUDE.md with BoxPlot story and shape prop patterns ([b46f0e7](https://github.com/rick-hup/vuecharts/commit/b46f0e7))
- Update CLAUDE.md with BoxPlot story and shape prop details ([ef750f4](https://github.com/rick-hup/vuecharts/commit/ef750f4))
- Update CLAUDE.md with axis prop defaults pattern and fix BoxPlot story indentation ([5d43e31](https://github.com/rick-hup/vuecharts/commit/5d43e31))
- Update CLAUDE.md with Scatter animation and architecture details ([722a608](https://github.com/rick-hup/vuecharts/commit/722a608))
- Update CLAUDE.md with LineChart and ScatterChart story details ([832c88e](https://github.com/rick-hup/vuecharts/commit/832c88e))
- Update CLAUDE.md with polar/pie architecture and middleware notes ([40fbbc7](https://github.com/rick-hup/vuecharts/commit/40fbbc7))
- Update CLAUDE.md with Pie tooltip/legend details and wrap PieColorSync in ResponsiveContainer ([4f300a5](https://github.com/rick-hup/vuecharts/commit/4f300a5))
- Update CLAUDE.md with line chart, area chart, and teleport docs ([070e350](https://github.com/rick-hup/vuecharts/commit/070e350))
- Update CLAUDE.md with ChartDemo lazy-loading details and improve installation guide ([fd68681](https://github.com/rick-hup/vuecharts/commit/fd68681))

### 🏡 Chore

- Remove global CSS for storybook, add TypeScript definitions for JSX, and create AreaChart stories and API documentation. ([818f382](https://github.com/rick-hup/vuecharts/commit/818f382))
- Add responsive container, area chart component, and related tests ([a68653c](https://github.com/rick-hup/vuecharts/commit/a68653c))
- Update test scripts, enhance ActivePoints component with slots, and clean up tsconfig ([17702f6](https://github.com/rick-hup/vuecharts/commit/17702f6))
- Add dev script and remove unused dependencies (animejs, pinia) ([95b6e81](https://github.com/rick-hup/vuecharts/commit/95b6e81))
- Update tsconfig for composite builds, adjust Vite config, and clean up unused code in various components ([043d21a](https://github.com/rick-hup/vuecharts/commit/043d21a))
- Refine tsconfig settings, enhance Vite config, and clean up unused storybook files ([2d47224](https://github.com/rick-hup/vuecharts/commit/2d47224))
- Update pnpm-lock.yaml with lightningcss and add new AreaChart and BarChart story files ([cc28061](https://github.com/rick-hup/vuecharts/commit/cc28061))
- Add project documentation files ([6dcaca6](https://github.com/rick-hup/vuecharts/commit/6dcaca6))
- Remove outdated architecture, ([c9769cb](https://github.com/rick-hup/vuecharts/commit/c9769cb))
- Gitignore docs generated files (.data, test-results) ([05d82ee](https://github.com/rick-hup/vuecharts/commit/05d82ee))
- Remove tracked docs/.nuxt files (already in .gitignore) ([9a068cd](https://github.com/rick-hup/vuecharts/commit/9a068cd))
- **package:** Update version from 0.0.1 to 0.1.0 in package.json ([e2e0b69](https://github.com/rick-hup/vuecharts/commit/e2e0b69))
- Remove debug-legend.spec.tsx debug file ([f4eb64a](https://github.com/rick-hup/vuecharts/commit/f4eb64a))

### ✅ Tests

- Add unit tests for BarChart component to verify rendering and background bar functionality ([72bdbda](https://github.com/rick-hup/vuecharts/commit/72bdbda))
- **bar:** Add comprehensive BarChart test suite and expand Storybook stories ([5c9c111](https://github.com/rick-hup/vuecharts/commit/5c9c111))

### 🤖 CI

- Add GitHub Actions workflow to run tests on PRs ([559d7be](https://github.com/rick-hup/vuecharts/commit/559d7be))

### ❤️ Contributors

- Persephone Flores ([@rick-hup](https://github.com/rick-hup))

## v0.1.0...v0.1.0

[compare changes](https://github.com/rick-hup/vuecharts/compare/v0.1.0...v0.1.0)

## [0.1.0] - 2025-03-14

### Added

- Initial release of vccs — Vue 3 port of Recharts
- **Chart types**: AreaChart, BarChart, LineChart, ScatterChart, ComposedChart, PieChart, RadarChart, RadialBarChart
- **Cartesian components**: XAxis, YAxis, ZAxis, CartesianGrid, ReferenceLine, ReferenceArea, ErrorBar, Brush
- **Polar components**: PolarGrid, PolarAngleAxis, PolarRadiusAxis
- **General components**: Tooltip, Legend, Label, LabelList, Cell, ResponsiveContainer
- **Shape components**: Rectangle, Dot, Sector, Symbols, Cross, Curve
- State management via Redux Toolkit with `@reduxjs/vue-redux`
- Smooth animations powered by motion-v
- Full TypeScript support
- ESM and CJS dual output

### Not Yet Supported

- FunnelChart / Funnel
- Treemap
- Sankey
- SunburstChart
