<script setup lang="ts">
import ShopForm from './children/ShopForm.vue'
import { ShopCheckApi, ShopInitInfoApi, ShopUpdateInfoApi } from '@/services/api'
import { useUserStateStore } from '@/stores'
import type { IShop } from '@/types'

const userState = useUserStateStore()
const type = ref<'insert' | 'update'>('insert')
const shopid = ref<number>(0)
const shop = reactive<IShop>({
  title: '',
  address: '',
  myshow: 0,
  phone: '',
  typemainid: 0,
  typeviceid: 0,
  preview: '',
  deliveryPrice: 0,
  minPriceDelivery: 0,
  startTime: '00:00',
  endTime: '23:45',
  logo: '',
  background:'',
  yinyezhizhao: '',
  canyinxuke: '',
})
// 是否已初始化信息
const initialized = ref<boolean>(false)
const checkInfo = () => {
  let id = userState.userInfo.id || window.sessionStorage.getItem('id') || 0
  shopid.value = Number(id)
  if (shopid.value) {
    ShopCheckApi(shopid.value)
    .then(res => {
      if (res) {
        type.value = 'update'
        initialized.value = true
        for (let key of Object.keys(res.data)) {
          if (shop[key] != null) {
            shop[key] = res.data[key]
          }
        }
      }
    })
  }
}
// 提交商铺信息
const submit = () => {
  if (type.value === 'insert') {
    ShopInitInfoApi(shop, shopid.value!)
    .then(res => {
      if (res) ElMessage.success('提交成功')
    })
  } else if (type.value === 'update'){
    updatInfo()
  }

}
// 更新商铺信息
const updatInfo = () => {
  console.log('update')
  ShopUpdateInfoApi(shop, shopid.value!)
  .then(res => {
    if (res) ElMessage.success('更改成功')
  })
}
// 更改商铺是否开放
const handleChangeOpen = (value:any) => {
  ShopUpdateInfoApi({myshow: value ? 1 : 0}, shopid.value!)
  .then(res => {
    if (res) ElMessage.success('更改成功')
  })
}
onMounted(() => {
  let id: Number | string = window.sessionStorage.getItem('id')  || 0
  shopid.value = Number(id)
  checkInfo()
})
</script>

<template>
  <el-scrollbar>
    <el-form-item label="是否开放" >
      <el-switch
      v-model="shop.myshow"
      size="large"
      @change="handleChangeOpen"
      inline-prompt
      :active-value="1"
      :inactive-value="0"
      active-text="开"
      inactive-text="关"
      />
    </el-form-item>
    
    <ShopForm v-if="initialized" :shop="shop" :type="type" :shopid="shopid" @submit="submit"/>
    <el-button v-else  @click="initialized = true">初始化</el-button>
  </el-scrollbar>
</template>

