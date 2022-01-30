/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import { defineStore } from 'pinia'
import themeSettings from '@/config/theme'

interface IThemeStateHeader {
  bgColor: string
  fixed: boolean
  showReload: boolean
}

interface IThemeStateMenu {
  minMenuWidth: number
  menuWidth: number
  fixed: boolean
  mixMenu: boolean
  collapsed: boolean
}

interface IThemeStateTabs {
  bgColor: string
  show: boolean
  showIcon: boolean
  fixed: boolean
}

interface IThemeStateCrumbs {
  show: boolean
  showIcon: boolean
}

interface IThemeState {
  darkMode: boolean //暗色风格
  navMode: string //导航模式
  navTheme: string //导航风格
  header: IThemeStateHeader //顶部设置
  showFooter: boolean //页脚
  menu: IThemeStateMenu //多标签
  tabs: IThemeStateTabs //多标签
  crumbs: IThemeStateCrumbs //面包屑
  permissionMode: string //权限模式
  isPageAnimate: boolean //是否开启路由动画
  pageAnimateType: string //路由动画类型
}

const {
  darkMode,
  navMode,
  navTheme,
  header,
  showFooter,
  menu,
  tabs,
  crumbs,
  permissionMode,
  isPageAnimate,
  pageAnimateType
} = themeSettings

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): IThemeState => ({
    darkMode,
    navMode,
    navTheme,
    header,
    showFooter,
    menu,
    tabs,
    crumbs,
    permissionMode,
    isPageAnimate,
    pageAnimateType
  })
})
