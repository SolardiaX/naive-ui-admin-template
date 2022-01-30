<!--
  - Copyright (c) 2022. All rights reserved by XtraVisions.
  -->

<template>
  <div class="layout-header">
    <!--顶部菜单-->
    <div
      v-if="
        themeStore.navMode === 'horizontal' || (themeStore.navMode === 'horizontal-mix' && themeStore.menu.mixMenu)
      "
      class="layout-header-left"
    >
      <Logo v-if="themeStore.navMode === 'horizontal'" class="ml-4" />
      <Menu class="ml-4" :collapsed="collapsed" location="header" :inverted="menuInverted" mode="horizontal" />
    </div>
    <!--左侧菜单-->
    <div v-else class="layout-header-left">
      <!-- 菜单收起 -->
      <div class="layout-header-trigger" @click="() => $emit('update:collapsed', !collapsed)">
        <n-icon size="18">
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div v-if="themeStore.header.showReload" class="layout-header-trigger" @click="reloadPage">
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="themeStore.crumbs.show">
        <template v-for="item in crumbList" :key="item.name">
          <n-breadcrumb-item>
            <n-dropdown v-if="item.children?.length" :options="item.children" @select="crumbDropdownSelect">
              <span class="link-text">
                <component :is="item.meta.icon" v-if="themeStore.crumbs.showIcon && item.meta.icon" />
                {{ item.meta.title }}
              </span>
            </n-dropdown>
            <span v-else class="link-text">
              <component :is="item.meta.icon" v-if="themeStore.crumbs.showIcon && item.meta.icon" />
              {{ item.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <!-- 右侧侧菜单 -->
    <div class="layout-header-right">
      <!-- 快捷工具栏 -->
      <ActionBar />
      <!-- 个人中心 -->
      <div class="layout-header-trigger">
        <Avatar :username="userStore.currentUser?.username" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { RouteLocationMatched } from 'vue-router'
  import { MenuUnfoldOutlined, MenuFoldOutlined, ReloadOutlined } from '@vicons/antd'
  import { useThemeStore } from '@/store/modules/theme'
  import { useUserStore } from '@/store/modules/user'

  const props = defineProps({
    collapsed: {
      type: Boolean
    },
    inverted: {
      type: Boolean
    }
  })

  const router = useRouter()
  const currentRoute = useRoute()
  const themeStore = useThemeStore()
  const userStore = useUserStore()

  const menuInverted = computed(() => {
    return ['light', 'header-dark'].includes(themeStore.navTheme) ? props.inverted : !props.inverted
  })

  const crumbList = computed(() => {
    const generator: any = (routerMap: RouteLocationMatched[]) => {
      return routerMap.map((item) => {
        const currentMenu = {
          ...item,
          label: item.meta.title,
          key: item.name,
          disabled: item.path === '/'
        }
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
          currentMenu.children = generator(item.children, currentMenu)
        }
        return currentMenu
      })
    }

    let menus = generator(currentRoute.matched)
    if (menus.length === 1) {
      menus = [{ label: '', key: '0', meta: { title: '' } }, ...menus]
    }
    return menus
  })

  const reloadPage = () => {
    router.push('/redirect' + currentRoute.fullPath)
  }

  const crumbDropdownSelect = (key: string) => {
    router.push({ name: key })
  }
</script>

<style lang="scss" scoped>
  .layout-header {
    @apply flex justify-between items-center z-10 w-full;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;

    ::v-deep(.layout-header-trigger) {
      @apply w-auto text-center cursor-pointer;
      padding: 0 12px;
      transition: all 0.2s ease-in-out;
      height: 64px;
      line-height: 64px;

      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }

      .n-icon {
        @apply flex items-center;
        height: 64px;
        line-height: 64px;
      }
    }

    .layout-header-left {
      @apply flex items-center ml-1;

      ::v-deep(.ant-breadcrumb span:last-child .link-text) {
        color: #515a6e;
      }

      ::v-deep(.n-menu-item-content) {
        border-bottom: none !important;
      }
    }

    .layout-header-right {
      @apply flex items-center mr-2;
    }
  }
</style>
