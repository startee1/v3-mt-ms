<script setup lang="ts">
import GoodsTable from './children/GoodsTable.vue';
import { GoodsInfoApi,GoodsUpdateApi } from '@/services/api';
import type { IGoods } from '@/types'
const props = withDefaults(defineProps<{visible: boolean,id: number}>(),{
  visible: false
})
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
const emits = defineEmits(['update:visible'])
let props1 = toRef(props)
const handleClose = () => {
  emits('update:visible', false)
}
watch(() => props.id,
  (newVal) => {
    if (newVal) {
    GoodsInfoApi(newVal)
    .then(res => {
      if (res) {
        for(let key of Object.keys(res.data)){
          if (goods[key] != undefined ) {
            goods[key] = res.data[key]
          }
        }
      }
    })
  }
  }
)
const updateGoods = () => {
  GoodsUpdateApi(goods, props.id)
  .then(res => {
    if (res) {
      ElMessage.success('更新成功，请刷新')
    }
  })
}

</script>

<template>
    <el-dialog v-model="props1.visible" title="信息" @close="handleClose">
      <GoodsTable :goods="goods"/>
      <el-button @click="updateGoods">更改</el-button>
    </el-dialog>
</template>