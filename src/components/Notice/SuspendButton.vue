<script setup>
import { ref } from "vue";
import {BarsOutlined, CustomerServiceOutlined} from "@ant-design/icons-vue";
import {useRouter} from "vue-router";
import {useCounterStore} from "@/stores/counter.js";
import {watchEffect} from "vue";

const store = useCounterStore()
const router = useRouter()
//为了仿制路由切换后因为sidebar没有二次挂载导致菜单位置的错误
//现在将菜单刷新的函数封装在pinia中，在使用悬浮按钮跳转/user前
//先将currentRoute数组置空，然后调用更新函数重新赋值
const jumpTo = () => {
  router.push('/user')
  store.currentRoute = []
  store.currentRoute.push('/user')
}
const jumpToControl = () => {
  router.push('/control')
  store.currentRoute = []
  store.currentRoute.push('/control')
}
//根据/user数据中的告警数量，动态设置图标数字
//上限为99，超过99后仍显示为99
const badgeNum = ref()
const controller = ref()
const updateControl = () => {
  if (store.controlBadge <= 99 && store.badge >= 0){
    controller.value = store.controlBadge
  }
  if (store.controlBadge > 99){
    controller.value = 99
  }
  if (store.controlBadge <= 0){
    controller.value = 0
  }
}
const updateBadge = () => {
  if (store.badge <= 99 && store.badge >= 0){
    badgeNum.value = store.badge
  }
  if (store.badge > 99){
    badgeNum.value = 99
  }
  if (store.badge <= 0){
    badgeNum.value = 0
  }
}

updateBadge()
updateControl()
watchEffect(() => store.badge,() => {
  updateBadge()
})

//待解决的问题
//告警按钮的数据目前只能在userLOg页面挂载后获取，失去了设计意义，应该将所有的请求抽离到utils.js，
//在整个layout挂载的时候就去请求userLog的数据
//将错误信息绑定给SuspendButton
</script>

<template>
  <a-float-button-group trigger="click" type="primary" :style="{ right: '24px' }">
    <a-float-button @click="jumpToControl" :badge="{count: controller}">
      <template #icon>
        <CustomerServiceOutlined />
      </template>
    </a-float-button>
    <a-float-button @click="jumpTo" :badge="{count: badgeNum}">
      <template #icon>
        <BarsOutlined />
      </template>
    </a-float-button>
  </a-float-button-group>
</template>

<style scoped>

</style>