/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'lodash'

/**
 * 排除Router
 * */
export function filterRouter(routerMap: Array<RouteRecordRaw>): RouteRecordRaw[] {
  return routerMap.filter((item) => {
    return !(item.meta?.hidden || false) && !['/:path(.*)*', '/'].includes(item.path)
  })
}

/**
 * 判断根路由 Router
 * */
export function isRootRouter(item): boolean {
  return item.meta?.alwaysShow != true && item.children?.length === 1
}

/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<RouteRecordRaw>) {
  return filterRouter(routerMap).map((item) => {
    const isRoot = isRootRouter(item)
    const info = isRoot ? item.children![0] : item
    const currentMenu = {
      ...info,
      ...info.meta,
      label: info.meta?.title,
      key: info.name,
      icon: isRoot ? item.meta?.icon : info.meta?.icon
    }
    // 是否有子菜单，并递归处理
    if (info.children && info.children.length > 0) {
      // 递归
      currentMenu.children = generatorMenu(info.children)
    }
    return currentMenu
  })
}

/**
 * 混合菜单
 * */
export function generatorMenuMix(routerMap: Array<any>, routerName: string, location: string) {
  const cloneRouterMap = cloneDeep(routerMap)
  const newRouter = filterRouter(cloneRouterMap)
  if (location === 'header') {
    const firstRouter: any[] = []
    newRouter.forEach((item) => {
      const isRoot = isRootRouter(item)
      const info = isRoot ? item.children![0] : item
      info.children = undefined
      const currentMenu = {
        ...info,
        ...info.meta,
        label: info.meta?.title,
        key: info.name
      }
      firstRouter.push(currentMenu)
    })
    return firstRouter
  } else {
    return getChildrenRouter(newRouter.filter((item) => item.name === routerName))
  }
}

/**
 * 递归组装子菜单
 * */
export function getChildrenRouter(routerMap: Array<any>) {
  return filterRouter(routerMap).map((item) => {
    const isRoot = isRootRouter(item)
    const info = isRoot ? item.children![0] : item
    const currentMenu = {
      ...info,
      ...info.meta,
      label: info.meta?.title,
      key: info.name
    }
    // 是否有子菜单，并递归处理
    if (info.children && info.children.length > 0) {
      // Recursion
      currentMenu.children = getChildrenRouter(info.children)
    }
    return currentMenu
  })
}
