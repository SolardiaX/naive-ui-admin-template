/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: RouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]

  routeModuleList.push(...modList)
})

routeModuleList.sort((a, b) => {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0)
})

export const asyncRoutes = [...routeModuleList]
