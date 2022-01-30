/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import { resolve } from 'path'
import { defineConfig } from 'vite'
import { builtinModules } from 'module'
import { NaiveUiResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  mode: process.env.NODE_ENV,
  base: '/admin/',
  root: '.',
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/'
      },
      {
        find: '@',
        replacement: pathResolve('src') + '/'
      }
    ],
    dedupe: ['vue']
  },
  build: {
    outDir: '../backend/static/admin',
    sourcemap: process.env.NODE_ENV == 'development',
    minify: process.env.NODE_ENV != 'development',
    emptyOutDir: false,
    rollupOptions: {
      external: [...builtinModules],
      output: {
        entryFileNames: 'assets/[name].cjs'
      }
    }
  },
  plugins: [
    vue(),
    VueSetupExtend(),
    Components({
      dts: 'types/auto-components.d.ts',
      resolvers: [NaiveUiResolver(), VueUseComponentsResolver()],
      dirs: ['src']
    }),
    AutoImport({ dts: 'types/auto-imports.d.ts', imports: ['vue', 'vue-router', '@vueuse/core'] })
  ],
  server: {
    host: process.env.VITE_HOST,
    port: +process.env.VITE_PORT!
  }
})
