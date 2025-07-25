# Legend Component

Vue 版本的 recharts Legend 组件，用于显示图表的图例。这个组件完全兼容 recharts 的 Legend API，并提供了 Vue 特有的响应式特性。

## 特性

- 🎨 支持多种图标类型（圆形、矩形、线条、菱形、三角形、星形等）
- 📐 灵活的布局选项（水平/垂直）
- 🎯 精确的位置控制（左/中/右，上/中/下）
- 🎭 完全可定制的样式
- 🔧 支持自定义内容组件
- 📊 智能的数据处理和排序
- 🚪 Portal 支持，可渲染到任意 DOM 节点
- ⚡ Vue 3 响应式系统集成

## 基本用法

```vue
<script setup>
import { Bar, BarChart, Legend } from 'vue-charts'

const data = [
  { name: 'A', value: 100 },
  { name: 'B', value: 200 },
  { name: 'C', value: 150 },
]
</script>

<template>
  <div>
    <BarChart
      :data="data"
      width="{400}"
      height="{300}"
    >
      <Bar
        data-key="value"
        fill="#8884d8"
      />
      <Legend />
    </BarChart>
  </div>
</template>
```

## 高级用法

### 多系列图表

```vue
<template>
  <LineChart
    :data="data"
    width="{600}"
    height="{300}"
  >
    <Line
      data-key="desktop"
      stroke="#8884d8"
      name="桌面端"
    />
    <Line
      data-key="mobile"
      stroke="#82ca9d"
      name="移动端"
    />
    <Line
      data-key="tablet"
      stroke="#ffc658"
      name="平板端"
    />
    <Legend
      layout="horizontal"
      align="center"
      vertical-align="bottom"
      icon-type="line"
    />
  </LineChart>
</template>
```

## Props

### layout
- 类型: `'horizontal' | 'vertical'`
- 默认值: `'horizontal'`
- 描述: 图例项的布局方向

### align
- 类型: `'left' | 'center' | 'right'`
- 默认值: `'center'`
- 描述: 图例的水平对齐方式

### verticalAlign
- 类型: `'top' | 'middle' | 'bottom'`
- 默认值: `'middle'`
- 描述: 图例的垂直对齐方式

### iconSize
- 类型: `number`
- 默认值: `14`
- 描述: 图例图标的大小

### iconType
- 类型: `'circle' | 'cross' | 'diamond' | 'line' | 'plainline' | 'rect' | 'square' | 'star' | 'triangle' | 'wye' | 'none'`
- 默认值: `'rect'`
- 描述: 图例图标的类型

### wrapperStyle
- 类型: `CSSProperties`
- 描述: 图例包装器的样式

### contentStyle
- 类型: `CSSProperties`
- 描述: 图例内容的样式

### itemStyle
- 类型: `CSSProperties`
- 描述: 图例项的样式

### content
- 类型: `Component | Function`
- 描述: 自定义图例内容组件

### formatter
- 类型: `(value: string, entry: LegendPayload) => string`
- 描述: 图例项文本的格式化函数

## 事件

### onClick
- 类型: `(data: LegendPayload, index: number) => void`
- 描述: 图例项点击事件

### onMouseEnter
- 类型: `(data: LegendPayload, index: number) => void`
- 描述: 图例项鼠标进入事件

### onMouseLeave
- 类型: `(data: LegendPayload, index: number) => void`
- 描述: 图例项鼠标离开事件

## 自定义图例内容

```vue
<script setup>
import { defineComponent } from 'vue'

const CustomLegendContent = defineComponent({
  props: ['payload'],
  setup(props) {
    return () => (
      <div class="custom-legend">
        {props.payload?.map((entry, index) => (
          <div key={index} style={{ color: entry.color }}>
            {entry.value}
            :
            {entry.payload?.value}
          </div>
        ))}
      </div>
    )
  }
})
</script>

<template>
  <Legend :content="CustomLegendContent" />
</template>
```

## 样式定制

```vue
<template>
  <Legend
    :wrapper-style="{ padding: '10px', backgroundColor: '#f5f5f5' }"
    :item-style="{ marginRight: '20px', fontSize: '14px' }"
    :icon-size="16"
  />
</template>
```

## 支持的图标类型

- `circle`: 圆形
- `rect`: 矩形 (默认)
- `square`: 正方形
- `line`: 线条
- `plainline`: 简单线条
- `diamond`: 菱形
- `triangle`: 三角形
- `star`: 星形
- `cross`: 十字形
- `wye`: Y形
- `none`: 无图标
