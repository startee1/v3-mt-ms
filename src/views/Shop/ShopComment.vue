<script setup lang="ts">

const commentData = ref([
  {
    time: '2023/10/20 12:10:23',
    user: '管理员',
    text: '内容',
    shop: '商店',
    goods: '商品',
    rate: '5',
  }
])
</script>

<template>
  <div>
    <el-table :data="commentData" border style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div class="expand">
            <p>时间: {{ props.row.time }}</p>
            <p>用户: {{ props.row.user }}</p>
            <p>评论: {{ props.row.text }}</p>
            <p>评分: {{ props.row.rate }}</p>
            <p>店铺名: {{ props.row.shop }}</p>
            <p>商品名: {{ props.row.goods }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间"  />
      <el-table-column prop="user" label="用户"  />
      <el-table-column prop="text" label="评论"  />
      <el-table-column prop="rate" label="评分"  />
    </el-table>
  </div>
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

