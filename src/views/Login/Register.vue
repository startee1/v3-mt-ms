<script setup lang="ts">
import Basic from './Basic.vue'
import { RegisterApi, LoginApi } from '@/services/api'
import type { FormInstance, FormRules } from 'element-plus'
import type { IUser } from '@/types'

const ruleFormRef = ref<FormInstance>()
const form = reactive<IUser>({
  username: '',
  password: '',
  checkPassword: ''
})

const validateUsername = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    if (form.username.length < 4 || form.username.length > 10) {
      callback(new Error('账号长度仅限 4 to 10'))
    } else if (!/^[A-Za-z0-9]+$/.test(form.username)) {
      callback(new Error('账号仅限数字和字母的组合'))
    } else {
      callback()
    }
  }
}

const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (form.password.length < 6 || form.password.length > 12) {
      callback(new Error('账号长度仅限 6 to 12'))
    } else if (!/^[A-Za-z0-9]+$/.test(form.password)) {
      callback(new Error('密码仅限数字和字母的组合'))
    } else {
      callback()
    }
  }
}

const validateCheckPassword = (_rule: any, _value: any, callback: any) => {
  if (form.checkPassword != form.password) {
    callback(new Error('两次密码输入不一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<IUser>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  checkPassword: [{ validator: validateCheckPassword, trigger: 'blur' }],
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, _fields) => {
    if (valid && (form.password === form.checkPassword)) {
      RegisterApi({username: form.username, password: form.password})
      .then(res => {
        if (res) {
          ElMessage.success('注册成功')
          LoginApi({username: form.username, password: form.password})
        }
      })
    } else {
      ElMessage.error('输入错误！');
    }
  })
}
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
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="form.checkPassword" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </Basic>
</template>