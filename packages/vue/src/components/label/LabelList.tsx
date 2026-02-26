import { Teleport, defineComponent } from 'vue'
import { Label } from '@/components/label/Label'
import { LabelListVueProps } from '@/components/label/types'
import { parseViewBox } from '@/components/label/utils'
import { useLabelLayerRef } from '@/context/labelLayerContext'
import { useCartesianLabelListData } from '@/context/cartesianLabelListContext'
import { Layer } from '@/container/Layer'
import { isNullish } from '@/utils'
import { getValueByDataKey } from '@/utils/chart'

export const LabelList = defineComponent({
  props: LabelListVueProps,
  setup(props, { attrs, slots }) {
    const labelLayerRef = useLabelLayerRef(null)
    const contextData = useCartesianLabelListData(null)

    return () => {
      const { dataKey, valueAccessor, clockWise, id, ...others } = props
      const data = props.data ?? contextData?.value
      if (!data || !data.length)
        return null

      const content = (
        <Layer class="v-charts-label-list">
          {data.map((entry, index) => {
            const value = isNullish(dataKey)
              ? valueAccessor(entry, index)
              : (getValueByDataKey(entry && entry.payload, dataKey!) as string | number)
            const idProps = isNullish(id) ? undefined : `${id}-${index}`
            const viewBox = parseViewBox(isNullish(clockWise) ? entry : { ...entry, clockWise })

            if (slots.label) {
              return slots.label({ ...others, ...attrs, ...viewBox, value, index, key: `label-${index}` })
            }

            const entryFill = entry.fill != null && !('fill' in others) && !('fill' in attrs) ? entry.fill : undefined

            return (
              <Label
                {...others}
                {...attrs}
                {...(entryFill != null ? { fill: entryFill } : {})}
                id={idProps!}
                parentViewBox={entry.parentViewBox}
                value={value}
                viewBox={viewBox}
                key={`label-${index}`}
                index={index}
              />
            )
          })}
        </Layer>
      )

      if (labelLayerRef?.value) {
        return <Teleport to={labelLayerRef.value}>{content}</Teleport>
      }

      return content
    }
  },
})
