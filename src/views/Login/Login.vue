<script setup lang="ts">
import Basic from './Basic.vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { IUser } from '@/types'
import { useUserStateStore } from '@/stores'
// 用户状态
const userState = useUserStateStore()
// 表单元素绑定
const ruleFormRef = ref<FormInstance>()
// 表单信息
const form = reactive<IUser>({
  username: '',
  password: '',
})
// 表单验证规则
const rules = reactive<FormRules<IUser>>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: '账号长度为 3 到 10', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度为 6 to 12', trigger: 'blur' },
  ]
})
// 提交回调
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      userState.Login(form.username, form.password)
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <Basic title="注册">
    <template #default>
      <el-form
        ref="ruleFormRef"
        :model="form" 
        label-width="100px" 
        style="max-width: 400px;margin: auto;" 
        :rules="rules"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </Basic>
</template>