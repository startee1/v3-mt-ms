<script setup lang="ts">

const psw = ref<string>('')
const pswReset = ref<string>('')
const pswConfirm = ref<string>('')
</script>

<template>
  <div>
    <h1>用户信息</h1>
    <div class="userinfo">
      <el-form label-width="100" label-position="left">
        <el-form-item label="用户名:">
          <span>1231321</span>
        </el-form-item>
        <el-form-item label="账号:">
          <span>1231321</span>
        </el-form-item>
        <el-divider />
        <el-form-item label="密码:">
          <el-input v-model="psw"/>
        </el-form-item>
        <el-form-item label="修改密码">
          <el-input v-model="pswReset"/>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="pswConfirm"/>
        </el-form-item>
        <el-form-item>
          <el-button>提交</el-button>
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

