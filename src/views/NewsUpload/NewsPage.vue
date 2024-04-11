<script setup>
import { ref } from "vue";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onMounted} from "vue";
import { onBeforeUnmount, shallowRef } from 'vue'
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import { Editor,Toolbar} from "@wangeditor/editor-for-vue";
import {ElMessage} from "element-plus";
const active = ref('first')
//骨架屏加载
// 内容 HTML
const valueHtml = ref('<p>hello</p>')
const isLoading = ref(false)
onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  },3000)
})
const title = ref()
//富文本编辑器
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const mode = ref('default')
//控制台
const form = ref({
  author: '',
  push: Date,
  type: '',
})
const domain = ref([
  {
    label: '人工智能',
    value: '人工智能'
  },
  {
    label: '图像处理',
    value: '图像处理'
  },
  {
    label: '语义分割',
    value: '语义分割'
  }
])
//保存至草稿箱
const save = ref(false)
const saveFile = () => {
  save.value = true
  setTimeout(() => {
    ElMessage({
      type: "success",
      message: '保存至草稿箱'
    })
    save.value = false
  },2000)
}
//草稿箱
const number = ref(0)
</script>

<template>
  <div class="w-full h-full relative block">
    <!-- 顶部面包屑 -->
    <BreadCrumb />
    <el-divider direction="horizontal" style="margin-top: 5px;margin-bottom: 5px" />
    <!-- 富文本编辑器 -->
    <el-tabs v-model="active">
      <el-tab-pane label="文章投稿" name="first">
        <el-skeleton animated :loading="isLoading" :rows="6">
          <div class="w-full h-[450px] relative grid grid-cols-3 gap-3">
            <!-- 左侧文本框 -->
            <div class="w-full h-full relative block col-span-2 mx-auto">
              <el-input v-model="title" placeholder="请输入标题" clearable maxlength="20" show-word-limit />
              <div style="height: calc(100% - 32px)" class="w-full edit relative block">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    style="height: 250px; overflow-y: hidden;"
                    v-model="valueHtml"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="handleCreated"
                />
              </div>
            </div>
            <!-- 右侧工具栏 -->
            <div class="w-full h-auto relative block">
              <el-card class="w-full h-auto relative block">
                <template #header>
                  <span>控制台</span>
                </template>
                <div class="block relative w-full h-auto">
                  <el-form label-width="auto" status-icon>
                    <el-form-item label="作者" prop="author">
                      <el-input clearable maxlength="15" show-word-limit v-model="form.author" placeholder="请输入作者" />
                    </el-form-item>
                    <el-form-item label="发布时间" prop="push">
                      <el-date-picker
                          v-model="form.push"
                          type="date"
                          placeholder="请选择创作日期"
                      />
                    </el-form-item>
                    <el-form-item label="选择分区" prop="type">
                      <el-select
                          placeholder="请选择分区"
                          v-model="form.type"
                      >
                        <el-option v-for="item in domain" :key="item" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                    <el-divider direction="horizontal" />
                    <div class="w-full h-10 relative flex justify-center overflow-hidden">
                      <el-button class="my-auto" type="primary">发布</el-button>
                      <el-button class="my-auto" type="primary" :loading="save" plain @click="saveFile">草稿箱</el-button>
                    </div>
                  </el-form>
                </div>
              </el-card>
            </div>
          </div>
        </el-skeleton>
      </el-tab-pane>
      <el-tab-pane label="草稿箱" name="second">
        <el-skeleton animated :loading="isLoading" :rows="6">
          <div class="relative block w-full h-[400px]">
            <div class="w-2/3 h-full relative block mx-auto">
              <el-card class="w-full h-full relative block overflow-hidden">
                <template #header>
                  <span class="font-bold">草稿箱({{number}})</span>
                </template>
                <div class="w-full h-[300px] relative block">
                  <el-empty />
                </div>
              </el-card>
            </div>
          </div>
        </el-skeleton>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.edit {
  border: 1px solid #c0bfbf;
}
</style>