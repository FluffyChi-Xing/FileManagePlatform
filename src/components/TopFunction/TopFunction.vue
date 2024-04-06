<script setup>
//全屏
import {useDark,useToggle} from "@vueuse/core";
import {ElMessage, ElMessageBox} from "element-plus";
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter.js";
const store = useCounterStore()
const router = useRouter()
const fullScreen = () => {
  //sign用于存放屏幕是否全屏的结果
  let sign = document.fullscreenElement
  if (!sign){
    document.documentElement.requestFullscreen()
  }else {
    document.exitFullscreen()
  }
}
//刷新
const reload = () => {
  location.reload()
}

//夜间模式

const isDark = useDark()
const toggle = () => {
  store.ifDark = isDark.value
  useToggle(isDark)
}
//用户注销
const exit = () => {
  setTimeout(() => {
    localStorage.removeItem('somebody')
    router.replace('/login')
    ElMessageBox({
      type: "success",
      message: "安全退出"
    })
  },2000)
}
//个人中心
const client = () => {
  router.push('/client')
  ElMessage({
    type: 'success',
    message: '个人中心'
  })
}
</script>

<template>
  <div class="w-[250px] h-full flex relative justify-between ml-auto">
    <div class="w-auto h-auto my-auto relative block">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="夜间模式"
          placement="bottom"
      >
        <el-switch v-model="isDark" @change="toggle" />
      </el-tooltip>
    </div>
    <div class="w-10 h-10 relative block">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="刷新"
          placement="bottom"
      >
        <el-button @click="reload" icon="Refresh" style="border: none;height: 40px;outline: none" class="w-full h-full relative block border-0" />
      </el-tooltip>
    </div>
    <div class="w-10 h-10 relative block">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="全屏"
          placement="bottom"
      >
        <el-button @click="fullScreen" icon="FullScreen" style="border: none;height: 40px;outline: none" class="w-full h-full relative block border-0" />
      </el-tooltip>
    </div>
    <div class="w-10 h-10 relative block">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="用户中心"
          placement="bottom"
      >
        <el-dropdown trigger="click">
          <img src="../../assets/img/user.png" alt="" class="w-[40px] h-[40px] user relative block overflow-hidden rounded-[20px]">
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="client">个人中心</el-dropdown-item>
              <el-dropdown-item divided @click="exit" >
                注销
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped>
.user {
  box-sizing: border-box;
}
.user:hover {
  border: 1px solid #ff6401;
}
</style>