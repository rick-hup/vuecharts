import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { animate } from 'motion-v'
import type { AnimationOptions } from 'motion-v'

const Animate = defineComponent({
  name: 'Animate',
  props: {
    // 是否激活动画
    isActive: {
      type: Boolean,
      default: true,
    },
    // 动画配置选项
    transition: {
      type: Object as PropType<AnimationOptions>,
      default: () => ({
        duration: 400,
        ease: 'easeOut',
      }),
    },
    // 动画开始回调
    onAnimationStart: {
      type: Function as PropType<() => void>,
      default: undefined,
    },
    // 动画结束回调
    onAnimationEnd: {
      type: Function as PropType<() => void>,
      default: undefined,
    },
    // 动画开始值
    from: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({ t: 0 }),
    },
    // 动画结束值
    to: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({ t: 1 }),
    },
  },
  emits: ['update', 'complete', 'start'],
  setup(props, { emit, slots }) {
    let animationControls: any = null

    // 开始动画
    const startAnimation = () => {
      if (animationControls) {
        animationControls.stop()
      }

      emit('start')
      if (props.onAnimationStart) {
        props.onAnimationStart()
      }

      animationControls = animate(props.from, props.to, {
        ...props.transition,
        onUpdate: (latest) => {
          emit('update', latest)
          if (slots.default) {
            slots.default(latest)
          }
        },
        onComplete: () => {
          emit('complete')
          if (props.onAnimationEnd) {
            props.onAnimationEnd()
          }
        },
      })
    }

    // 停止动画
    const stopAnimation = () => {
      if (animationControls) {
        animationControls.stop()
        animationControls = null
      }
    }

    // 监听isActive变化
    if (props.isActive) {
      startAnimation()
    }

    return () => {
      if (!slots.default) {
        return null
      }

      // 初始渲染时直接使用结束值
      if (!props.isActive) {
        return slots.default(props.to)
      }

      // 动画过程中返回null，让animate函数处理渲染
      return null
    }
  },
})

export { Animate }
