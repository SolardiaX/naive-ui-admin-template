<!--
  - Copyright (c) 2022. All rights reserved by XtraVisions.
  -->

<template>
  <transition name="fade" mode="in-out">
    <div class="login-container">
      <div class="login-form">
        <div class="form-header">
          <img src="~@/assets/images/favicon.png" alt="" />
          <h2>XtraBoard</h2>
        </div>
        <n-form ref="formRef" size="large" label-placement="left" :model="formData" :rules="formRules">
          <n-form-item path="username">
            <n-input v-model:value="formData.username" placeholder="用户名" autofocus>
              <template #prefix>
                <n-icon size="18"><UserOutlined /></n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formData.password"
              placeholder="密　码"
              type="password"
              show-password-on="click"
            >
              <template #prefix>
                <n-icon size="18"><LockOutlined /></n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="isVerified">
            <drag-verify
              v-model:isVerified="formData.isVerified"
              @verifing="($refs.formRef as any).restoreValidation()"
            />
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              color="#2d8cf0"
              textColor="#ffffff"
              :loading="loading"
              block
              @click.prevent="handleSubmit"
            >
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>

      <div class="absolute w-full bottom-0 z-50 p-3 text-center text-xs text-gray-300">
        技术支持 - 成都智梦工场科技有限公司 © 2022
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import { FormRules } from 'naive-ui'
  import { UserOutlined, LockOutlined } from '@vicons/antd'
  import { useUserStore } from '@/store/modules/user'

  interface FormState {
    username: string
    password: string
    isVerified: boolean
  }

  const userStore = useUserStore()
  const router = useRouter()

  const formRef = ref()

  const formData = reactive<FormState>({
    username: 'admin',
    password: 'rfBd67ti',
    isVerified: false
  })

  const formRules: FormRules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
    isVerified: {
      required: true,
      message: '请向右拖拽完成校验',
      type: 'boolean',
      trigger: 'change',
      validator: (_, value) => value === true
    }
  }

  const loading = ref<boolean>(false)

  const handleSubmit = () => {
    formRef.value
      .validate(async (errors: any) => {
        if (errors) {
          window.$message.info('请填写信息并且完成验证码校验')
          return
        }

        loading.value = true
        const user = await userStore.login({ username: formData.username, password: formData.password })
        loading.value = false

        if (user !== null) {
          router.replace({ name: 'root' })
        }
      })
      .catch(() => {})
  }

  onMounted(() => {
    userStore.logout()
  })
</script>

<style lang="scss" scoped>
  .login-container {
    @apply w-full h-screen select-none;
    background-size: cover;
    background-image: url('@/assets/images/login-bg.jpg');

    &:after {
      @apply absolute top-0 left-0 h-full w-full;
      content: '';
      background: rgba(16, 16, 20, 0.72);
    }

    .login-form {
      @apply m-auto absolute rounded-xl z-50 p-8;
      top: 50%;
      left: 50%;
      width: 370px;
      transform: translate(-50%, -50%);
      background: rgba(24, 24, 28, 0.92);
      box-shadow: 0 0 10px #000;

      .form-header {
        @apply text-center flex justify-center items-center mb-8 text-white;

        img {
          @apply mr-4;
          width: auto;
          height: 32px;
        }

        h2 {
          @apply text-3xl font-bold uppercase;
        }
      }
    }
  }
</style>
