/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

/// <reference types="vite/client" />

import 'vue-router'
import { Component, RendererElement, RendererNode, VNode } from 'vue'

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[]
    title?: string
    sort?: number
    isRoot?: boolean
    alwaysShow?: boolean
    hidden?: boolean
    extra?: VNode<RendererNode, RendererElement, { [p: string]: any }>
    icon?: Component
  }
}
