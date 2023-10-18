<script setup lang="ts">
import GTable from '@/components/GlobalLayout/GTable.vue'
import EPbutton from '@/components/EPcomponents/EPbutton.vue'
import EPtableV2 from '@/components/EPcomponents/EPtableV2.vue'
import GoodsInfo from './GoodsInfo.vue'
import { useRouter } from 'vue-router';
import type { IGoods } from '@/types'

const router = useRouter()
const jumpToAdd = () => {
  router.push({ name: 'GoodsAdd' })
}

let values:Array<{[k:string]:any}> =  [
    ['id','id',50],
    ['myshow','展示',100],
    ['title','名称'],
    ['prices','价格'],
    ['pubdate','上传日期'],
  ]

let goodsList = ref<Array<IGoods>>([{id:1,myshow:1,title:'123',prices:123,pubdate:'321'}])
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
      break;
    }   
  }
}
// 编辑查看数据
const onEditItem = (id: number) => {
  console.log(id)
  visibleId.value = id
  visible.value = true
}
// 删除数据
const onDeleteItem = (id: number) => {
  console.log(id)
}

onMounted(() => {
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
          :loading="tablaLoading"
          :operations="['delete','edit']"
          @edit-table="onEditTable"
          @edit-item="onEditItem"
          @delete-item="onDeleteItem"
        />
      </template>
      <template #bottom><el-button @click="console.log(goodsList)">show data</el-button></template>
    </GTable>
    <GoodsInfo v-model:visible="visible" :id="visibleId"/>
  </div>
</template>

<style scoped>
</style>