<script setup>
//项目资源管理页面
import { ref,reactive } from "vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import {onMounted} from "vue";
import {useCounterStore} from "@/stores/counter.js";
import {ElMessage, ElMessageBox} from "element-plus";
const store = useCounterStore()
const isLoading = ref(false)
onMounted(() => {
  isLoading.value = true
  store.projectTarget = {}
  setTimeout(() => {
    isLoading.value = false
  },3000)
})
//项目列表
const projectList = ref([
  {
    id: 1,
    admin: '李四',
    from: '2023-10-04',
    to: '2024-03-05',
    source: 'xxxhxhhhx.php',
    push: '2024-02-15',
    author: '王五',
    more: '在汽车、铸造、冶金等行业中常会用到钢印技术，' +
        '钢印字符主要应用于各类硬质外表面上，多具有字符' +
        '与背景颜色相近、背景易反光、字符印迹不明显、字符' +
        '倾斜等特征。因此，使用传统方法对钢印字符进行检测时' +
        '，容易受到各类因素的干扰导致检测准确率低。与市面上' +
        '的各种识别算法进行了实验与比较，最终本项目在Faster' +
        ' RCNN模型的基础进行了进一步的改进，是其能够准确识别' +
        '印迹不明显的字符。随着样本集的不断增加，准确率可达90' +
        '%以上。\n'
  },
  {
    id: 2,
    admin: '李四',
    from: '2023-10-04',
    to: '2024-03-05',
    source: 'xxxhxhhhx.php',
    push: '2024-02-15',
    author: '王五',
    more: '在汽车、铸造、冶金等行业中常会用到钢印技术，' +
        '钢印字符主要应用于各类硬质外表面上，多具有字符' +
        '与背景颜色相近、背景易反光、字符印迹不明显、字符' +
        '倾斜等特征。因此，使用传统方法对钢印字符进行检测时' +
        '，容易受到各类因素的干扰导致检测准确率低。与市面上' +
        '的各种识别算法进行了实验与比较，最终本项目在Faster' +
        ' RCNN模型的基础进行了进一步的改进，是其能够准确识别' +
        '印迹不明显的字符。随着样本集的不断增加，准确率可达90' +
        '%以上。\n'
  },
  {
    id: 3,
    admin: '李四',
    from: '2023-10-04',
    to: '2024-03-05',
    source: 'xxxhxhhhx.php',
    push: '2024-02-15',
    author: '王五',
    more: '在汽车、铸造、冶金等行业中常会用到钢印技术，' +
        '钢印字符主要应用于各类硬质外表面上，多具有字符' +
        '与背景颜色相近、背景易反光、字符印迹不明显、字符' +
        '倾斜等特征。因此，使用传统方法对钢印字符进行检测时' +
        '，容易受到各类因素的干扰导致检测准确率低。与市面上' +
        '的各种识别算法进行了实验与比较，最终本项目在Faster' +
        ' RCNN模型的基础进行了进一步的改进，是其能够准确识别' +
        '印迹不明显的字符。随着样本集的不断增加，准确率可达90' +
        '%以上。\n'
  },
  {
    id: 4,
    admin: '李四',
    from: '2023-10-04',
    to: '2024-03-05',
    source: 'xxxhxhhhx.php',
    push: '2024-02-15',
    author: '王五',
    more: '在汽车、铸造、冶金等行业中常会用到钢印技术，' +
        '钢印字符主要应用于各类硬质外表面上，多具有字符' +
        '与背景颜色相近、背景易反光、字符印迹不明显、字符' +
        '倾斜等特征。因此，使用传统方法对钢印字符进行检测时' +
        '，容易受到各类因素的干扰导致检测准确率低。与市面上' +
        '的各种识别算法进行了实验与比较，最终本项目在Faster' +
        ' RCNN模型的基础进行了进一步的改进，是其能够准确识别' +
        '印迹不明显的字符。随着样本集的不断增加，准确率可达90' +
        '%以上。\n'
  },
  {
    id: 5,
    admin: '李四',
    from: '2023-10-04',
    to: '2024-03-05',
    source: 'xxxhxhhhx.php',
    push: '2024-02-15',
    author: '王五',
    more: '在汽车、铸造、冶金等行业中常会用到钢印技术，' +
        '钢印字符主要应用于各类硬质外表面上，多具有字符' +
        '与背景颜色相近、背景易反光、字符印迹不明显、字符' +
        '倾斜等特征。因此，使用传统方法对钢印字符进行检测时' +
        '，容易受到各类因素的干扰导致检测准确率低。与市面上' +
        '的各种识别算法进行了实验与比较，最终本项目在Faster' +
        ' RCNN模型的基础进行了进一步的改进，是其能够准确识别' +
        '印迹不明显的字符。随着样本集的不断增加，准确率可达90' +
        '%以上。\n'
  }
])
//新建项目弹框
const dialogVisible = ref(false)
const form = reactive({
  manager: '',
  from: Date,
  to: Date,
  file: [],
  date: Date,
  author: '',
  more: ''
})
const manager = ref([
  {
    id: '张三',
    name: '张三'
  },
  {
    id: '李四',
    name: '李四'
  },
  {
    id: '王五',
    name: '王五'
  }
])
//删除项目
const deleteFile = () => {
  if (store.projectTarget[0]){
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  }else {
    ElMessage({
      type: "warning",
      message: '请选择要删除哪一行'
    })
  }
}
//编辑项目
const drawer = ref(false)

//禁用多选
const multipelTable = ref()
//用于清除两个以上的选项，使得列表保持单选
const checkRow = (selection) => {
  store.projectTarget = selection
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
//新建项目
const createPro = () => {
  dialogVisible.value = true
}
//下载文件
const downLoad = () => {
  if (store.projectTarget[0]){
    ElMessage({
      type: "success",
      message: '正在开始下载'
    })
    setTimeout(() => {
      ElMessage({
        type: "success",
        message: '下载成功'
      })
    },2000)
  }else {
    ElMessage({
      type: 'warning',
      message: '请选择需要下载的文件'
    })
  }
}

//编辑项目
const editTarget = () => {
  if (store.projectTarget[0]){
    drawer.value = true
    form.more = store.projectTarget[0].more
    form.from = store.projectTarget[0].from
    form.to = store.projectTarget[0].to
    form.manager = store.projectTarget[0].manager
    form.author = store.projectTarget[0].author
  }else {
    ElMessage({
      type: "warning",
      message: '请先选择要编辑的条目'
    })
  }
}
//保存修改
const saveEdit = () => {
  drawer.value = false
  ElMessage({
    type: "success",
    message: '保存成功'
  })
}
//自动保存
const autoSave = () => {
  ElMessageBox.confirm('关闭窗口前请确认保存了数据')
      .then(() => {
        saveEdit()
      })
      .catch((err) => {
        console.log(err)
      })
}
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <BreadCrumb />
    <el-divider style="margin-top: 5px;margin-bottom: 5px" />
    <!-- 顶部功能栏 -->
    <div class="w-full h-10 relative block py-1">
      <div class="w-full h-auto relative block">
        <el-button type="primary" @click="createPro">新建项目</el-button>
        <el-button type="primary" plain @click="downLoad">下载文件</el-button>
      </div>
    </div>
    <el-skeleton
        animated
        :rows="7"
        :loading="isLoading"
    >
      <div class="w-full project relative block overflow-x-hidden">
        <el-table
            stripe
            @select="checkRow"
            @select-all="selectAll"
            ref="multipelTable"
            :data="projectList"
        >
          <el-table-column label="选择" type="selection" />
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="admin" label="项目主理人" />
          <el-table-column prop="from" label="开始时间" />
          <el-table-column prop="to" label="截止时间" />
          <el-table-column label="备注" prop="more" type="expand">
            <template #default="props">
              <div m="4">
                <p m="t-0 b-2">备注: {{ props.row.more }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="项目源码" />
          <el-table-column prop="push" label="上传时间" />
          <el-table-column prop="author" label="上传者" />
          <el-table-column label="操作">
            <el-button size="small" type="primary" @click="editTarget">编辑</el-button>
            <el-button size="small" plain type="warning" @click="deleteFile">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-skeleton>
    <!-- 新建项目弹框 -->
    <el-dialog
        v-model="dialogVisible"
        title="新建组会文件"
        width="500"
        draggable
    >
      <div class="w-full h-auto relative block">
        <el-form
            :model="form"
        >
          <el-form-item label-width="150px" label="项目主理人">
            <el-select v-model="form.manager" placeholder="项目主理人" style="width: 240px">
              <el-option
                  v-for="item in manager"
                  :label="item.id"
                  :value="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label-width="150px" label="发起时间">
            <el-date-picker
                v-model="form.from"
                type="date"
                placeholder="发起时间"
                size="default"
            />
          </el-form-item>
          <el-form-item label-width="150px" label="截止时间">
            <el-date-picker
                v-model="form.to"
                type="date"
                placeholder="截止时间"
                size="default"
            />
          </el-form-item>
          <el-form-item label-width="150px" label="上传时间">
            <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="上传时间"
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
          <el-form-item label-width="150px" label="备注">
            <el-input v-model="form.more" placeholder="请输入备注" style="width: 240px" maxlength="150" clearable show-word-limit />
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
          <el-button type="primary" @click="dialogVisible = false">
            新建
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 编辑抽屉 -->
    <el-drawer
        title="编辑项目"
        :with-header="true"
        v-model="drawer"
        :before-close="autoSave"
    >
      <el-form
          :model="form"
      >
        <el-form-item label-width="150px" label="项目主理人">
          <el-select v-model="form.manager" placeholder="项目主理人" style="width: 240px">
            <el-option
                v-for="item in manager"
                :label="item.id"
                :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="150px" label="发起时间">
          <el-date-picker
              v-model="form.from"
              type="date"
              placeholder="发起时间"
              size="default"
          />
        </el-form-item>
        <el-form-item label-width="150px" label="截止时间">
          <el-date-picker
              v-model="form.to"
              type="date"
              placeholder="截止时间"
              size="default"
          />
        </el-form-item>
        <el-form-item label-width="150px" label="上传时间">
          <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="上传时间"
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
        <el-form-item label-width="150px">
          <el-button type="primary" @click="saveEdit">确认编辑</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 底部分页 -->
    <div class="w-full h-10 absolute flex justify-center bottom-0">
      <el-pagination layout="前一页, pager, 下一页" :total="100" />
    </div>
  </div>
</template>

<style scoped>
.project {
  height: calc(100% - 132px);
}
</style>