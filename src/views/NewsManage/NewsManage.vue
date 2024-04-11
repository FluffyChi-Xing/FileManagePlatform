<script setup>
import { ArrowUpOutlined,ArrowDownOutlined } from '@ant-design/icons-vue';
import { LikeOutlined,CommentOutlined } from "@ant-design/icons-vue";
import {onMounted} from "vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import { ref } from "vue";
//骨架屏加载
const isLoading = ref(false)
onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  },3000)
})
const table = ref([
  {
    id: 1,
    author: '张三',
    type: '人工智能',
    push: '2024-09-12',
    isUp: false
  },
  {
    id: 2,
    author: '张三',
    type: '人工智能',
    push: '2024-09-12',
    isUp: true
  },
  {
    id: 3,
    author: '张三',
    type: '人工智能',
    push: '2024-09-12',
    isUp: true
  },
  {
    id: 4,
    author: '张三',
    type: '人工智能',
    push: '2024-09-12',
    isUp: true
  },
  {
    id: 5,
    author: '张三',
    type: '人工智能',
    push:'2024-09-12',
    isUp: true
  }
])
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- 顶部面包屑 -->
    <BreadCrumb />
    <el-divider direction="horizontal" style="margin-top: 5px;margin-bottom: 5px" />
    <!-- 主页部分 -->
    <div style="height: calc(100% - 52px)" class="w-full relative block overflow-y-scroll">
      <el-skeleton
          animated
          :rows="7"
          :loading="isLoading"
      >
        <!-- 信息总结 -->
        <div class="w-full px-4 h-[100px] mb-4 relative grid grid-cols-3 gap-3">
          <div class="w-full h-full p-4 relative grid grid-cols-2 gap-1 shadow-lg rounded-[5px] black overflow-hidden">
            <div class="w-full h-full relative block">
              <a-statistic
                  title="阅读量"
                  :value="300"
                  :precision="2"
                  :value-style="{ color: '#3f8600' }"
                  style="margin-right: 50px"
              >
                <template #prefix>
                  <arrow-up-outlined />
                </template>
              </a-statistic>
            </div>
            <div class="w-full h-full relative block">
              <a-statistic title="累计阅读量" :value="11293" style="margin-right: 50px" />
            </div>
          </div>
          <div class="w-full p-4 h-full relative grid grid-cols-2 gap-1 shadow-lg rounded-[5px] black overflow-hidden">
            <div class="w-full h-full relative block">
              <a-statistic title="点赞" :value="1128" style="margin-right: 50px">
                <template #suffix>
                  <like-outlined />
                </template>
              </a-statistic>
            </div>
            <div class="w-full h-full relative block">
              <a-statistic
                  title="新增点赞"
                  :value="9.3"
                  :precision="2"
                  suffix="%"
                  class="demo-class"
                  :value-style="{ color: '#cf1322' }"
              >
                <template #prefix>
                  <arrow-down-outlined />
                </template>
              </a-statistic>
            </div>
          </div>
          <div class="w-full p-4 h-full relative grid grid-cols-2 gap-1 shadow-lg rounded-[5px] black overflow-hidden">
            <div class="w-full h-full relative block">
              <a-statistic title="累计评论量" :value="98" style="margin-right: 50px" />
            </div>
            <div class="w-full h-full relative block">
              <a-statistic
                  title="新增评论"
                  :value="10"
                  :precision="2"
                  :value-style="{ color: '#3f8600' }"
                  style="margin-right: 50px"
              >
                <template #prefix>
                  <CommentOutlined />
                </template>
              </a-statistic>
            </div>
          </div>
        </div>
        <!-- 新闻列表 -->
        <div class="w-full h-[500px] pt-10 relative block">
          <div style="height: calc(100% - 40px)" class="w-full relative block">
            <el-table
                :data="table"
                stripe
            >
              <el-table-column type="selection" />
              <el-table-column width="120" prop="id" label="id" />
              <el-table-column width="120" prop="author" label="作者" />
              <el-table-column width="120" prop="type" label="分区" />
              <el-table-column width="120" prop="isUp" label="是否发布" />
              <el-table-column prop="push" label="提交日期" />
              <el-table-column label="操作">
                <el-button size="small" type="primary">修改</el-button>
                <el-button size="small" type="success">批准发布</el-button>
                <el-button size="small" type="warning">删除</el-button>
              </el-table-column>
            </el-table>
          </div>
          <!-- 底部分页器 -->
          <div class="w-full h-10 absolute flex justify-center bottom-0">
            <el-pagination layout="前一页, pager, 下一页" :total="100" />
          </div>
        </div>
      </el-skeleton>
    </div>
  </div>
</template>

<style scoped>
.black {
  background-color: var(--el-bg-color-overlay);
  color: var(--el-text-color-primary);
}
</style>