<!--
  - Copyright (c) 2022. All rights reserved by XtraVisions.
  -->

<template>
  <div class="page-container flex flex-col justify-center w-full borader-xs h-screen py-12">
    <div class="text-center">
      <img src="~@/assets/images/exception/403.svg" alt="" />
    </div>
    <div class="text-center">
      <h1 class="text-base text-gray-300 py-4">抱歉，你无权访问该页面</h1>
      <n-button type="info" @click="goHome">回到首页</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const router = useRouter()
  function goHome() {
    router.push({ name: 'login' })
  }
</script>

<style lang="scss" scoped>
  .page-container {
    img {
      width: 350px;
      margin: 0 auto;
    }
  }
</style>
