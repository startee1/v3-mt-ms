<script setup lang="ts">
import type {IOrder} from '@/types'

const commentData = ref<Array<IOrder>>([
  {
    createTime: '123',
    status: '支付超时',
    userid: '123123',
    shopid: '123123',
    goodsList: []
  }
])
</script>

<template>
  <el-table :data="commentData" border style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div class="expand">
          <p>时间: {{ props.row.createTime }}</p>
          <p>状态: {{ props.row.status }}</p>
          <p>用户: {{ props.row.userid }}</p>
          <p>商铺: {{ props.row.shopid }}</p>
          <p>购买列表: {{ props.row.goodsList.toString() }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="时间"  />
    <el-table-column prop="status" label="状态"  />
    <el-table-column prop="userid" label="用户"  />
    <el-table-column prop="shopid" label="商铺"  />
  </el-table>
</template>

<style scoped>
.expand {
  display: flex;
  padding: 0 20px;
  flex-wrap: wrap;
}
.expand p{
  width: 40%;
}
</style>

