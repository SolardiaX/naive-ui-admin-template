<template>
  <div class="box">
    <div class="loader"></div>
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const router = useRouter()

  onBeforeMount(() => {
    const { params, query } = route
    const { path } = params

    router.replace({
      path: '/' + (Array.isArray(path) ? path.join('/') : path),
      query
    })
  })
</script>

<style lang="scss" scoped>
  .box {
    @apply inline-block w-full overflow-hidden;
    height: calc(100vh - 64px);

    .loader {
      position: relative;
      width: 150px;
      height: 20px;

      top: calc(50% - 10px);
      left: calc(50% - 75px);

      background-color: rgba(255, 255, 255, 0.2);

      &:before {
        @apply absolute bg-white opacity-100 z-0 w-0 top-0 left-0;
        content: '';
        height: 20px;
        transform-origin: 100% 0%;
        animation: loader 10s ease-in-out infinite;
      }

      &:after {
        @apply absolute text-white text-center font-extralight w-full top-0 left-0;
        content: 'LOADING ...';
        font-family: Lato, 'Helvetica Neue';
        font-size: 16px;
        height: 20px;
        line-height: 20px;
      }
    }
  }

  @-webkit-keyframes loader {
    0% {
      width: 0px;
    }
    70% {
      width: 100%;
      opacity: 1;
    }
    90% {
      opacity: 0;
      width: 100%;
    }
    100% {
      opacity: 0;
      width: 0px;
    }
  }

  @keyframes loader {
    0% {
      width: 0px;
    }
    70% {
      width: 100%;
      opacity: 1;
    }
    90% {
      opacity: 0;
      width: 100%;
    }
    100% {
      opacity: 0;
      width: 0px;
    }
  }
</style>
