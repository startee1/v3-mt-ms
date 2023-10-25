<script setup lang="ts">
import { UserListApi, DeleteUserApi, UserCountApi, RegisterShopApi } from '@/services/api'
import timestampToDate from '@/utils/timestampToDate'

const tableData = ref([
  {
    'id': '123',
    'name': 'aabb',
    'username': 'asda*****asdad',
    'pubdate': '123',
    'power': '管理员',
  },
  {
    'id': '123',
    'name': 'aabb',
    'username': 'asdas*****sasdad',
    'pubdate': '123',
    'power': '商铺',
  },
])
const dialogVisible = ref<boolean>(false)
const shopUsername = ref<string>('')
const shopPassword = ref<string>('111111')
const currentPage = ref<number>(1)
const pageCount = ref<number>(0)
// 删除用户信息
const handleDelete = (_:any,row:any)=>{
  DeleteUserApi(row.id)
  .then(res => {
    if (res) {
      getUserInfo()
    }
  })
}
const registerShop = () => {
  RegisterShopApi()
  .then(res => {
    if (res) {
      shopUsername.value = res.data.username
      dialogVisible.value = true
    }
  })
}
// 关闭弹窗
const handleClose = (done: () => void) => {
  getUserInfo()
  done()
}
// 页码更改
const handlePage = () => {
  getUserInfo()
}
const getUserInfo = () => {
  return Promise.all([UserListApi(currentPage.value), UserCountApi()]).then((result) => {
    let userList = result[0]
    let userCount = result[1]
    if (userList)  tableData.value = userList.data
    if (userCount)  pageCount.value = userCount.data
  }).catch((error) => {
    ElMessage.error('获取失败：', error)
  })
}
onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div>
    <el-button @click="registerShop">添加商铺</el-button>
    <el-divider />
    <el-table :data="tableData" border style="width: 100%;margin-bottom: 20px;">
      <el-table-column prop="id" label="id" v-if="false" />
      <el-table-column prop="name" label="用户名" width="180" />
      <el-table-column prop="username" label="账号" width="180" />
      <el-table-column
        prop="pubdate"
        label="登录日期"
      >
        <template #default="scope">
          <span>{{ timestampToDate(scope.row.pubdate).getLocalDate() }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="power"
        label="身份"
      >
        <template #default="scope">
          <el-tag
          :type="scope.row.power === '管理员' ? '' : 'success'"
          >
          {{ scope.row.power }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="pageCount"
      @current-change="handlePage"
      v-model:current-page="currentPage"
      class="mt-4"
    />
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <div>账号：<span>{{ shopUsername }}</span></div>
      <div>密码：<span>{{ shopPassword }}</span></div>
    </el-dialog>
  </div>
</template>

