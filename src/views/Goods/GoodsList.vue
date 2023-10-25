<script setup lang="ts">
import GTable from '@/components/GlobalLayout/GTable.vue'
import EPbutton from '@/components/EPcomponents/EPbutton.vue'
import EPtableV2 from '@/components/EPcomponents/EPtableV2.vue'
import { GoodsListApi,GoodsUpdateApi, GoodsDelApi } from '@/services/api'
import GoodsInfo from './GoodsInfo.vue'
import { useRouter } from 'vue-router';
import type { IGoods } from '@/types'

const router = useRouter()
const jumpToAdd = () => {
  router.push({ name: 'GoodsAdd' })
}

let values:Array<{[k:string]:any}> =  [
    ['myshow','展示',100],
    ['title','名称'],
    ['price','价格'],
    ['discount','折扣'],
  ]

let goodsList = ref<Array<IGoods>>([])
// [编辑]的窗口
const visible = ref<boolean>(false)
// [编辑]的id
const visibleId = ref<number>(0)

const tablaLoading = ref<boolean>(false)

const onEditTable = (id: number, key:  any, value: any) => {
  tablaLoading.value = true
  setTimeout(()=> tablaLoading.value = false, 1000)
  for (let i = 0; i < goodsList.value.length; i++) {
    if (goodsList.value[i].id === id) {
      goodsList.value[i][key].value = value
      GoodsUpdateApi({[key]:value},id)
      break;
    }   
  }
}
// 编辑查看数据
const onEditItem = (id: number) => {
  visibleId.value = id
  visible.value = true
}
// 删除数据
const onDeleteItem = (id: number) => {
  GoodsDelApi(id)
  .then(res => {
    if (res) {
      if (res.message) ElMessage.success(res.message)
    }
  })
}

onMounted(() => {
  let id: Number | string = window.sessionStorage.getItem('id')  || 0
  GoodsListApi(Number(id))
  .then(res => {
    if (res) goodsList.value = res.data
  })
})

</script>

<template>
  <div>
    <GTable>
      <template #header>
        <EPbutton :marginRight="20" text="添加" @handlerClick="jumpToAdd"/>
        <ElSwitch style="display: none;"/>
      </template>
      <template #main>
        <EPtableV2 
          :title="values"
          :data="goodsList" 
          edit="no"
          :editArray="['menuType']"
          :loading="tablaLoading"
          :operations="['delete','edit']"
          @edit-table="onEditTable"
          @edit-item="onEditItem"
          @delete-item="onDeleteItem"
        />
      </template>
    </GTable>
    <GoodsInfo v-model:visible="visible" :id="visibleId"/>
  </div>
</template>

<style scoped>
</style>