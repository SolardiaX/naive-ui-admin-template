<!--
  - Copyright (c) 2022. All rights reserved by XtraVisions.
  -->

<template>
  <div class="logo">
    <img src="~@/assets/images/favicon.png" alt="" :class="{ 'mr-4': !collapsed }" />
    <h2 v-show="!collapsed" class="mb-0">XtraBoard</h2>
  </div>
</template>

<script lang="ts" setup>
  const _props = defineProps({
    collapsed: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="scss" scoped>
  .logo {
    @apply flex justify-center items-center content-center overflow-hidden whitespace-nowrap;
    height: 64px;
    line-height: 64px;

    img {
      width: auto;
      height: 28px;
    }

    h2 {
      @apply text-xl uppercase font-bold;
    }
  }
</style>
