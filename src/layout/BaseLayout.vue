<!--
  - Copyright (c) 2022. All rights reserved by XtraVisions.
  -->

<template>
  <n-layout class="layout" :position="headerPosition" has-sider>
    <!-- 侧边栏 -->
    <n-layout-sider
      v-if="isMixMenuNoneSub && (themeStore.navMode === 'vertical' || themeStore.navMode === 'horizontal-mix')"
      show-trigger="bar"
      :position="headerPosition"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="collapsed ? themeStore.menu.minMenuWidth : themeStore.menu.menuWidth"
      :native-scrollbar="false"
      :inverted="inverted"
      class="layout-sider"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <Logo :collapsed="collapsed" />
      <Menu v-model:collapsed="collapsed" />
    </n-layout-sider>

    <!-- 主界面 -->
    <n-layout :inverted="inverted" :native-scrollbar="false">
      <!-- 头部导航 -->
      <n-layout-header :inverted="headerInverted" :position="headerPosition">
        <Header v-model:collapsed="collapsed" :inverted="inverted" />
      </n-layout-header>

      <!-- 内容界面 -->
      <n-layout-content class="layout-content">
        <div
          :class="{
            'layout-content-main': true,
            'fluid-header': !themeStore.header.fixed
          }"
        >
          <router-view />
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
  import { useThemeStore } from '@/store/modules/theme'
  import { Logo } from './components/logo'
  import { Menu } from './components/menu'
  import { Header } from './components/header'

  const themeStore = useThemeStore()
  const currentRoute = useRoute()

  const collapsed = ref<boolean>(false)

  const inverted = computed(() => {
    return ['dark', 'header-dark'].includes(themeStore.navTheme)
  })

  const headerInverted = computed(() => {
    return ['light', 'header-dark'].includes(themeStore.navTheme)
  })

  const headerPosition = computed(() => {
    return themeStore.header.fixed ? 'absolute' : 'static'
  })

  const isMixMenuNoneSub = computed(() => {
    if (themeStore.navMode != 'horizontal-mix') return true
    if (themeStore.navMode === 'horizontal-mix' && themeStore.menu.mixMenu && currentRoute.meta.isRoot) {
      return false
    }
    return true
  })
</script>

<style lang="scss" scoped>
  .layout {
    @apply flex flex-row flex-auto;

    .layout-sider {
      @apply h-screen relative z-10;
      box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
      transition: all 0.2s ease-in-out;
    }

    .layout-sider-fix {
      @apply fixed top-0 left-0;
    }

    .n-layout-header.n-layout-header--absolute-positioned {
      @apply z-10;
    }

    .layout-content {
      flex: auto;
      min-height: 100vh;

      .layout-content-main {
        @apply relative;
        margin: 0 10px 10px;
        padding-top: 64px;

        &.fluid-header {
          padding-top: 0;
        }
      }
    }
  }
</style>
