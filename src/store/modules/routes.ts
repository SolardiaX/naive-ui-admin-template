/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { routes } from '@/router/static'
import { asyncRoutes } from '@/router/async'

export interface IAsyncRouteState {
  routes: RouteRecordRaw[]
  keepAliveComponents: string[]
  isDynamicAdded: boolean
}

export const useAsyncRoutesStore = defineStore({
  id: 'asyncRoute',
  state: (): IAsyncRouteState => ({
    routes: routes,
    keepAliveComponents: [],
    isDynamicAdded: false
  }),
  actions: {
    async generateRoutes(permissions: string[]) {
      const routeFilter = (route: RouteRecordRaw) => {
        const { meta } = route

        if (!meta || !meta.roles) return

        return permissions.some((item) => meta.roles!.includes(item))
      }

      //TODO load routes from backend

      const accessedRoutes = asyncRoutes.filter(routeFilter)
      this.$state.routes = accessedRoutes
      this.$state.isDynamicAdded = true

      return toRaw(accessedRoutes)
    }
  }
})
