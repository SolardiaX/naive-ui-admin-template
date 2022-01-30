/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { NIcon } from 'naive-ui'
import { routes } from './static'
import { enableRouterGuards } from './guards'

export function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: routes
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  enableRouterGuards(router)
}

export default router
