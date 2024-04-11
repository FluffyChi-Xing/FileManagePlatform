<script setup>
import {useRouter} from "vue-router";
const router = useRouter()
const goBack = () => {
  router.replace('/')
}
</script>

<template>
  <div class="w-screen h-screen relative flex justify-center align-middle back overflow-hidden">
    <div class="w-[400px] h-[400px] shadow-md rounded-[5px] bg-white relative block my-auto">
      <div class="w-full title relative leading-[100px] text-[30px] block text-center text-black font-bold">
        哎呀~页面走失了
      </div>
      <a-empty class="w-full h-auto mt-auto relative block" style="margin-left: 0;margin-right: 0" />
      <div class="w-full h-[100px] relative flex justify-center mt-4 align-middle">
        <el-button type="primary" @click="goBack" class="my-auto">返回</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  height: calc(100% - 300px);
}
.back {
  background-image: url("../../assets/img/404.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>