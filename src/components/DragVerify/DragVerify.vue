<template>
  <div
    ref="dragVerifyRef"
    class="drag_verify"
    @mousemove="dragMoving"
    @mouseup="dragFinish"
    @mouseleave="dragFinish"
    @touchmove="dragMoving"
    @touchend="dragFinish"
  >
    <div :class="{ dv_progress_bar: true, verified: state.isVerified }" :style="{ width: processWidth }"> </div>
    <div class="dv_text">
      <slot v-if="$slots.textBefore" name="textBefore"></slot>
      {{ state.isVerified ? props.successText : props.defaultText }}
      <slot v-if="$slots.textAfter" name="textAfter"></slot>
    </div>
    <div
      ref="handler"
      :class="{ dv_handler: true, verified: state.isVerified, moving: state.isMoving }"
      :style="{ left: handlerLeft }"
      @mousedown="dragStart"
      @touchstart="dragStart"
    >
      <NIcon size="14">
        <DoubleRightOutlined v-if="!state.isVerified" />
        <CheckCircleOutlined v-else />
      </NIcon>
    </div>
  </div>
</template>

<script lang="ts" setup name="DragVerify">
  import { commonDark, commonLight } from 'naive-ui'
  import { DoubleRightOutlined, CheckCircleOutlined } from '@vicons/antd'
  import { useThemeStore } from '@/store/modules/theme'

  const props = defineProps({
    isVerified: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    lineHeight: {
      type: String,
      default: '40px'
    },
    defaultText: {
      type: String,
      default: '向右拖动进行验证'
    },
    successText: {
      type: String,
      default: '验证成功'
    },
    progressBarBg: {
      type: String,
      default: '#76c61d'
    },
    completedBg: {
      type: String,
      default: '#76c61d'
    },
    circle: {
      type: Boolean,
      default: false
    },
    radius: {
      type: String,
      default: '4px'
    },
    textSize: {
      type: String,
      default: '14px'
    }
  })

  const emits = defineEmits(['verifing', 'update:isVerified'])

  const themeStore = useThemeStore()
  const dragVerifyRef = ref<HTMLElement>()

  const state = reactive({
    isMoving: false,
    isVerified: false,
    start: 0,
    process: 0
  })

  const handlerLeft = computed(() => {
    return state.process + 'px'
  })

  const processWidth = computed(() => {
    return state.process + 'px'
  })

  const dragStart = (e) => {
    if (!state.isVerified) {
      state.isMoving = true
      state.start = e.pageX || e.touches[0].pageX
    }

    emits('verifing')
  }

  const dragMoving = (e) => {
    if (state.isMoving && !state.isVerified) {
      const x = (e.pageX || e.changedTouches[0].pageX) - state.start
      const max = dragVerifyRef.value!.clientWidth - 40

      if (x > 0 && x < max) {
        state.process = x
      } else if (x >= max) {
        state.process = max
        passVerify()
      }
    }
  }

  const dragFinish = (e) => {
    if (state.isMoving && !state.isVerified) {
      const x = (e.pageX || e.changedTouches[0].pageX) - state.start
      const max = dragVerifyRef.value!.clientWidth - 40

      if (x < max) {
        setTimeout(reset, 500)
      } else {
        state.process = max
        passVerify()
      }

      state.isMoving = false
    }
  }

  const passVerify = () => {
    state.isMoving = false
    state.isVerified = true

    emits('update:isVerified', true)
  }

  const reset = () => {
    state.isMoving = false
    state.isVerified = false
    state.start = 0
    state.process = 0

    emits('update:isVerified', false)
  }

  onMounted(() => {
    const $ref = dragVerifyRef.value

    $ref?.style.setProperty('--width', props.width)
    $ref?.style.setProperty('--height', props.height)
    $ref?.style.setProperty('--lineHeight', props.lineHeight)
    $ref?.style.setProperty('--color', themeStore.darkMode ? commonDark.textColorBase : commonLight.textColorBase)
    $ref?.style.setProperty('--bgColor', themeStore.darkMode ? commonDark.inputColor : commonLight.inputColor)
    $ref?.style.setProperty(
      '--handlerBgColor',
      themeStore.darkMode ? commonDark.borderColor : commonLight.borderColor
    )
    $ref?.style.setProperty(
      '--barProcessColor',
      themeStore.darkMode ? commonDark.infoColor : commonLight.primaryColor
    )
    $ref?.style.setProperty(
      '--barVerifiedColor',
      themeStore.darkMode ? commonDark.successColor : commonLight.successColor
    )
    $ref?.style.setProperty('--radius', props.circle ? dragVerifyRef.value!.clientHeight / 2 + 'px' : props.radius)
  })
</script>

<style lang="scss" scoped>
  .drag_verify {
    @apply relative text-center overflow-hidden;
    border-radius: var(--radius);
    background-color: var(--bgColor);
    width: var(--width);
    height: var(--height);
    line-height: var(---lineHeight);

    .dv_handler {
      @apply absolute flex items-center justify-center top-0 left-0 cursor-move;
      width: 40px;
      height: var(--height);
      line-height: var(--lineHeight);
      border-top-left-radius: var(--radius);
      border-bottom-left-radius: var(--radius);
      background-color: var(--handlerBgColor);
      color: var(--color);

      &.moving {
        border-radius: 0;
      }

      &.verified {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: var(--radius);
        border-bottom-right-radius: var(--radius);
      }
    }

    .dv_progress_bar {
      @apply absolute;
      position: absolute;
      height: var(--height);
      background-color: var(--barProcessColor);
      width: 0;
      left: 0;

      &.verified {
        background-color: var(--barVerifiedColor);
      }
    }
    .dv_text {
      @apply absolute top-0 text-center w-full h-full select-none;
      line-height: var(--lineHeight);
      color: var(--color);
    }
  }
</style>
