import {createRouter, createWebHashHistory} from 'vue-router'
import LayoutPage from "@/views/Layout/LayoutPage.vue";
import NProgress from 'nprogress'
import HomePage from "@/components/HomePage/HomePage.vue";
import LoginPage from "@/views/Login/LoginPage.vue";
import CongressPage from "@/views/Congress/CongressPage.vue";
import PreviewPage from "@/views/Preview/PreviewPage.vue";
import ProjectPage from "@/views/Project/ProjectPage.vue";
import PaperPage from "@/views/Paper/PaperPage.vue";
import OtherPage from "@/views/Other/OtherPage.vue";
import UserLog from "@/views/Userlog/UserLog.vue";
import ControllerPage from "@/views/Control/ControllerPage.vue";
import ClintCenter from "@/views/ClientCenter/ClintCenter.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutPage,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/congress',
          name: 'congress',
          component: CongressPage
        },
        {
          path: '/preview',
          name: 'preview',
          component: PreviewPage
        },
        {
          path: '/project',
          name: 'project',
          component: ProjectPage
        },
        {
          path: '/paper',
          name: 'paper',
          component: PaperPage
        },
        {
          path: '/other',
          name: 'other',
          component: OtherPage
        },
        {
          path: '/user',
          name: 'user',
          component: UserLog
        },
        {
          path: '/control',
          name: 'control',
          component: ControllerPage
        },
        {
          path: '/client',
          name: 'client',
          component: ClintCenter
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})
router.beforeEach(async () => {
  // 开启进度条
  NProgress.start();
})

// 页面路由切换完毕的时候
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})



export default router
