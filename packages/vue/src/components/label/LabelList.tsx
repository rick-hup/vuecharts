import { Label } from '@/components/label/Label'
import { LabelListVueProps } from '@/components/label/types'
import { parseViewBox } from '@/components/label/utils'
import { Layer } from '@/container/Layer'
import { isNullish } from '@/utils'
import { getValueByDataKey } from '@/utils/chart'
import { defineComponent } from 'vue'

export const LabelList = defineComponent({
  props: LabelListVueProps,
  setup(props, { attrs }) {
    return () => {
      const { data, dataKey, valueAccessor, clockWise, id, ...others } = props
      if (!data || !data.length)
        return null
      return (
        <Layer class="v-charts-label-list">
          {data.map((entry, index) => {
            const value = isNullish(dataKey)
              ? valueAccessor(entry, index)
              : (getValueByDataKey(entry && entry.payload, dataKey!) as string | number)
            const idProps = isNullish(id) ? undefined : `${id}-${index}`

            return (
              <Label
                {...others}
                {...attrs}
                id={idProps!}
                parentViewBox={entry.parentViewBox}
                value={value}
                viewBox={parseViewBox(isNullish(clockWise) ? entry : { ...entry, clockWise })}
                key={`label-${index}`}
                index={index}
              />
            )
          })}
        </Layer>
      )
    }
  },
})
