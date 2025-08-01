import { defineComponent } from 'vue';
import type { TravellerProps } from '../type';

export const Traveller = defineComponent({
  name: 'Traveller',
  props: {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    stroke: String
  } as unknown as TravellerProps,

  setup(props) {
    const lineY = Math.floor(props.y! + props.height! / 2) - 1;

    return () => (
      <>
        <rect
          x={props.x}
          y={props.y}
          width={props.width}
          height={props.height}
          fill={props.stroke}
          stroke="none"
        />
        <line
          x1={props.x! + 1}
          y1={lineY}
          x2={props.x! + props.width! - 1}
          y2={lineY}
          fill="none"
          stroke="#fff"
        />
        <line
          x1={props.x! + 1}
          y1={lineY + 2}
          x2={props.x! + props.width! - 1}
          y2={lineY + 2}
          fill="none"
          stroke="#fff"
        />
      </>
    );
  }
});
