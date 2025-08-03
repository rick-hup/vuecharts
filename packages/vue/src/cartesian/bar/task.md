# Bar Component Implementation Tasks

## Directory Structure
```
bar/
├── Bar.tsx              # Main entry component
├── RenderBar.tsx        # Core rendering logic
├── ActiveBars.tsx       # Active state handling
├── ClipRect.tsx         # Clipping functionality
├── hooks/
│   ├── useBar.ts        # Bar specific hooks
│   └── useSetupData.ts  # Data preparation
├── index.ts            # Public exports
├── type.ts            # Type definitions
└── utils.ts           # Utility functions
```

## Implementation Tasks

### 1. Type Definitions (type.ts)
- [ ] Port BarProps interface
- [ ] Port BarRectangleItem interface
- [ ] Port BarSettings type
- [ ] Port BarMouseEvent type
- [ ] Define internal types for Redux state

### 2. Core Bar Component (Bar.tsx)
- [ ] Implement Bar component using Vue 3 + TSX
- [ ] Setup props validation
- [ ] Integrate with Redux store
- [ ] Setup event dispatching
- [ ] Implement render logic

### 3. Rendering Logic (RenderBar.tsx)
- [ ] Port bar rectangles rendering
- [ ] Port background rendering
- [ ] Implement clipping functionality
- [ ] Setup animation system
- [ ] Handle layout modes (horizontal/vertical)

### 4. Active State (ActiveBars.tsx)
- [ ] Implement active state with Redux
- [ ] Handle mouse interactions
- [ ] Manage tooltip integration via Redux
- [ ] Setup hover effects

### 5. Data Processing (hooks/useSetupData.ts)
- [ ] Process input data
- [ ] Handle stacking logic
- [ ] Calculate bar positions
- [ ] Process min/max values
- [ ] Handle data updates via Redux

### 6. Bar Specific Logic (hooks/useBar.ts)
- [ ] Implement bar size calculations
- [ ] Handle bar positioning
- [ ] Connect to Redux store
- [ ] Setup animation hooks
- [ ] Handle layout changes

### 7. Utilities (utils.ts)
- [ ] Port bar calculation helpers
- [ ] Add coordinate transformation utils
- [ ] Setup animation helpers
- [ ] Add type guards and validators

### 8. Redux Integration
- [ ] Use existing Redux store
- [ ] Integrate with tooltip slice
- [ ] Connect with chart data slice
- [ ] Handle bar-specific state
- [ ] Setup proper action dispatching

## Key Implementation Points

1. **State Management**
   - Use existing Redux store
   - Leverage existing selectors and actions
   - Maintain consistency with other components

2. **Event Handling**
   - Use existing event middleware
   - Maintain tooltip synchronization
   - Keep consistent event flow

3. **Animation**
   - Port existing animation logic
   - Handle SSR considerations
   - Maintain performance optimizations

4. **Rendering**
   - Use Vue's template/TSX syntax
   - Keep Redux state flow
   - Maintain existing optimizations

## Migration Notes

1. Keep Redux state management intact
2. Convert React class components to Vue setup function while maintaining Redux connection
3. Use existing Redux middleware and actions
4. Convert JSX syntax to Vue TSX
5. Maintain existing performance optimizations
6. Keep consistent with Area component structure
