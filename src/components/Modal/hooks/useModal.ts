import { isDevMode } from '@/utils/env'
import { getDynamicProps } from '@/utils/props'
import { ModalMethods, UseModalReturnType } from '../types/modal'

export function useModal(props: any): UseModalReturnType {
  const modalRef = ref<Nullable<ModalMethods>>(null)
  const currentInstance = getCurrentInstance()

  const getInstance = () => {
    const instance = unref(modalRef.value)
    if (!instance) {
      console.error('useModal instance is undefined!')
    }
    return instance
  }

  const register = (modalInstance: ModalMethods) => {
    isDevMode() &&
      tryOnUnmounted(() => {
        modalRef.value = null
      })
    modalRef.value = modalInstance
    currentInstance?.emit('register', modalInstance)

    watch(
      () => props,
      () => {
        props && modalInstance.setProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: ModalMethods = {
    setProps: (props): void => {
      getInstance()?.setProps(props)
    },
    openModal: async () => {
      getInstance()?.openModal()
    },
    closeModal: () => {
      getInstance()?.closeModal()
    },
    setSubLoading: (status) => {
      getInstance()?.setSubLoading(status)
    }
  }

  return [register, methods]
}
