<script setup>
import {ref} from "vue";
import { reactive } from "vue";
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
  store.otherTarget = {}
  setTimeout(() => {
    isLoading.value = false
  },3000)
})

//删除文件
const deleteFile = () => {
  if (store.otherTarget[0]){
    ElMessage({
      type: "success",
      message: '成功删除第' + `${store.otherTarget[0].id}` + '行'
    })
  }else {
    ElMessage({
      type: "warning",
      message: '请选择要删除的文件'
    })
  }
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

//编辑日志
const dialogVisible = ref(false)
const form = reactive({
  title: '',
  type: '',
  author: '',
  push: Date,
  file: []
})
const editLog = () => {
  if (store.otherTarget[0]){
    dialogVisible.value = true
    form.push = store.otherTarget[0].update
    form.type = store.otherTarget[0].type
    form.title = store.otherTarget[0].title
    value.value = store.otherTarget[0].author
  }else {
    ElMessage({
      type: "warning",
      message: '请先选择要编辑的条目'
    })
  }
}
//上传人选
const uploader = ref([
  {
    label: '张三',
    value: '张三'
  },
  {
    label: '李四',
    value: '李四'
  },
  {
    label: '王五',
    value: '王五'
  }
])
const value = ref()
const submit = () => {
  dialogVisible.value = false
  ElMessage({
    type: "success",
    message: '修改成功'
  })
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
            <el-button size="small" type="primary" @click="editLog">编辑</el-button>
            <el-button size="small" type="warning" plain @click="deleteFile">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-skeleton>
    <!-- 编辑弹框 -->
    <el-dialog
        draggable
        v-model="dialogVisible"
        title="编辑日志"
        style="height: auto"
        width="500px"
    >
      <div class="w-full h-auto relative block">
        <el-form
            v-model="form"
            label-width="150px"
            status-icon
        >
          <el-form-item label="文件标题">
            <el-input placeholder="请输入文件名" clearable v-model="form.title" />
          </el-form-item>
          <el-form-item label="文件类型">
            <el-input v-model="form.type" placeholder="请输入文件类型" clearable />
          </el-form-item>
          <el-form-item label="上传者">
            <el-select
                placeholder="请选择上传者"
                v-model="value"
            >
              <el-option v-for="item in uploader" :key="item" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="修改文件">
            <el-upload
                :limit="1"
                v-model="form.file"
            >
              <el-button type="primary" plain>上传文件</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  文件大小格式的限制.....
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传时间">
            <el-date-picker
                v-model="form.push"
                type="date"
                placeholder="请选择修改日期"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="primary" plain @click="dialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
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