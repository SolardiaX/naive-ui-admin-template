/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import store from '@/store'
import { setupRouter } from '@/router'
import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)

  app.use(store)
  setupRouter(app)

  //--解决 tailwind 样式覆盖问题
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
  //--

  app.mount('#app', true)
}

void bootstrap()
