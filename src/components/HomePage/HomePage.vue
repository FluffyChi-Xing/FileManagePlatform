<script setup>
import { ref } from "vue";
import {onMounted} from "vue";
import {useCounterStore} from "@/stores/counter.js";
import * as echarts from 'echarts'
import {watch} from "vue";
const store = useCounterStore()
const dashbord = ref([
  {
    id: 1,
    info: '在线',
    percent: 47,
    color: 'success'
  },
  {
    id: 2,
    info: '下线',
    percent: 41,
    color: 'exception'
  },
  {
    id: 3,
    info: '故障',
    percent: 2,
    color: 'exception'
  },
  {
    id: 4,
    info: '备用',
    percent: 5,
    color: 'normal'
  },
  {
    id: 5,
    info: '未知',
    percent: 5,
    color: 'normal'
  }
])
//挂载后获取echarts容器，渲染echarts图

//尝试同步echarts的夜间模式
const darkTheme = ref('')
watch(() => store.ifDark,() => {
  console.log(darkTheme.value)
  if (store.ifDark === true){
    darkTheme.value = 'dark'
  }else {
    darkTheme.value = ''
  }
})
onMounted(() => {
  //用于解决面包屑返回首页后，菜单不正确显示
  //先将currentRoute置空
  store.currentRoute = []
  //更新菜单
  store.updateMenu()
  //各状态资产数量表
  const mychart = echarts.init(document.getElementById('ch_1'),darkTheme.value)
  //各类型资产数量表
  const mycharts = echarts.init(document.getElementById('ch_2'),darkTheme.value)
  const option = {
    title: {
      text: '各状态资产数量',
      left: 'left'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
  const option_2 = {
    title: {
      text: '各状态资产数量',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: 'bottom'
    },
    series: [
      {
        name: 'xxx资产',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  mychart.setOption(option)
  mycharts.setOption(option_2)
})
</script>

<template>
  <div class="w-full h-full px-4 pb-4 relative block none-scroll select-none overflow-y-scroll">
    <div class="w-full black h-4 relative block text-left font-bold px-4 leading-4 overflow-hidden text-ellipsis text-black text-[15px]">
      仪表盘
    </div>
    <div class="w-full h-full relative block">
      <!-- 设备状态 -->
      <el-card class="w-full p-4 h-[270px] relative flex mt-4">
        <div class="w-full black h-4 leading-4 text-black text-left text-[16px] font-bold relative flex">
          设备状态(百分比)
        </div>
        <div class="w-[1140px] relative flex justify-between h-[180px]">
          <div v-for="item in dashbord" :key="item" class="w-[150px] h-[180px] relative block">
            <div class="w-full h-[150px] p-4 relative block overflow-hidden">
              <a-progress style="margin: auto" type="circle" :status="item.color" :percent="item.percent">
                <template #format="percent">
                  <span style="color: red">{{ percent }}</span>
                </template>
              </a-progress>
            </div>
            <div class="w-full black h-[30px] leading-[30px] text-center text-black font-bold">
              {{item.info}}
            </div>
          </div>
        </div>
      </el-card>
      <div class="w-full h-auto relative grid grid-cols-2 gap-4">
        <!-- 资产状态 -->
        <el-card id="ch_1" class="black w-full mt-4 p-3 h-[350px] relative block overflow-hidden">

        </el-card>
        <!-- 资产数量 -->
        <el-card id="ch_2" class="black w-full mt-4 p-3 h-[350px] relative block overflow-hidden">

        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.black {
  background-color: var(--el-bg-color-overlay);
  color: var(--el-text-color-primary);
}
.none-scroll {
  scrollbar-width: thin;
}
.el-card__body {
  width: 100%;
}
</style>