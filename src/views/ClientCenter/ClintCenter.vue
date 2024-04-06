<script setup>
import { reactive,ref } from "vue";
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {Eleme} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
const router = useRouter()
const form = reactive({
  name: '张三',
  phone: 12355648909,
  password: '',
  permission: 'normal',
  isRoot: false,
  gender: 'male'
})
const isDisabled = ref(false)
//有一些设置只有管理员可以修改
const forbidden = () => {
  if (!form.isRoot) {
    isDisabled.value = true
  }
}
onMounted(() => {
  forbidden()
})
//提交修改
const isLoading = ref(false)
const submit = () => {
  isLoading.value = true
  setTimeout(() => {
    router.replace('/')
    ElMessage({
      type: "success",
      message: '成功修改'
    })
    isLoading.value = false
  },2000)
}
</script>

<template>
  <div class="w-full h-full relative overflow-x-hidden block p-3">
    <div class="black w-full h-5 leading-5 text-left text-xl text-black font-bold">
      账号信息
    </div>
    <div class="w-full h-5 relative mt-2 block">
      <el-alert show-icon type="warning" effect="light" title="如注册信息有误，请联系超级管理员，个人信息请谨慎修改" />
    </div>
    <div class="w-2/3 user mt-8 p-3 relative block mx-auto">
      <el-form
          status-icon
          label-width="auto"
          :model="form"
      >
        <el-form-item label="用户名" prop="name">
          <el-input prefix-icon="User" clearable v-model="form.name" :placeholder="form.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" prefix-icon="Lock" v-model="form.password" show-password clearable :placeholder="form.password" />
        </el-form-item>
        <el-form-item label="绑定手机号" prop="phone">
          <el-input clearable maxlength="11" show-password v-model="form.phone" type="password" show-word-limit />
        </el-form-item>
        <el-form-item label="角色" prop="permission">
          <el-radio-group :disabled="isDisabled" v-model="form.permission">
            <el-radio value="normal">普通用户</el-radio>
            <el-radio value="root">超级管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio value="male">男</el-radio>
            <el-radio value="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否为超级管理员" prop="isRoot">
          <el-radio-group :disabled="isDisabled" v-model="form.isRoot">
            <el-radio value="true">是</el-radio>
            <el-radio value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider />
        <el-form-item label="提交修改">
          <el-button type="primary" round :loading="isLoading" :loading-icon="Eleme" @click="submit">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.user {
  height: calc(100% - 80px);
}
.black {
  background-color: var(--el-bg-color-overlay);
  color: var(--el-text-color-primary);
}
</style>