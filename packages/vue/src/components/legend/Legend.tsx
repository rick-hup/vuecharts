import type { DefineSetupFnComponent, SlotsType } from 'vue'
import { Teleport, defineComponent, watchEffect } from 'vue'
import type { LegendPropsWithSVG, LegendSlots } from './type'
import { LegendVueProps } from './type'
import { useLegend } from './hooks/useLegend'
import { useLegendContent } from './hooks/useLegendContent'
import Surface from '@/container/Surface'
import { LegendSymbol, SIZE } from './LegendSymbol'

export default defineComponent({
  name: 'Legend',
  props: LegendVueProps,
  setup(props, { slots }) {
    const {
      legendRef,
      processedPayload,
      outerStyle,
      legendPortal,
      syncSettings,
      syncSize,
    } = useLegend(props)

    const {
      getWrapperStyle,
      getContentStyle,
      getItemStyle,
      getSvgStyle,
      formatValue,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
    } = useLegendContent(props)

    // Sync settings and size to store
    watchEffect(() => {
      syncSettings()
      syncSize()
    })

    const renderDefaultContent = () => {
      if (!processedPayload.value || processedPayload.value.length === 0) {
        return null
      }

      const { layout = 'horizontal', align = 'center', verticalAlign = 'bottom', iconSize = 14 } = props

      return (
        <div class="vue-charts-legend" style={getWrapperStyle(layout, align, verticalAlign)}>
          <ul class="vue-charts-legend-content" style={getContentStyle(layout)}>
            {processedPayload.value.map((entry, index) => (
              <li
                key={`legend-item-${index}`}
                class="v-charts-legend-item"
                style={getItemStyle(layout)}
                onClick={() => handleClick(entry, index)}
                onMouseenter={() => handleMouseEnter(entry, index)}
                onMouseleave={() => handleMouseLeave(entry, index)}
              >
                <Surface
                  width={iconSize}
                  height={iconSize}
                  viewBox={{
                    x: 0,
                    y: 0,
                    width: SIZE,
                    height: SIZE,
                  }}
                  style={getSvgStyle()}
                  aria-label={`${formatValue(entry)} legend icon`}
                >
                  <LegendSymbol
                    type={props.iconType ?? entry.type}
                    color={entry.color}
                    size={iconSize}
                    data={entry}
                  />
                </Surface>
                <span class="v-charts-legend-item-text" style={{ color: entry.color }}>
                  {formatValue(entry)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    const renderContent = () => {
      if (!processedPayload.value || processedPayload.value.length === 0) {
        return null
      }

      const contentProps = {
        ...props,
        payload: processedPayload.value,
      }
      if (slots.content) {
        return slots.content(contentProps)
      }

      return renderDefaultContent()
    }

    return () => {
      if (legendPortal.value == null) {
        return null
      }

      const legendElement = (
        <div
          class="v-charts-legend-wrapper"
          style={outerStyle.value}
          ref={legendRef}
        >
          {renderContent()}
        </div>
      )

      return (
        <foreignObject>
          <Teleport to={legendPortal.value}>
            {legendElement}
          </Teleport>
        </foreignObject>
      )
    }
  },
}) as unknown as DefineSetupFnComponent<LegendPropsWithSVG, {}, SlotsType<LegendSlots>>
