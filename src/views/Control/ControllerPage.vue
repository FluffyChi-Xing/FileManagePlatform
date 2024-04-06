<script setup>
import { ref } from "vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import { onMounted } from "vue";
import {useCounterStore} from "@/stores/counter.js";
import {ElMessage} from "element-plus";
const store = useCounterStore()
//操作日志列表
const controlList = ref([
  {
    id: 1,
    date: '2023-01-21',
    status: 'INFO',
    url: 'https://ffffff.vvvvv.cn',
    duration: '142ms',
    ip: '127.0.0.1:8089',
    code: '200'
  },
  {
    id: 2,
    date: '2023-01-21',
    status: 'WARN',
    url: 'https://ffffff.vvvvv.cn',
    duration: '142ms',
    ip: '127.0.0.1:8089',
    code: '404'
  },
  {
    id: 3,
    date: '2023-01-21',
    status: 'INFO',
    url: 'https://ffffff.vvvvv.cn',
    duration: '142ms',
    ip: '127.0.0.1:8089',
    code: '200'
  },
  {
    id: 4,
    date: '2023-01-21',
    status: 'INFO',
    url: 'https://ffffff.vvvvv.cn',
    duration: '142ms',
    ip: '127.0.0.1:8089',
    code: '200'
  }
])
//限制表单多选
const multipelTable = ref()
const checkRow = (selection) => {
  store.controllerTarget = selection
  if (selection.length > 1){
    let del_row = selection.shift()
    multipelTable.value.toggleRowSelection(del_row,false)
  }
}
const selectAll = (selection) => {
  if (selection.length > 1){
    selection.length = 1
  }
}
//删除错误数据
//如果用户未选中行，不可以进行删除错误

const deleteWrong = () => {
  if (store.controllerTarget[0]){
    ElMessage({
      type: 'success',
      message: '成功删除第' + `${store.controllerTarget[0].id}` + '行'
    })
  }else {
   ElMessage({
     type: 'warning',
     message: '请先指定要删除的行'
   })
  }
}
//根据表数据的类型判断告警的数量
const checkStatus = () => {
  if (controlList.value){
    for (let i = 0;i < controlList.value.length;i ++){
      if (controlList.value[i].status === 'WARN'){
        store.controlBadge += 1
      }
    }
  }
}
checkStatus()
//一进入先加载数据
const isLoading = ref(false)
onMounted(() => {
  isLoading.value = true
  store.controllerTarget = {}
  setTimeout(() => {
    isLoading.value = false
  },3000)
})
</script>

<template>
  <div class="w-full h-full relative block">
    <BreadCrumb />
    <el-divider style="margin-top: 5px;margin-bottom: 5px" />
    <div class="w-full control relative block">
      <el-skeleton
          animated
          :rows="8"
          :loading="isLoading"
      >
        <el-table
            stripe
            :data="controlList"
            @select="checkRow"
            @select-all="selectAll"
            ref="multipelTable"
        >
          <el-table-column type="selection" />
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="status"  label="状态"/>
          <el-table-column prop="url" label="URL" />
          <el-table-column prop="ip" label="IP" />
          <el-table-column prop="duration" label="响应时间" />
          <el-table-column prop="code" label="响应状态码" />
          <el-table-column label="操作">
            <el-button type="warning" size="small" plain @click="deleteWrong">删除</el-button>
          </el-table-column>
          <el-empty description="空空如也" />
        </el-table>
      </el-skeleton>
    </div>
    <!-- 底部分页 -->
    <div class="w-full h-10 absolute flex justify-center bottom-0">
      <el-pagination layout="前一页, pager, 下一页" :total="100" />
    </div>
  </div>
</template>

<style scoped>
.control {
  height: calc(100% - 92px);
}
</style>