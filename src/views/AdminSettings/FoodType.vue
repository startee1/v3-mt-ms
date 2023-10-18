<script setup lang="ts">
const tableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const handleAdd = ()=> {}
</script>

<template>
  <div>
    <el-button>添加类型</el-button>
    <el-divider/>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="date" label="名称" sortable />
      <el-table-column prop="name" label="图片" sortable />
      <el-table-column prop="address" label="Address" sortable />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleAdd(scope.$index, scope.row)"
            >添加子类型</el-button
          >
          <el-button size="small" @click="handleAdd(scope.$index, scope.row)"
            >删除该类型</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
</style>

