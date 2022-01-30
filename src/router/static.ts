/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    redirect: '/dashboard'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    name: 'error',
    path: '/errors',
    component: () => import('@/layout/StandardLayout.vue'),
    redirect: '/errors/404',
    children: [
      {
        name: '403',
        path: '403',
        component: () => import('@/views/errors/403.vue')
      },
      {
        name: '404',
        path: '404',
        component: () => import('@/views/errors/404.vue')
      },
      {
        name: '500',
        path: '500',
        component: () => import('@/views/errors/500.vue')
      }
    ]
  }
]

export const notFoundPageRoute: RouteRecordRaw = {
  name: 'notFoundPage',
  path: '/:path(.*)*',
  component: () => import('@/views/errors/404.vue')
}

export const redirectPageRoute: RouteRecordRaw = {
  name: 'redirect',
  path: '/redirect',
  component: () => import('@/layout/BaseLayout.vue'),
  children: [
    {
      name: 'redirectView',
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/Redirect.vue'),
      meta: {
        title: '跳转中...'
      }
    }
  ]
}
