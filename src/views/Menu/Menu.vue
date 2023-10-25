<script lang="ts" setup>
import { MenuApi, MenuAddApi, MenuDelApi } from '@/services/api'
import type { IMenu } from '@/types'
const name = ref<string>('')
const menuData = ref<IMenu[]>([])
const shopid = ref<number>(0)

const getMenu = () => {
  MenuApi(shopid.value)
  .then(res => {
    if (res) menuData.value = res.data
  })
}
const addMenu = () => {
  if (name.value) {
    MenuAddApi(name.value, shopid.value)
    .then(res => {
      if (res) getMenu()
    })
  }
}
const delMenu = (id:number) => {
  MenuDelApi(id)
  .then(res => {
    if (res) getMenu()
  })
}

onMounted(() => {
  let id: Number | string = window.sessionStorage.getItem('id')  || 0
  shopid.value = Number(id)
  getMenu()
})
</script>

<template>
  <el-scrollbar>
    <el-input v-model="name" style="width: 200px;margin-right: 20px;"/>
    <el-button @click="addMenu">添加</el-button>
    <el-divider  />
    <el-table border :data="menuData" style="width: 100%">
      <el-table-column prop="id" label="id" v-if="false"/>
      <el-table-column prop="shopid" label="shopid" v-if="false" />
      <el-table-column prop="name" label="名称" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="delMenu(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<style scoped>
</style>