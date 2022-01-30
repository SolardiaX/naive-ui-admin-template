<!--
  - Copyright (c) 2022. All rights reserved by XtraVisions.
  -->

<template>
  <NMenu
    :options="menus"
    :inverted="inverted"
    :mode="mode"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="22"
    :expanded-keys="openKeys"
    :value="selectedKeys"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
  />
</template>

<script lang="ts" setup name="Menu">
  import { PropType } from 'vue'
  import { useThemeStore } from '@/store/modules/theme'
  import { useAsyncRoutesStore } from '@/store/modules/routes'
  import { generatorMenu, generatorMenuMix } from './menus'

  const props = defineProps({
    mode: {
      // 菜单模式
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'vertical'
    },
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean
    },
    //位置
    location: {
      type: String,
      default: 'left'
    }
  })

  const currentRoute = useRoute()
  const router = useRouter()
  const themeStore = useThemeStore()
  const asyncRoutesStore = useAsyncRoutesStore()

  // 获取当前打开的子菜单
  const matched = currentRoute.matched
  const headerMenuSelectKey = ref<string>('')

  const openKeys = ref<any[]>([])
  openKeys.value = matched && matched.length ? matched.map((item) => item.name) : []

  const inverted = computed(() => {
    return ['dark', 'header-dark'].includes(themeStore.navTheme)
  })

  const selectedKeys = computed(() => {
    const location = props.location
    const routeName = currentRoute.name as string

    return location === 'left' || (location === 'header' && themeStore.navMode === 'horizontal')
      ? routeName
      : headerMenuSelectKey.value
  })

  const menus = ref<any[]>([])

  function updateMenu() {
    if (!themeStore.menu.mixMenu) {
      menus.value = generatorMenu(asyncRoutesStore.routes)
    } else {
      //混合菜单
      const firstRouteName: string = (currentRoute.matched[0].name as string) || ''
      menus.value = generatorMenuMix(asyncRoutesStore.routes, firstRouteName, props.location)
      const activeMenu: string = currentRoute?.matched[0].meta?.activeMenu as string
      headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || ''
    }
  }

  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      updateMenu()
      const matched = currentRoute.matched
      openKeys.value = matched.map((item) => item.name)
    }
  )

  // 点击菜单
  function clickMenuItem(key: string) {
    if (/http(s)?:/.test(key)) {
      window.open(key)
    } else {
      router.push({ name: key })
    }
  }

  //展开菜单
  function menuExpanded(keys: string[]) {
    if (!keys) return
    const latestOpenKey = keys.find((key) => openKeys.value.indexOf(key) === -1)
    const isExistChildren = findChildrenLen(latestOpenKey as string)
    openKeys.value = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : keys
  }

  //查找是否存在子路由
  function findChildrenLen(key: string) {
    if (!key) return false
    const subRouteChildren: string[] = []
    for (const { children, key } of menus.value) {
      if (children && children.length) {
        subRouteChildren.push(key as string)
      }
    }
    return subRouteChildren.includes(key)
  }

  onMounted(() => {
    updateMenu()
  })
</script>

<style lang="scss" scoped></style>
