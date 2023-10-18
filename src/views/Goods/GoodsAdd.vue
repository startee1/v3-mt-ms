<script setup lang="ts">
import GoodsTable from './children/GoodsTable.vue' 
import type { IGoods } from '@/types'

const goods:IGoods = reactive({
    title: '',
    prices: 0,
    myshow: 1,
    menuTypes: [],
    logo: '',
    singleSell: 1,
    size: '1人份',
    discount: 10,
    goodsLogo: '无',
    packingCharges: 0,
    isChoice: 0,
  })
</script>

<template>
  <div>
    <GoodsTable :goods="goods"/>
    <button @click="console.log(goods)">12321</button>
  </div>
</template>