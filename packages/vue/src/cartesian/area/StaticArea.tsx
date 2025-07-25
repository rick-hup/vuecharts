import type { PropType } from 'vue'
import { Fragment, defineComponent } from 'vue'
import type { AreaPointItem } from '@/state/selectors/areaSelectors'
import { Layer } from '@/container/Layer'

// This should match the props shape used in AreaImpl/Area. Unify if needed.
type InternalProps = {
  layout?: string
  type?: string
  stroke?: string
  connectNulls?: boolean
  isRange?: boolean
  baseLine?: any
  // ...其它字段
}

// Minimal StaticArea implementation for use in RenderArea
export default defineComponent({
  name: 'StaticArea',
  props: {
    points: { type: Array as PropType<AreaPointItem[]>, default: () => [] },
    baseLine: { type: [Array, Number], required: true },
    needClip: { type: Boolean, required: true },
    clipPathId: { type: String, required: true },
    props: Object as () => InternalProps,
    showLabels: Boolean,
  },
  setup({ points, baseLine, needClip, clipPathId, props, showLabels }) {
    // 解构 props
    const { layout, type, stroke, connectNulls, isRange, ...others } = props

    return () => (
      <Fragment>
        {points.length > 1 && (
          <Layer clipPath={needClip ? `url(#clipPath-${clipPathId})` : null}>
            {/* <Curve
              {...filterProps(others, true)}
              points={points}
              connectNulls={connectNulls}
              type={type}
              baseLine={baseLine}
              layout={layout}
              stroke="none"
              class="recharts-area-area"
            />
            {stroke !== 'none' && (
              <Curve
                {...filterProps(props, false)}
                class="recharts-area-curve"
                layout={layout}
                type={type}
                connectNulls={connectNulls}
                fill="none"
                points={points}
              />
            )}
            {stroke !== 'none' && isRange && (
              <Curve
                {...filterProps(props, false)}
                class="recharts-area-curve"
                layout={layout}
                type={type}
                connectNulls={connectNulls}
                fill="none"
                points={baseLine as CurvePoint[]}
              />
            )} */}
          </Layer>
        )}
        {/* <Dots points={points} props={props} clipPathId={clipPathId} /> */}
        {/* {showLabels && LabelList.renderCallByParent?.(props, points)} */}
      </Fragment>
    )
  },
})
