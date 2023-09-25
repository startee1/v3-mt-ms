<script setup lang="ts">
import Basic from './Basic.vue'
import type { FormInstance, FormRules } from 'element-plus'

interface IForm {
  name: string
  password: string
}

const ruleFormRef = ref<FormInstance>()
const form = ref<IForm>({
  name: '',
  password: '',
})

const rules = reactive<FormRules<IForm>>({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 8, message: '账号长度仅限 3 到 8', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度仅限 6 to 12', trigger: 'blur' },
  ]
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
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
        <el-form-item label="账号" prop="name">
          <el-input v-model="form.name" />
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