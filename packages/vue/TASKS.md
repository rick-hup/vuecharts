# Area 组件 Vue 迁移任务清单

基于 recharts Area 组件的实现结构，制定 Vue 版本 Area 组件的详细开发任务。

## Completed Tasks

- [x] 分析 React 版 Area 组件结构与数据流
- [x] AreaImpl.tsx：实现主渲染逻辑（area path、dots、labels、active points）
- [x] AreaWithState.tsx：负责 Layer/clipPath 包裹、动画切换、调用 RenderArea
- [x] RenderArea.tsx：判断动画/静态渲染，切换 AreaWithAnimation/StaticArea/AreaImpl

## In Progress Tasks

- [ ] Area.tsx：入口组件，props 定义、store 注册、调用 AreaWithState
- [ ] store/selectors/context 依赖对齐
- [ ] props 设计与默认值对齐 React 版

## Future Tasks

- [ ] AreaWithAnimation.tsx：动画渲染支持
- [ ] StaticArea.tsx：静态渲染支持（如需单独抽离）
- [ ] story/demo：补充 storybook 示例
- [ ] 类型细化与优化
- [ ] 兼容性/性能优化

## Implementation Plan

1. 设计 Area 组件 props，确保与 React 版一致
2. 实现 AreaImpl.tsx，负责 area path、dots、labels、active points 渲染
3. 实现 AreaWithState.tsx，负责 Layer/clipPath、动画切换、调用 RenderArea
4. 实现 RenderArea.tsx，判断动画/静态渲染，切换 AreaWithAnimation/StaticArea/AreaImpl
5. Area.tsx 作为入口，注册 legend/tooltip/graphical item，props 透传
6. 对齐 store/selectors/context 依赖
7. （可选）实现 AreaWithAnimation/StaticArea 支持动画/静态切换
8. story/demo、类型细化、优化

### Relevant Files

- src/cartesian/area/AreaImpl.tsx - Area 主渲染逻辑
- src/cartesian/area/AreaWithState.tsx - Layer/clipPath/动画切换
- src/cartesian/area/RenderArea.tsx - 动画/静态渲染切换
- src/cartesian/area/Area.tsx - Area 组件入口
- src/cartesian/area/AreaWithAnimation.tsx - 动画渲染（可选）
- src/cartesian/area/StaticArea.tsx - 静态渲染（可选）
- src/components/Text.vue - 通用 SVG 文本组件
- src/container/Layer.vue - SVG 分层容器
- src/cartesian/GraphicalItemClipPath.vue - SVG 裁剪路径
- src/cartesian/useNeedsClip.ts - 裁剪判定逻辑
- src/state/selectors/areaSelectors.ts - area 数据 selector
- src/context/chartLayoutContext.ts - 布局 context
- src/state/selectors/selectors.ts - chartName selector 
