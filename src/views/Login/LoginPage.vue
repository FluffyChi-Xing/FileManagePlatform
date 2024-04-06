<script lang="ts" setup>
import {reactive, ref} from "vue";
import { useRouter} from "vue-router";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {Eleme} from "@element-plus/icons-vue";

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const ruleForm = reactive({
  username: '',
  password: '',
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  }
  callback()
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  }
  callback()
}


const loginRules = reactive<FormRules <typeof ruleForm>>({
  username: [{ validator: validatePass, trigger: 'blur' }],
  password: [{ validator: validatePass2, trigger: 'blur' }],
})

//按钮加载
const isLoading = ref(false)
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      isLoading.value = true;
      setTimeout(() => {
        let now = new Date()
        localStorage.setItem('somebody',now.toString())
        router.replace('/')
        isLoading.value = false
        ElMessage({
          type: "success",
          message: "登陆成功!"
        })
      },3000)
    } else {
      ElMessage({
        type: "warning",
        message: "登录错误!"
      })
      return false
    }
  })
}

</script>

<template>
  <div class="w-screen bg-img h-screen relative block overflow-hidden">
    <el-card class="w-[400px] h-[300px] relative block mx-auto mt-36">
      <div class="w-full relative block text-[20px] text-black leading-8 h-8 overflow-hidden">
        登录/注册
      </div>
      <el-divider direction="horizontal" style="margin-top: 5px;margin-bottom: 5px" class="mx-auto" />
      <el-tabs style="height: calc(100% - 32px)" class="w-full">
        <el-tab-pane label="登录">
          <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              :rules="loginRules"
              label-width="auto"
          >
            <el-form-item label="用户名" prop="username">
              <el-input clearable v-model="ruleForm.username" prefix-icon="User" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" clearable show-password v-model="ruleForm.password" prefix-icon="Lock" placeholder="请输入密码" />
            </el-form-item>
            <el-divider />
            <el-form-item style="margin-top: auto">
              <el-button :loading="isLoading" :loading-icon="Eleme" class="w-full relative block mt-auto" type="primary" @click="submitForm(ruleFormRef)">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册">

        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>
.bg-img {
  background-image: url("../../assets/img/login.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>