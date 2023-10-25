<script setup lang="ts">
import { useUserStateStore } from '@/stores'
import { UpdateUserPasswordApi } from '@/services/api'

const userState = useUserStateStore()
const pwd = ref<string>('')
const pwdNew = ref<string>('')
const pwdRepeat = ref<string>('')
const name = ref<string>('')
const username = ref<string>('')

const update_password = () => {
  if (pwdNew.value === '' || pwd.value === '' || pwdRepeat.value === '') {
    ElMessage.info('请填写完整信息')
  }else if(pwdNew.value != pwdRepeat.value){
    ElMessage.error('两次密码输入不一致')
  }else if(pwdNew.value.length < 6 || pwdNew.value.length > 12 || !/^[0-9A-Za-z]+$/.test(pwdNew.value)){
    ElMessage.error('密码需要在 6-12 位内。由数字和字母组成')
  }else{
    let id = userState.userInfo.id || window.sessionStorage.getItem('id') || ''
    let username = userState.userInfo.username || window.sessionStorage.getItem('username') || ''
    console.log(pwd.value)
    UpdateUserPasswordApi(Number(id), username, pwd.value, pwdNew.value)
    .then(res=> {
      if (res) {
        ElMessage.success(res.data.message)
      }
    })
  }
} 

onMounted(() => {
 let userinfo = userState.getUserInfo()
 name.value = userinfo.name || window.sessionStorage.getItem('name') || ''
 username.value = userinfo.username || window.sessionStorage.getItem('username') || ''
})
</script>

<template>
  <div>
    <h1>用户信息</h1>
    <div class="userinfo">
      <el-form label-width="100" label-position="left">
        <el-form-item label="用户名:">
          <span>{{ name }}</span>
        </el-form-item>
        <el-form-item label="账号:">
          <span>{{ username }}</span>
        </el-form-item>
        <el-divider />
        <el-form-item label="密码:">
          <el-input type="password" v-model="pwd"/>
        </el-form-item>
        <el-form-item label="修改密码">
          <el-input type="password" v-model="pwdNew"/>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="pwdRepeat"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="update_password">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.userinfo {
  width: 100%;
  max-width: 600px;
  margin: auto;
  margin-top: 20px;
  padding: 10px 30px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
h1 {
  text-align: center;
}
</style>

