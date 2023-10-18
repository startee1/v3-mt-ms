<script setup lang="ts">
import ShopForm from './children/ShopForm.vue'

import type { IShop } from '@/types'

const shop = reactive<IShop>({
    title: '',
    address: '',
    phone: '',
    type: '',
    preview: '',
    deliveryPrice: 0,
    minPriceDelivery: 0,
    startTime: '',
    endTime: '',
    logo: '',
    background:'',
    yinyezhizhao: '',
    canyinxuke: '',
  })
</script>

<template>
  <el-scrollbar>
    <ShopForm :shop="shop"/>
  </el-scrollbar>
</template>

