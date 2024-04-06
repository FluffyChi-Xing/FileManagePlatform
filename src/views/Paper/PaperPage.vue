<script setup>
import { ref,reactive } from "vue";
import {onMounted} from "vue";
import {useCounterStore} from "@/stores/counter.js";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import {ElMessage, ElMessageBox} from "element-plus";
const store = useCounterStore()
const paperList = ref([
  {
    id: 1,
    title: 'IEEE',
    domain: '人工智能',
    type: '.pdf',
    code: '附带源码',
    push: '2024-09-18',
    author: '张三'
  },
  {
    id: 2,
    title: 'IEEE',
    domain: '人工智能',
    type: '.pdf',
    code: '附带源码',
    push: '2024-09-18',
    author: '张三'
  },
  {
    id: 3,
    title: 'IEEE',
    domain: '人工智能',
    type: '.pdf',
    code: '附带源码',
    push: '2024-09-18',
    author: '张三'
  },
  {
    id: 4,
    title: 'IEEE',
    domain: '人工智能',
    type: '.pdf',
    code: '附带源码',
    push: '2024-09-18',
    author: '张三'
  },
  {
    id: 5,
    title: 'IEEE',
    domain: '人工智能',
    type: '.pdf',
    code: '附带源码',
    push: '2024-09-18',
    author: '张三'
  },
  {
    id: 6,
    title: 'IEEE',
    domain: '人工智能',
    type: '.pdf',
    code: '附带源码',
    push: '2024-09-18',
    author: '张三'
  }
])
//表单修改绑定
const form = reactive({
  title: '',
  domain: '',
  type: '',
  code: '',
  push: Date,
  author: ''
})
//是否附带源码
const isCode = ref([
  {
    label: '附带源码',
    value: '附带源码'
  },
  {
    label: '不附带源码',
    value: '不附带源码'
  }
])
//选择上传者
const isAuthor = ref([
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
const values = ref()


//进入加载
const isLoading = ref(false)
onMounted(() => {
  store.paperTarget = {}
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  },3000)
})
//禁用多选
const multipelTable = ref()
//用于清除两个以上的选项，使得列表保持单选
const checkRow = (selection) => {
  store.paperTarget = selection
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

//删除
const deleteRow = () => {
  if (store.paperTarget[0]) {
    ElMessage({
      type: "success",
      message: '成功删除第' + store.paperTarget[0].id.toString() + '行'
    })
  }else {
    ElMessage({
      type: "warning",
      message: '请先选择要删除的行'
    })
  }
}

//编辑行
//dialog框
const dialogVisiable = ref(false)
const editRow = () => {
  if (store.paperTarget[0]) {
    dialogVisiable.value = true
    form.type = store.paperTarget[0].type
    form.push = store.paperTarget[0].push
    form.domain = store.paperTarget[0].domain
    form.title = store.paperTarget[0].title
    form.code = store.paperTarget[0].code
    form.author = store.paperTarget[0].author
  }else {
    ElMessage({
      type: "warning",
      message: '请选择要编辑的条目'
    })
  }
}

//保存修改
const saveStorge = () => {
  dialogVisiable.value = false
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
}
const handleClose = () => {
  ElMessageBox.confirm('你确定要退出吗?')
      .then(() => {
        saveStorge()
      })
      .catch((err) => {
        console.log(err)
      })
}
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <BreadCrumb />
    <el-divider style="margin-bottom: 5px;margin-top: 5px" />
    <!-- 顶部工具栏 -->
    <div class="w-full h-10 relative block py-1">
      <div class="w-full h-auto relative flex">
        <el-button type="primary">论文上传</el-button>
        <el-button type="primary" plain>论文下载</el-button>
      </div>
    </div>
    <el-skeleton
        animated
        :loading="isLoading"
        :rows="7"
    >
      <div class="w-full paper relative block">
        <el-table
            :data="paperList"
            ref="multipelTable"
            stripe
            @select="checkRow"
            @select-all="selectAll"
        >
          <el-table-column type="selection" />
          <el-table-column prop="title" label="期刊" />
          <el-table-column prop="domain" label="领域" />
          <el-table-column prop="type" label="论文格式" />
          <el-table-column prop="code" label="附带源码" />
          <el-table-column prop="push" label="上传时间" />
          <el-table-column prop="author" label="上传者" />
          <el-table-column label="操作">
            <el-button size="small" type="primary" @click="editRow">编辑</el-button>
            <el-button size="small" plain type="warning" @click="deleteRow">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-skeleton>
    <!-- 编辑对话框 -->
    <el-dialog
        v-model="dialogVisiable"
        title="编辑"
        width="500px"
        style="height: auto"
        :before-close="handleClose"
        draggable
    >
      <div class="w-full h-auto relative block overflow-hidden">
        <el-form
            v-model="form"
            label-width="150px"
        >
          <el-form-item label="期刊">
            <el-input v-model="form.title" clearable placeholder="请输入期刊名" />
          </el-form-item>
          <el-form-item label="上传人">
            <el-select
                v-model="values"
                placeholder="请选择上传者"
                style="width: 240px"
            >
              <el-option v-for="item in isAuthor" :key="item" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="领域">
            <el-input v-model="form.domain" clearable placeholder="请输入领域" />
          </el-form-item>
          <el-form-item label="格式">
            <el-input v-model="form.type" clearable placeholder="请输入论文格式" maxlength="10" show-word-limit />
          </el-form-item>
          <el-form-item label="上传日期">
            <el-date-picker
                v-model="form.push"
                type="date"
                placeholder="请选择上传日期"
            />
          </el-form-item>
          <el-form-item label="是否附带源码">
            <el-select v-model="value" placeholder="是否附带源码" style="width: 240px">
              <el-option v-for="item in isCode" :key="item" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisiable = false">取消</el-button>
          <el-button type="primary" @click="saveStorge">
            保存修改
          </el-button>
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
.paper {
  height: calc(100% - 136px);
}
</style>