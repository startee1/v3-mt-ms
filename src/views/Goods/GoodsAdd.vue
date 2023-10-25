<script setup lang="ts">
import GoodsTable from './children/GoodsTable.vue'
import { GoodsAddApi } from '@/services/api' 
import type { IGoods } from '@/types'

const goods:IGoods = reactive({
    title: '',
    price: 0,
    myshow: 1,
    shopid: 0,
    menuType: '',
    logo: '',
    singleSell: 1,
    size: '1人份',
    discount: 10,
    goodsLogo: '无',
    packingCharges: 0,
    isChoice: 0,
  })
const AddGoods = () => {
  GoodsAddApi(goods)
  .then(res => {
    if (res) ElMessage.success('添加成功，请刷新')
  })
}
onMounted(() => {
  let id: Number | string = window.sessionStorage.getItem('id')  || 0
  goods.shopid = Number(id)
})
</script>

<template>
  <el-scrollbar>
    <GoodsTable :goods="goods"/>
    <el-button @click="AddGoods">添加</el-button>
  </el-scrollbar>
</template>