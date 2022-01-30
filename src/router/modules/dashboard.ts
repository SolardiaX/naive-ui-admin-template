/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import { RouteRecordRaw } from 'vue-router'
import { DashboardOutlined } from '@vicons/antd'
import { renderIcon } from '@/router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/layout/BaseLayout.vue'),
    meta: {
      sort: 0,
      title: '仪表盘',
      icon: renderIcon(DashboardOutlined),
      roles: ['admin']
    }
  }
]

export default routes
