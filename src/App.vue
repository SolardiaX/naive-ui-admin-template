<!--
  - Copyright (c) 2022. All rights reserved by XtraVisions.
  -->

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <RouterView />
            <AppProvider />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
  import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
</script>

<style lang="scss">
  @import 'tailwindcss/tailwind.css';

  body,
  html {
    @apply overflow-hidden p-0 m-0 h-full w-full;
    background-color: #101014;
  }
</style>
