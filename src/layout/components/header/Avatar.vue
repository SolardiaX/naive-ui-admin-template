<template>
  <n-dropdown trigger="hover" :options="userMenu" @select="menuSelect">
    <div class="avatar">
      <n-avatar round> {{ avatar_word }} </n-avatar>
    </div>
  </n-dropdown>
  <basic-modal @register="modalRegister" @on-ok="okModal">
    <template #default>
      <basic-form @register="formRegister">
        <template #statusSlot="{ model, field }">
          <n-input v-model:value="model[field]" />
        </template>
      </basic-form>
    </template>
  </basic-modal>
</template>

<script lang="ts">
  import { useUserStore } from '@/store/modules/user'
  import { BasicModal, useModal } from '@/components/Modal'
  import { BasicForm, FormSchema, useForm } from '@/components/Form'

  const userMenu = [
    {
      label: '修改密码',
      key: 'password'
    },
    {
      label: '退出登录',
      key: 'logout'
    }
  ]

  const formSchemas: FormSchema[] = [
    {
      field: 'old_password',
      component: 'NInput',
      componentProps: { type: 'password', 'show-password-on': 'click', maxlength: '12', minlength: '8' },
      label: '当前密码',
      rules: [{ required: true, message: '请输入当前密码', trigger: ['blur'] }]
    },
    {
      field: 'new_password',
      component: 'NInput',
      componentProps: { type: 'password', 'show-password-on': 'click', maxlength: '12', minlength: '8' },
      label: '新 密 码',
      rules: [
        { required: true, message: '请输入新密码', trigger: ['blur'] },
        { min: 8, max: 12, message: '密码长度为 8 ~ 12 位', trigger: ['blur'] }
      ]
    },
    {
      field: 'cfm_password',
      component: 'NInput',
      componentProps: { type: 'password', 'show-password-on': 'click', maxlength: '12', minlength: '8' },
      label: '确认密码',
      rules: [
        { required: true, message: '请确认密码', trigger: ['blur'] },
        { min: 8, max: 12, message: '密码长度为 8 ~ 12 位', trigger: ['blur'] }
      ]
    }
  ]

  export default defineComponent({
    name: 'Avatar',
    components: {
      BasicModal,
      BasicForm
    },
    props: {
      username: {
        type: String
      }
    },
    setup(props) {
      const router = useRouter()
      const userStore = useUserStore()

      const avatar_word = computed(() => {
        return props.username === undefined ? 'U' : props.username.charAt(0)
      })

      const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
        title: '修改密码'
      })

      const [formRegister, { submit, validate, getFieldsValue }] = useForm({
        gridProps: { cols: 1 },
        collapsedRows: 3,
        labelWidth: 120,
        layout: 'horizontal',
        showActionButtonGroup: false,
        schemas: formSchemas,
        submitFunc: async (): Promise<boolean> => {
          await validate()
          const formData = getFieldsValue()

          return await userStore.changePassword({
            user_id: userStore.currentUser?.user_id,
            ...formData
          } as any)
        }
      })

      async function okModal() {
        const formRes = await submit()
        if (formRes) {
          window.$message.success('提交成功')
          closeModal()
        } else {
          setSubLoading(false)
        }
      }

      const menuSelect = async (key: string) => {
        if (key === 'logout') {
          router.push({ name: 'login' })
        }
        if (key === 'password') {
          openModal()
        }
      }

      return {
        userMenu,
        avatar_word,
        menuSelect,
        modalRegister,
        okModal,
        formRegister
      }
    }
  })
</script>

<style lang="scss" scoped>
  .avatar {
    @apply flex items-center;
    height: 64px;

    ::v-deep(.n-avatar__text) {
      @apply uppercase;
    }
  }
</style>
