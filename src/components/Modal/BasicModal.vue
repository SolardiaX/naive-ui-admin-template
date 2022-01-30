<template>
  <n-modal
    v-bind="bindedValues"
    id="basic-modal"
    v-model:show="showModal"
    class="basicModal"
    @close="onCloseModal"
  >
    <template #header>
      <div id="basic-modal-bar" class="w-full cursor-move"> {{ bindedValues.title }}</div>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template v-if="!$slots.action" #action>
      <n-space>
        <n-button @click="closeModal">取消</n-button>
        <n-button type="primary" :loading="subLoading" @click="handleSubmit">{{ subBtnText }}</n-button>
      </n-space>
    </template>
    <template v-else #action>
      <slot name="action"></slot>
    </template>
  </n-modal>
</template>

<script lang="ts" setup name="BasicModal">
  import { merge } from 'lodash'
  import { FormProps } from '@/components/Form'
  import { ModalProps, ModalMethods } from './types/modal'
  import { defaultProps } from './props'

  const attrs = useAttrs()
  const props = defineProps({ ...defaultProps })
  const emits = defineEmits(['on-close', 'on-ok', 'register'])

  const propsRef = ref<Partial<ModalProps> | null>(null)

  const showModal = ref(false)
  const subLoading = ref(false)

  const subBtnText = computed(() => {
    const { subBtnText } = propsRef.value as any
    return subBtnText || props.subBtnText
  })

  const getProps = computed((): FormProps => {
    return { ...props, ...(unref(propsRef) as any) }
  })

  async function setProps(modalProps: Partial<ModalProps>): Promise<void> {
    propsRef.value = merge(unref(propsRef) || ({} as any), modalProps)
  }

  const bindedValues = computed(() => {
    return {
      ...attrs,
      ...unref(getProps),
      ...unref(propsRef)
    }
  })

  function setSubLoading(status: boolean) {
    subLoading.value = status
  }

  function openModal() {
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
    subLoading.value = false
    emits('on-close')
  }

  function onCloseModal() {
    showModal.value = false
    emits('on-close')
  }

  function handleSubmit() {
    subLoading.value = true
    emits('on-ok')
  }

  const modalMethods: ModalMethods = {
    setProps,
    openModal,
    closeModal,
    setSubLoading
  }

  const instance = getCurrentInstance()
  if (instance) {
    emits('register', modalMethods)
  }
</script>

<style lang="scss">
  .basicModal .basicForm {
    @apply pt-4;
  }
</style>
