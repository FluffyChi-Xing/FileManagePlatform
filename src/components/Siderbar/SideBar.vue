<script setup>
import {ref, h, reactive} from "vue";
import {
  PieChartOutlined,
  ApartmentOutlined,
  CodeOutlined,
  CoffeeOutlined,
  DatabaseOutlined,
  FileOutlined,
  EllipsisOutlined,
  SaveOutlined,
  SmileOutlined,
  BookOutlined,
  ExportOutlined,
  FolderOpenOutlined,
  UserOutlined,
  UnlockOutlined,
  TransactionOutlined, PaperClipOutlined, AndroidOutlined, PictureOutlined
} from '@ant-design/icons-vue';
import { useRoute } from "vue-router";
import { watchEffect } from "vue";
import { onMounted } from "vue";
import { useRouter} from "vue-router";
import {useCounterStore} from "@/stores/counter.js";
const store = useCounterStore()
/*
const updateMenu = () => {
  switch (route.fullPath){
    case '/':
      currentRoute.value.push('sub1')
          break;
    case '/congress':
      currentRoute.value.push(route.fullPath)
          break;
    case '/project':
      currentRoute.value.push(route.fullPath)
          break;
    case '/paper':
      currentRoute.value.push(route.fullPath)
          break;
    case '/other':
      currentRoute.value.push(route.fullPath)
          break;
    case '/user':
      currentRoute.value.push(route.fullPath)
      break;
  }
}

const currentRoute = ref([])

 */
const route = useRoute()
const router = useRouter()


const openKeys = ref(['sub1']);
//该组一挂载就根据当前路由持久化菜单


onMounted(() => {
  store.updateMenu()
})
//当路由方向改变后再次调用函数同步当前路由
watchEffect(route.fullPath,() => {
  store.updateMenu()
})
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = reactive([
  getItem('仪表盘','sub1',() => h(PieChartOutlined),null),
  getItem('共享文件', 'sub2', () => h(ApartmentOutlined), [
      getItem('组会文件','/congress',() => h(CoffeeOutlined),null),
      getItem('项目资源','/project',() => h(DatabaseOutlined),null),
      getItem('论文资源','sub2-1',() => h(FileOutlined),[
          getItem('论文汇总','/paper',() => h(PaperClipOutlined),null),
          getItem('人工智能','sub2-2',() => h(AndroidOutlined),null),
          getItem('图像处理','sub2-3',() => h(PictureOutlined),null)
      ]),
      getItem('其他','/other',() => h(EllipsisOutlined),null)
  ]),
  getItem('日志审计', 'sub3', () => h(CodeOutlined), [
    getItem('操作日志', '/control',() => h(SaveOutlined)),
    getItem('用户日志', '/user',() => h(SmileOutlined)),
  ]),
  getItem('文章管理','sub4',() => h(BookOutlined),[
      getItem('新闻发布','/news',() => h(ExportOutlined),null),
      getItem('新闻管理','/newscol',() => h(FolderOpenOutlined),null)
  ]),
  getItem('用户管理','sub5',() => h(UserOutlined),[
      getItem('权限分发','/userman',() => h(UnlockOutlined),null)
  ]),
  getItem('数字资产','sub6',() => h(TransactionOutlined),null)
]);
//菜单跳转函数
const jump = (e) => {
  switch (e.key){
    case '/congress':
      router.push('/congress')
          break;
    case 'sub1':
      router.push('/')
          break;
    case '/project':
      router.push('/project')
          break;
    case '/paper':
      router.push('/paper')
          break;
    case '/other':
      router.push('/other')
          break;
    case '/user':
      router.push('/user')
          break;
    case '/control':
      router.push('/control')
          break;
    case '/news':
      router.push('/news')
          break;
    case '/newscol':
      router.push('/newscol')
          break;
    case '/userman':
      router.push('/userman')
          break;
  }
}
</script>

<template>
  <div class="h-auto relative left-0 block">
    <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="store.currentRoute"
        style="height: 100vh"
        mode="inline"
        theme="dark"
        :items="items"
        @click="jump"
   />
  </div>
</template>

<style scoped>

</style>