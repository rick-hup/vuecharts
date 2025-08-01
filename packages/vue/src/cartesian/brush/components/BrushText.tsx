import { defineComponent } from 'vue';
import { Layer } from '../../../container/Layer';
import { Text } from '../../../components/Text.vue';
import { getTextOfTick } from '../utils';
import type { DataKey } from '../../../types/common';

export const BrushText = defineComponent({
  name: 'BrushText',
  props: {
    startIndex: Number,
    endIndex: Number,
    y: Number,
    height: Number,
    travellerWidth: Number,
    stroke: String,
    tickFormatter: Function as unknown as (value: any, index: number) => number | string,
    dataKey: [String, Function] as unknown as DataKey<any>,
    data: Array,
    startX: Number,
    endX: Number
  },

  setup(props) {
    const offset = 5;
    const attrs = {
      pointerEvents: 'none',
      fill: props.stroke
    };

    return () => (
      <Layer class="recharts-brush-texts">
        <Text
          textAnchor="end"
          verticalAnchor="middle"
          x={Math.min(props.startX!, props.endX!) - offset}
          y={props.y! + props.height! / 2}
          {...attrs}
        >
          {getTextOfTick({
            index: props.startIndex!,
            tickFormatter: props.tickFormatter!,
            dataKey: props.dataKey,
            data: props.data
          })}
        </Text>
        <Text
          textAnchor="start"
          verticalAnchor="middle"
          x={Math.max(props.startX!, props.endX!) + props.travellerWidth! + offset}
          y={props.y! + props.height! / 2}
          {...attrs}
        >
          {getTextOfTick({
            index: props.endIndex!,
            tickFormatter: props.tickFormatter!,
            dataKey: props.dataKey,
            data: props.data
          })}
        </Text>
      </Layer>
    );
  }
});
