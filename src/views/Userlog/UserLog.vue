<script setup>
import { ref } from "vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import {onMounted} from "vue";
import {ElMessage} from "element-plus";
import { useCounterStore } from "@/stores/counter.js";
const store = useCounterStore()
//日志列表
const userLog = ref([
  {
    id: 1,
    date: '2024-09-19',
    status: 'INFO',
    url: 'https://ffffff.vvvvv.cn',
    duration: '142ms',
    ip: '127.0.0.1:8089',
    code: '200'
  },
  {
    id: 2,
    date: '2024-09-19',
    status: 'WARN',
    url: 'https://ffffff.vvvvv.cn',
    duration: '142ms',
    ip: '127.0.0.1:8089',
    code: '200'
  },
  {
    id: 3,
    date: '2024-09-19',
    status: 'INFO',
    url: 'https://ffffff.vvvvv.cn',
    duration: '142ms',
    ip: '127.0.0.1:8089',
    code: '200'
  },
  {
    id: 4,
    date: '2024-09-19',
    status: 'INFO',
    url: 'https://ffffff.vvvvv.cn',
    duration: '142ms',
    ip: '127.0.0.1:8089',
    code: '200'
  },
  {
    id: 5,
    date: '2024-09-19',
    status: 'WARN',
    url: 'https://ffffff.vvvvv.cn',
    duration: '142ms',
    ip: '127.0.0.1:8089',
    code: '200'
  }
])

//从获取的数据中遍历status的值，同步给pinia
const checkStatu = () => {
  for (let i = 0;i < userLog.value.length;i ++){
    if (userLog.value[i].status === 'WARN'){
      store.badge ++
    }
  }
}
checkStatu()


//加载
const isLoading = ref(false)
onMounted(() => {
  isLoading.value = true
  store.userLogTarget = {}
  setTimeout(() => {
    isLoading.value = false
  },3000)
})
//删除文件
const deleteFile = () => {
  if (store.userLogTarget[0]){
    ElMessage({
      type: "success",
      message: '成功删除第' + `${store.userLogTarget[0].id}` + '行'
    })
    store.badge -= 1
  }else {
    ElMessage({
      type: "warning",
      message: '请选择要删除的日志'
    })
  }
}

//列表选择函数，用于确定选中了哪一行
const multipelTable = ref()
//用于清除两个以上的选项，使得列表保持单选
const checkRow = (selection) => {
  store.userLogTarget = selection
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
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <BreadCrumb />
    <el-divider style="margin-top: 5px;margin-bottom: 5px" />
    <el-skeleton
        :rows="7"
        animated
        :loading="isLoading"
    >
      <div class="w-full user relative block">
        <el-table
            stripe
            ref="multipelTable"
            :data="userLog"
            @select="checkRow"
            @select-all="selectAll"
        >
          <el-table-column type="selection" />
          <el-table-column label="日期" prop="date" />
          <el-table-column label="状态" prop="status" />
          <el-table-column label="URL" prop="url" />
          <el-table-column label="响应时间" prop="duration" />
          <el-table-column label="IP" prop="ip" />
          <el-table-column label="状态码" prop="code" />
          <el-table-column label="操作">
            <el-button type="warning" plain size="small" @click="deleteFile">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-skeleton>
    <!-- 底部分页 -->
    <div class="w-full h-10 absolute flex justify-center bottom-0">
      <el-pagination layout="前一页, pager, 下一页" :total="100" />
    </div>
  </div>
</template>

<style scoped>
.user {
  height: calc(100% - 92px);
}
</style>