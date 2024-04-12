<script setup>
import { ref } from "vue";
import {onMounted} from "vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import {ElMessage} from "element-plus";
//骨架屏加载
const isLoading = ref(false)
onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  },3000)
})
//列表数据（暂时）
const table = ref([
  {
    id: 1,
    username: "张三",
    password: "1234312",
    access: "用户",
    phone: "12332112321",
    gender: "male",
    more: {
      like: "唱跳rap篮球",
      motto: "直挂云帆济沧海",
      url: "https://picsum.photos/200/300?1"
    }
  },
  {
    id: 2,
    username: "张三",
    password: "1234312",
    access: "管理员",
    phone: "12332112321",
    gender: "female",
    more: {
      like: "唱跳rap篮球",
      motto: "直挂云帆济沧海",
      url: "https://picsum.photos/200/300?2"
    }
  },
  {
    id: 3,
    username: "张三",
    password: "1234312",
    access: "用户",
    phone: "12332112321",
    gender: "male",
    more: {
      like: "唱跳rap篮球",
      motto: "直挂云帆济沧海",
      url: "https://picsum.photos/200/300?3"
    }
  },
  {
    id: 4,
    username: "张三",
    password: "1234312",
    access: "用户",
    phone: "12332112321",
    gender: "male",
    more: {
      like: "唱跳rap篮球",
      motto: "直挂云帆济沧海",
      url: "https://picsum.photos/200/300?4"
    }
  }
])
//修改
const isShow = ref(false)
const editShow = () => {
  isShow.value = true
  console.log('aaa')
}
//列表
const list =  ref({
  username: "张三",
  password: "1234312",
  access: "用户",
  phone: "12332112321",
  gender: "male",
  more: {
    like: "唱跳rap篮球",
    motto: "直挂云帆济沧海",
    url: "https://picsum.photos/200/300?3"
  }
})
//权限
const access = ref([
  {
    label: "用户",
    value: "用户"
  },
  {
    label: "管理员",
    value: "管理员"
  },
  {
    label: "超级管理员",
    value: "超级管理员"
  }
])
const select = ref()
//性别
const gender = ref('1')
//保存
const save = () => {
  ElMessage({
    type: "success",
    message: "保存成功"
  })
  isShow.value = false
}
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- 顶部面包屑 -->
    <BreadCrumb />
    <el-divider direction="horizontal" style="margin-top: 5px;margin-bottom: 5px"/>
    <!-- 底部列表 -->
    <div style="height: calc(100% - 92px)" class="w-full relative block">
      <el-skeleton
          animated
          :rows="6"
          :loading="isLoading"
      >
        <div class="w-full h-full relative block overflow-y-scroll">
          <el-table
              stripe
              :data="table"
          >
            <el-table-column type="selection" />
            <el-table-column label="更多" width="100" type="expand">
              <template #default="props">
                <div m="4">
                  <h3 class="font-bold text-black" style="color: var(--el-text-color-primary);">详细信息</h3>
                  <p m="t-0 b-2">
                    <img :src="props.row.more.url" alt="" class="w-[100px] h-[200px] relative block object-contain" loading="lazy">
                  </p>
                  <p m="t-0 b-2">爱好:{{props.row.more.like}}</p>
                  <p m="t-0 b-2">座右铭:{{props.row.more.motto}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="id" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="password" label="密码" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="access" label="权限" />
            <el-table-column prop="gender" label="性别" />
            <el-table-column label="操作">
              <el-button size="small" type="primary" @click="editShow">修改</el-button>
              <el-button size="small" type="warning" plain>删除</el-button>
            </el-table-column>
          </el-table>
        </div>
      </el-skeleton>
    </div>
    <!-- 底部分页器 -->
    <div class="w-full h-10 absolute flex justify-center bottom-0">
      <el-pagination layout="前一页, pager, 下一页" :total="100" />
    </div>
    <!-- 修改弹框 -->
    <el-dialog
        v-model="isShow"
        title="编辑"
        width="500"
        draggable
    >
      <div class="w-full h-auto relative block">
        <el-form
            status-icon
            label-width="auto"
        >
          <el-form-item label="用户名">
            <el-input v-model="list.username" placeholder="请输入用户名" clearable />
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="list.password" placeholder="请输入密码" clearable show-password />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="list.phone" maxlength="11" clearable show-word-limit placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="用户权限">
            <el-select v-model="select" placeholder="请分配权限">
              <el-option v-for="item in access" :key="item" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="gender">
              <el-radio value="1">男</el-radio>
              <el-radio value="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="头像上传">
            <el-upload limit="1">
              <el-button type="primary">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png 等文件应小于 500KB.
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="座右铭">
            <el-input v-model="list.more.motto" placeholder="请输入座右铭" clearable />
          </el-form-item>
          <el-form-item label="爱好">
            <el-input v-model="list.more.like" placeholder="请输入爱好" clearable />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="save">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>