<template>
  <template v-for="item in actions" :key="item.name">
    <div v-if="!item.hidden" class="layout-header-trigger">
      <n-tooltip placement="bottom">
        <template #trigger>
          <n-icon size="18" v-on="item.eventObject || {}">
            <component :is="item.icon" />
          </n-icon>
        </template>
        <span>{{ item.tips }}</span>
      </n-tooltip>
    </div>
  </template>
</template>

<script lang="ts">
  import { ReloadOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@vicons/antd'
  import { useThemeStore } from '@/store/modules/theme'

  export default defineComponent({
    name: 'ActionBar',
    components: { ReloadOutlined, FullscreenOutlined, FullscreenExitOutlined },
    setup() {
      const router = useRouter()
      const currentRoute = useRoute()
      const themeStore = useThemeStore()

      const fullscreenIcon = ref<any>(
        document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined'
      )

      // 监听全屏切换事件
      document.addEventListener('fullscreenchange', () => {
        fullscreenIcon.value =
          document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined'
      })

      const actions = reactive([
        {
          name: 'refresh',
          tips: '刷新页面',
          hidden: themeStore.header.showReload,
          icon: 'ReloadOutlined',
          eventObject: {
            click: () => {
              router.push('/redirect' + currentRoute.fullPath)
            }
          }
        },
        {
          name: 'fullscreen',
          tips: '切换全屏',
          icon: fullscreenIcon,
          eventObject: {
            click: () => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen()
              } else {
                if (document.exitFullscreen) {
                  document.exitFullscreen()
                }
              }
            }
          }
        }
      ])

      return {
        actions
      }
    }
  })
</script>
