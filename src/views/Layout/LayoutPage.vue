<script setup>
import SideBar from "@/components/Siderbar/SideBar.vue";
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter.js";
import {Expand, Fold} from "@element-plus/icons-vue";
import SuspendButton from "@/components/Notice/SuspendButton.vue";
import { useRouter } from "vue-router";
import TopFunction from "@/components/TopFunction/TopFunction.vue";
import { onMounted } from "vue";


const store = useCounterStore()
const icons = ref(Fold)
const router = useRouter()
//导航栏搜索框
const value = ref()
//当主页面挂载后先验证是否登录
const isLogin = () => {
  let user = localStorage.getItem('somebody')
  if (!user){
    router.replace('/login')
  }
}

onMounted(() => {
  isLogin()
})
//折叠菜单
const CloseOrOpen = () => {
  store.isCollapse = !store.isCollapse
  if (store.isCollapse) {
    icons.value = Expand
  }else {
    icons.value = Fold
  }
}

</script>

<template>
  <div class="w-screen h-screen relative block bg-white overflow-hidden">
    <div class="w-full h-10 shadow-sm z-10 black flex relative bg-white">
      <div class="w-[200px] h-full leading-10 text-center font-bold relative block">
        资产管理系统
      </div>
      <div class="h-full relative pr-8 flex" style="width: calc(100% - 200px)">
        <el-divider direction="vertical" style="height: 90%;margin-top: 2px" />
        <el-button
            style="height: 40px;border: none;outline: none"
            :icon="icons"
            class="w-10 h-10 relative block"
            @click="CloseOrOpen"
        />
        <div class="w-auto h-auto my-auto ml-4 block relative">
          <a-input-search
              v-model:value="value"
              placeholder="搜索"
              style="width: 200px"
          />
        </div>
        <TopFunction />
      </div>
    </div>
    <div class="w-full relative justify-between flex" style="height: calc(100% - 40px)">
      <a-layout>
        <a-layout-sider
            v-model:collapsed="store.isCollapse"
            :trigger="null"
            collapsible
            style="width: 240px;"
        >
          <SideBar />
        </a-layout-sider>
        <a-layout>
          <a-layout-content
              class="black"
              :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }"
          >

            <div class="w-full h-full relative block">
              <RouterView />
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
    <!--  浮动按钮  -->
    <SuspendButton />
  </div>
</template>

<style scoped>
.black {
  background-color: var(--el-bg-color-overlay);
  color: var(--el-text-color-primary);
}
</style>