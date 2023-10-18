<script setup lang="ts">
import ShopForm from '@/views/Shop/children/ShopForm.vue'

const AddShopDialog = ref<boolean>(false)

const tableData = ref([
  {
    'name': 'aabb',
    'username': 'asda*****asdad',
    'pwd': 'aabsa*****asdsab',
    'status': '管理员',
  },
  {
    'name': 'aabb',
    'username': 'asdas*****sasdad',
    'pwd': 'aabs*****sdsab',
    'status': '商铺',
  },
])
// 删除用户信息
const handleDelete = (_1:any,_2:any)=>{
  console.log('delete',_1,_2)
}

</script>

<template>
  <div>
    <el-button @click="AddShopDialog = true">添加商铺</el-button>
    <el-divider />
    <el-table :data="tableData" border style="width: 100%;margin-bottom: 20px;">
      <el-table-column prop="name" label="用户名" width="180" />
      <el-table-column prop="username" label="账号" width="180" />
      <el-table-column prop="pwd" label="密码" />
      <el-table-column
        prop="status"
        label="身份"
      >
        <template #default="scope">
          <el-tag
          :type="scope.row.status === '管理员' ? '' : 'success'"
          >
          {{ scope.row.status }}
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
      :total="50"
      class="mt-4"
    />
    <el-dialog v-model="AddShopDialog">
      <ShopForm />
    </el-dialog>
  </div>
</template>

