<script setup>
import {ArrowRight} from "@element-plus/icons-vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()
//面包屑列表
const bread = ref()

//useRoute方法输出的是一个当前路由的数组
//根据数组的层数以及路径对面包屑的名称进行重命名
const direct = () => {
  bread.value = route.matched
  for (let i = 0;i < bread.value.length;i ++){
    switch (route.matched[i].path){
      case '/':
        bread.value[i].name = '首页'
            break;
      case '/congress':
        bread.value[i].name = '组会文件'
            break;
      case '/preview':
        bread.value[i].name = '预览'
            break;
      case '/project':
        bread.value[i].name = '项目资源'
            break;
      case '/paper':
        bread.value[i].name = '论文资源'
            break;
      case '/other':
        bread.value[i].name = '其他'
            break;
      case '/user':
        bread.value[i].name = '用户日志'
            break;
      case '/control':
        bread.value[i].name = '操作日志'
            break;
    }
  }
}
//通过获取当前路由地址完成动态面包屑导航
onMounted(() => {
  direct()
})
const change = ref()
change.value = route.fullPath
//当第一次挂载的时候加载一次，当路由地址变化后再次调用
watchEffect(change.value,() => {
  direct()
})
</script>

<template>
  <div class="w-full h-10 leading-10 relative block p-3 align-middle">
    <div class="w-full h-4 relative flex">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in bread" :key="item" :to="{ path: item.path.toString() }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<style scoped>

</style>