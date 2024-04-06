<script setup>
import {ref} from "vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import {onMounted} from "vue";
import {useCounterStore} from "@/stores/counter.js";
import {ElMessage} from "element-plus";

const store = useCounterStore()
const other = ref([
  {
    id: 1,
    title: 'xxxxx.webp',
    type: '.webp',
    author: '王五',
    push: '2023-09-17',
    update: '2023-10-02'
  },
  {
    id: 2,
    title: 'xxxxx.webp',
    type: '.webp',
    author: '王五',
    push: '2023-09-17',
    update: '2023-10-02'
  },
  {
    id: 3,
    title: 'xxxxx.webp',
    type: '.webp',
    author: '王五',
    push: '2023-09-17',
    update: '2023-10-02'
  },
  {
    id: 4,
    title: 'xxxxx.webp',
    type: '.webp',
    author: '王五',
    push: '2023-09-17',
    update: '2023-10-02'
  },
  {
    id: 5,
    title: 'xxxxx.webp',
    type: '.webp',
    author: '王五',
    push: '2023-09-17',
    update: '2023-10-02'
  }
])
//加载
const isLoading = ref(false)
onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  },3000)
})

//删除文件
const deleteFile = () => {
  ElMessage({
    type: "success",
    message: '删除成功'
  })
}

//禁用多选
const multipelTable = ref()
//用于清除两个以上的选项，使得列表保持单选
const checkRow = (selection) => {
  store.otherTarget = selection
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
    <!-- 顶部功能栏 -->
    <div class="w-full h-10 relative block py-1">
      <div class="w-full h-auto relative flex">
        <el-button type="primary">上传文件</el-button>
        <el-button type="primary" plain>下载文件</el-button>
      </div>
    </div>
    <el-skeleton
        :loading="isLoading"
        animated
        :rows="7"
    >
      <div class="w-full other relative block">
        <el-table
            ref="multipelTable"
            :data="other"
            @select="checkRow"
            @select-all="selectAll"
        >
          <el-table-column type="selection" />
          <el-table-column prop="title" label="文件名"/>
          <el-table-column prop="type" label="文件类型"/>
          <el-table-column prop="author" label="上传者"/>
          <el-table-column prop="push" label="上传时间"/>
          <el-table-column prop="update" label="更改时间"/>
          <el-table-column fixed="right" label="操作">
            <el-button size="small" type="primary">编辑</el-button>
            <el-button size="small" type="warning" plain @click="deleteFile">删除</el-button>
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
.other {
  height: calc(100% - 92px);
}
</style>