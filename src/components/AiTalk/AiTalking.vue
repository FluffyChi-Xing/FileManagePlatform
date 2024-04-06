<script setup>
import { ref } from "vue";

const isShow = ref(false);
</script>

<template>
  <div class="w-[700px] h-[400px] z-[799] absolute right-0 top-[30%] flex">
    <div v-show="isShow" class="w-[500px] h-full rounded-md overflow-hidden shadow-lg relative grid grid-cols-2 black">

    </div>
    <div @click="isShow = !isShow" class="w-[50px] black z-[999] overflow-hidden left-rounded h-8 relative ml-auto mt-[25%] flex shadow-lg">
      <div class="w-8 h-8 logo relative block">
        <img src="../../../public/favicon.ico" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-rounded {
  border-radius: 16px 0 0 16px;
}
.logo {
  border-radius: 16px;
  overflow: hidden;
}
.black {
  background-color: var(--el-bg-color-overlay);
  color: var(--el-text-color-primary);
}
</style>