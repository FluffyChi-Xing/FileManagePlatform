<script setup>
import { ref } from "vue";
import {onMounted} from "vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import {reactive} from "vue";
import { useCounterStore} from "@/stores/counter.js";
import router from "@/router/index.js";
import {ElMessage, ElMessageBox} from "element-plus";
const store = useCounterStore()
//文件系统搜索数据
const value = ref()
//文件列表
const tableList = ref([
  {
    id: 1,
    name: 'xxxx顶刊论文',
    size: '788kb',
    author: '张三',
    date: '2024-03-12',
    update: '2024-04-12',
    type: '.docx',
    theme: 'xxxxx'
  },
  {
    id: 2,
    name: 'xxxx顶刊论文',
    size: '788kb',
    author: '张三',
    date: '2024-03-12',
    update: '2024-04-12',
    type: '.docx',
    theme: 'xxxxx'
  },
  {
    id: 3,
    name: 'xxxx顶刊论文',
    size: '788kb',
    author: '张三',
    date: '2024-03-12',
    update: '2024-04-12',
    type: '.excel',
    theme: 'xxxxx'
  },
  {
    id: 4,
    name: 'xxxx顶刊论文',
    size: '788kb',
    author: '张三',
    date: '2024-03-12',
    update: '2024-04-12',
    type: '.docx',
    theme: 'xxxxx'
  },
  {
    id: 5,
    name: 'xxxx顶刊论文',
    size: '788kb',
    author: '张三',
    date: '2024-03-12',
    update: '2024-04-12',
    type: '.pdf',
    theme: 'xxxxx'
  },
  {
    id: 6,
    name: '吃大餐照片',
    size: '1488kb',
    author: '张三',
    date: '2024-04-12',
    update: '2024-04-12',
    type: '.png',
    theme: 'xxxxx'
  }
])
//进入加载
const isLoading = ref(false)
onMounted(() => {
  //每次加载组会页面先把congressTarget清空
  //注意reactive是对象的形式
  store.congressTarget = {}
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  },3000)
})
//上传弹窗
const dialogVisible = ref(false)
const upload = () => {
  dialogVisible.value = true
}
//新建组会文件
const form = reactive({
  theme: '',
  sn: '',
  name: '',
  date: Date,
  author: '',
  file: []
})
const uploadFile = () => {
  if (form.author !== ''){
    ElMessage({
      type: 'success',
      message: '创建成功'
    })
    dialogVisible.value = false
  }else {
    ElMessage({
      type: 'warning',
      message: '创建文件不能含有空字段'
    })
  }
}
//分享文件弹框
const isShow = ref(false)
const showDialog = () => {
  isShow.value = true
}
//分享文件二维码
const fileLink = ref('http://static.shanhuxueyuan.com/test.pdf')
const qrcodeCanvasRef = ref();
const dowloadChange = async () => {
  const url = await qrcodeCanvasRef.value.toDataURL();
  const a = document.createElement('a');
  a.download = 'QRCode.png';
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
//编辑文件
const drawer = ref(false)

//编辑表单数据
const editForm = reactive({
  theme: '',
  date: Date,
  file: [],
  author: '',
  title: ''
})
//编辑表单
//如果未选择行，拦截，无法编辑
//如果选中某行，将数据同步给drawer
const editFile = () => {
  if (store.congressTarget[0]){
    editForm.theme = store.congressTarget[0].theme
    editForm.date = store.congressTarget[0].date
    editForm.author = store.congressTarget[0].author
    editForm.title = store.congressTarget[0].name
    drawer.value = true
  }else {
    ElMessage({
      type: "warning",
      message: '请先选择要编辑的行'
    })
  }
}
//保存编辑
const storgeEdit = () => {
  drawer.value = false
  ElMessage({
    type: 'success',
    message: '成功修改'
  })
}
//关闭抽提前提醒用户保存文件
//如果用户忘记保存并退出，系统强制保存一次
const checkClose = () => {
  ElMessageBox.confirm('关闭窗口前请确认保存了数据')
      .then(() => {
        storgeEdit()
      })
      .catch((err) => {
        console.log(err)
      })
}
//删除相应的文件
const deleteFile = () => {
  if (store.congressTarget[0]){
    ElMessage({
      type: "success",
      message: '成功删除第' + `${store.congressTarget[0].id}` + '行'
    })
  }else {
    ElMessage({
      type: "warning",
      message: '请先选择要删除的行'
    })
  }
}
//列表选择函数，用于确定选中了哪一行
const multipelTable = ref()
//用于清除两个以上的选项，使得列表保持单选
const checkRow = (selection) => {
  store.congressTarget = selection
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
//预览跳转页面
//如果用户未选择预览文件，将拦截请求并做出反馈
const preview = () => {
  if (store.congressTarget[0]){
    if (store.congressTarget[0].type === '.docx'){
      store.showPdf = false
      store.showExcel = false
      store.showDocx = true
      router.push('/preview')
      ElMessage({
        type: "success",
        message: '加载中'
      })
    }
    if (store.congressTarget[0].type === '.excel'){
      store.showPdf = false
      store.showExcel = true
      store.showDocx = false
      router.push('/preview')
      ElMessage({
        type: "success",
        message: '加载中'
      })
    }
    if (store.congressTarget[0].type === '.pdf'){
      store.showPdf = true
      store.showExcel = false
      store.showDocx = false
      router.push('/preview')
      ElMessage({
        type: "success",
        message: '加载中'
      })
    }
    if (store.congressTarget[0].type === '.png' || store.congressTarget[0].type === '.jpg') {
      ElMessage({
        type: "warning",
        message: '当前格式文件不支持预览'
      })
    }
  }else {
    ElMessage({
      type: "warning",
      message: '请先要预览哪个文件'
    })
  }
}
</script>

<template>
  <div class="w-full h-full thine-scroller relative block overflow-hidden">
    <BreadCrumb />
    <el-divider style="margin-top: 5px;margin-bottom: 10px" />
    <!-- 顶部工具栏 -->
    <div class="w-full h-10 relative flex px-4">
      <el-button class="my-auto" type="primary" @click="upload">新建</el-button>
      <el-button class="my-auto" type="primary" plain @click="preview">预览</el-button>
      <el-button class="my-auto" type="primary" plain>下载</el-button>
      <el-button class="my-auto" type="primary" plain @click="showDialog">分享</el-button>
      <!-- 文件系统搜索框 -->
      <div class="w-[200px] h-full relative block ml-auto py-1">
        <el-input v-model="value" clearable placeholder="搜索" prefix-icon="Search" />
      </div>
      <!-- 搜索按钮 -->
      <div class="w-[80px] h-full py-1 relative block ml-4">
        <el-button type="info" plain >搜索</el-button>
      </div>
    </div>
    <!-- 文件列表 -->
    <el-skeleton
        animated
        :rows="8"
        :loading="isLoading"
    >
      <div class="w-full high relative block mt-4">
        <el-table
            ref="multipelTable"
            class="w-full h-full relative block"
            :data="tableList"
            stripe
            @select-all="selectAll"
            @select="checkRow"
        >
          <el-table-column label="选择" type="selection" />
          <el-table-column prop="theme" label="组会主题" />
          <el-table-column prop="id" label="SN序列号" />
          <el-table-column prop="name" label="文件名" />
          <el-table-column prop="size" label="文件大小" />
          <el-table-column prop="type" label="文件类型" />
          <el-table-column prop="date" label="上传日期" />
          <el-table-column prop="update" label="修改日期" />
          <el-table-column prop="author" label="上传来源" />
          <el-table-column label="操作">
            <el-button size="small" type="primary" @click="editFile">编辑</el-button>
            <el-button size="small" type="warning" plain @click="deleteFile">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-skeleton>
    <!-- 底部分页 -->
    <div class="w-full h-10 absolute flex justify-center bottom-0">
      <el-pagination layout="前一页, pager, 下一页" :total="100" />
    </div>
    <!-- 上传弹出框 -->
    <el-dialog
        v-model="dialogVisible"
        title="新建组会文件"
        width="500"
        draggable
    >
      <div class="w-full h-[260px] relative block">
        <el-form
            :model="form"
        >
          <el-form-item label-width="150px" label="文件主题">
            <el-input v-model="form.theme" clearable placeholder="请输入文件主题" />
          </el-form-item>
          <el-form-item label-width="150px" label="文件名称">
            <el-input v-model="form.name" clearable placeholder="请输入文件名称" />
          </el-form-item>
          <el-form-item label-width="150px" label="上传日期">
            <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期"
                size="default"
            />
          </el-form-item>
          <el-form-item label-width="150px" label="上传人">
            <el-select v-model="form.author" placeholder="选择创建者" style="width: 240px">
              <el-option
                  label="张三"
                  value="张三"
              />
            </el-select>
          </el-form-item>
          <el-form-item label-width="150px" label="上传文件">
            <el-upload limit="1" v-model="form.file">
              <el-button type="primary" plain size="small">选择上传文件</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  只允许 图片/word/pdf/excel 格式的文件并小于 1mb.
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="uploadFile">
            新建
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 分享弹框 -->
    <el-dialog
        width="500px"
        v-model="isShow"
        title="分享"
        draggable
    >
      <div class="w-full h-[200px] relative block">
        <div class="w-[160px] h-[160px] relative block m-auto">
          <a-qrcode ref="qrcodeCanvasRef" :value="fileLink" />
        </div>
        <div class="w-full h-[30px] mt-[10px] relative flex justify-center">
          <a-button type="primary" @click="dowloadChange">保存二维码</a-button>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="isShow = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 修改文件抽屉 -->
    <el-drawer v-model="drawer" title="编辑文件" :with-header="true" :before-close="checkClose">
      <el-form
          v-model="editForm"
      >
        <el-form-item label-width="150px" label="文件主题">
          <el-input v-model="editForm.theme" clearable placeholder="请输入文件主题" />
        </el-form-item>
        <el-form-item label-width="150px" label="文件标题">
          <el-input placeholder="请输入文件标题" clearable v-model="editForm.title" />
        </el-form-item>
        <el-form-item label-width="150px" label="重新选择文件">
          <el-upload limit="1" v-model="editForm.file">
            <el-button type="primary" plain size="small">选择上传文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                只允许 图片/word/pdf/excel 格式的文件并小于 1mb.
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label-width="150px" label="选择日期">
          <el-date-picker
              v-model="editForm.date"
              type="date"
              placeholder="选择日期"
              size="default"
          />
        </el-form-item>
        <el-form-item label-width="150px" label="选择修改人">
          <el-select v-model="editForm.author" placeholder="选择创建者" style="width: 240px">
            <el-option
                label="张三"
                value="张三"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="确认修改" label-width="150px">
          <el-button type="primary" @click="storgeEdit">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<style scoped>
.thine-scroller {
  scrollbar-width: thin;
}
.high {
  height: calc(100% - 110px);
}
</style>