<script setup>
import { ref } from "vue";
import {onMounted} from "vue";
import { useCounterStore } from "@/stores/counter.js";
import { useRouter } from "vue-router";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'
//引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf'
const store = useCounterStore()
const router = useRouter()
//挂载此页面先播放加载动画
const loading = ref(false)
onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  },3000)
})
//返回上一页
const goBack = () => {
  router.back()
}
//文件地址
const docx = ref('http://static.shanhuxueyuan.com/test6.docx')
//Excel地址
const excel = ref()
const  options = {
  xls: false,       //预览xlsx文件设为false；预览xls文件设为true
  minColLength: 0,  // excel最少渲染多少列，如果想实现xlsx文件内容有几列，就渲染几列，可以将此值设置为0.
  minRowLength: 0,  // excel最少渲染多少行，如果想实现根据xlsx实际函数渲染，可以将此值设置为0.
  widthOffset: 10,  //如果渲染出来的结果感觉单元格宽度不够，可以在默认渲染的列表宽度上再加 Npx宽
  heightOffset: 10, //在默认渲染的列表高度上再加 Npx高
  beforeTransformData: (workbookData) => {return workbookData}, //底层通过exceljs获取excel文件内容，通过该钩子函数，可以对获取的excel文件内容进行修改，比如某个单元格的数据显示不正确，可以在此自行修改每个单元格的value值。
  transformData: (workbookData) => {return workbookData}, //将获取到的excel数据进行处理之后且渲染到页面之前，可通过transformData对即将渲染的数据及样式进行修改，此时每个单元格的text值就是即将渲染到页面上的内容
}
//展示pdf
const pdf = ref('http://static.shanhuxueyuan.com/test.pdf')
</script>

<template>
  <div  class="w-full h-full relative block">
    <BreadCrumb />
    <el-divider style="margin-top: 5px;margin-bottom: 5px" />
    <!-- 返回上一个页面 -->
    <div  class="w-full h-10 relative py-1 flex justify-start">
      <el-button type="primary" @click="goBack">返回上一页</el-button>
    </div>
    <el-skeleton
        :rows="5"
        animated
        :loading="loading"
    >
      <div class="w-full content relative block">
        <vue-office-docx
            v-show="store.showDocx"
            :src="docx"
            style="width: 100%;height: 100%;display: block;position: relative"
        />
        <vue-office-excel
            :src="excel"
            :options="options"
            v-show="store.showExcel"
            style="width: 100%;height: 100%;display: block;position: relative"
        />
        <vue-office-pdf
            :src="pdf"
            style="width: 100%;height: 100%;display: block;position: relative"
            v-show="store.showPdf"
        />
      </div>
    </el-skeleton>
  </div>
</template>

<style scoped>
.content {
  height: calc(100% - 92px);
}
</style>