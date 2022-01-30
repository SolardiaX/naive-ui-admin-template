/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useAsyncRoutesStore } from '@/store/modules/routes'
import { notFoundPageRoute, redirectPageRoute, routes } from './static'

const loginRouteName = 'login'
const defaultRouteName = 'root'

export function enableRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const asyncRoutesStore = useAsyncRoutesStore()

    window.$loading.start()

    //从 404 跳转到登录页时时转到默认页
    if (from.name == loginRouteName && to.name == '404') {
      return next(defaultRouteName)
    }

    //从默认页跳转到 404 时转到登录页（未初始化异步加载路由）
    if (from.name == defaultRouteName && to.name == '404') {
      return next(loginRouteName)
    }

    //静态路由或目标路由不需要则认证直接访问
    if (routes.some((r) => r.path == to.path) || to.meta.ignoreAuth) {
      return next()
    }

    const user = await userStore.getCurrentUser()

    if (user == null || user.user_id == 0) {
      return next({
        name: loginRouteName,
        replace: true,
        query: {
          redirect: to.path
        }
      })
    }

    if (asyncRoutesStore.isDynamicAdded) {
      return next()
    }

    const asyncRoutes = await asyncRoutesStore.generateRoutes(user!.roles)
    asyncRoutes.forEach((item) => {
      router.addRoute(item)
    })

    //添加redirect
    const isRedirectPage = router.getRoutes().findIndex((item) => item.name === redirectPageRoute.name)
    if (isRedirectPage === -1) {
      router.addRoute(redirectPageRoute)
    }

    //添加默认404
    const isNotFoundPage = router.getRoutes().findIndex((item) => item.name === notFoundPageRoute.name)
    if (isNotFoundPage === -1) {
      router.addRoute(notFoundPageRoute)
    }

    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }

    if (!router.getRoutes().some((item) => item.path === to.path)) {
      return next({ name: '403' })
    }

    next(nextData)
    window.$loading?.finish()
  })

  router.afterEach((to) => {
    const asyncRoutesStore = useAsyncRoutesStore()

    document.title = import.meta.env.VITE_APP_NAME + (to?.meta?.title === undefined ? '' : ' - ' + to.meta.title)

    const keepAliveComponents = asyncRoutesStore.keepAliveComponents
    const currentComName: any = to.matched.find((item) => item.name == to.name)?.name
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName)
    } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
      // 不需要缓存的组件
      const index = asyncRoutesStore.keepAliveComponents.findIndex((name) => name == currentComName)
      if (index != -1) {
        keepAliveComponents.splice(index, 1)
      }
    }
    asyncRoutesStore.keepAliveComponents = keepAliveComponents

    window.$loading?.finish()
  })

  router.onError((error, to) => {
    window.$message?.error(`页面跳转异常: <br>目标地址 - ${to.path} <br>错误原因 - ${error}`)
    window.$loading?.error()
  })
}
