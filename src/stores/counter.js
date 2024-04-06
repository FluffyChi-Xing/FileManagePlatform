import { ref, computed,reactive } from 'vue'
import { defineStore } from 'pinia'
import {useRoute} from "vue-router";

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const isCollapse = ref(false)
  const currentRoute = ref([])
  const badge = ref(0)
  const controlBadge = ref(0)
  const congressTarget = reactive({})
  const userLogTarget = reactive({})
  const controllerTarget = reactive({})
  const projectTarget = reactive({})
  const paperTarget = reactive({})
  const otherTarget = reactive({})
  const showDocx = ref(true)
  const showExcel = ref(false)
  const showPdf = ref(false)
  const ifDark = ref()
  function updateMenu() {
    const route  = useRoute()
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
      case '/control':
        currentRoute.value.push(route.fullPath)
        break;
    }
  }

  return {
    count,
    doubleCount,
    updateMenu,
    isCollapse,
    currentRoute,
    badge,
    congressTarget,
    showExcel,
    showDocx,
    showPdf,
    ifDark,
    userLogTarget,
    controllerTarget,
    controlBadge,
    projectTarget,
    paperTarget,
    otherTarget
  }
})
