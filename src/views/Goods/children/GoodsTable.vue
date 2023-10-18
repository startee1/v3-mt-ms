<script setup lang="ts">
import EPuploadImg from '@/components/EPcomponents/EPuploadImg.vue'
import GoodsChioceDialog from './GoodsChioceDialog.vue'
import type { IGoods, IGoodsLogo } from '@/types'
const props = withDefaults(defineProps<{goods: IGoods}>(),{
  goods: () => ({
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
})
// 商品信息
const { goods } = toRefs(props)
// const { goods } = props
// 商品规格设置
const choiceVisible = ref<boolean>(false)
// 商品标识
const GoodsLogoType:Array<{label: IGoodsLogo,value: IGoodsLogo }> = [
  {label: '无', value: '无'},
  {label: '招牌', value: '招牌'},
  {label: '新品', value: '新品'},
]

const menuList = ref<Array<{label:string,value:string}>>([
  {label: '美食',value: '十五'},
  {label: '科学',value: '渲染'},
])
// 规格设置窗口的返回值
const choiceSet = () => {
  choiceVisible.value = false
}

onMounted(() => {
  // console.log('table', goods)
})

</script>

<template>
  <el-form 
    :model="goods" 
    label-width="120px"
    label-position="left"
  >
    <el-form-item label="商品名称">
      <el-input v-model="goods.title" />
    </el-form-item>
    <el-form-item label="商品价格">
      <el-input 
        v-model="goods.prices"
        oninput="value=value.replace(/[^0-9.]/g,'')"
        :parser="(value:string) => value.replace(/￥\s?|(,*)/g, '')"
        :formatter="(value:string) => `￥ ${value}`"
      />
    </el-form-item>
    <el-form-item label="商品是否可见">
      <el-switch
        v-model="goods.myshow"
        size="large"
        inline-prompt
        active-text="是"
        inactive-text="否"
        :active-value="1"
        :inactive-value="0"
      />
    </el-form-item>
    <el-form-item label="商品可单独卖">
      <el-switch
        v-model="goods.singleSell"
        size="large"
        inline-prompt
        active-text="是"
        inactive-text="否"
        :active-value="1"
        :inactive-value="0"
      />
    </el-form-item>
    <el-form-item label="商品所属菜单">
      <el-select
        v-model="goods.menuTypes"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择"
        style="width: 340px"
        :max-collapse-tags="4"
      >
        <el-option
          v-for="item in menuList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="商品分量">
      <el-input v-model="goods.size" />
    </el-form-item>
    <el-form-item label="商品折扣（折）">
      <el-input-number
        v-model="goods.discount"
        class="mx-4"
        :min="1"
        :max="10"
        :precision="2" :step="0.1"
        controls-position="right"
      />
      <span> （￥ {{ (goods.prices * goods.discount).toFixed(2) }}）</span>
    </el-form-item>
    <el-form-item label="商品标识">
      <el-select v-model="goods.goodsLogo" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in GoodsLogoType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="打包费用">
      <el-input 
        v-model="goods.packingCharges"
        oninput="value=value.replace(/[^0-9.]/g,'')"
        :parser="(value:string) => value.replace(/￥\s?|(,*)/g, '')"
        :formatter="(value:string) => `￥ ${value}`"
      />
    </el-form-item>
    <el-form-item label="商品图片">
      <EPuploadImg />
    </el-form-item>
    <el-form-item label="更多商品选择">
      <el-switch
        v-model="goods.isChoice"
        size="large"
        inline-prompt
        active-text="是"
        inactive-text="否"
        :active-value="1"
        :inactive-value="0"
      />
      <el-button v-if="goods.isChoice" class="m-2" @click="choiceVisible = true">设置</el-button>
      <GoodsChioceDialog :visible="choiceVisible" @close="choiceSet"/>
    </el-form-item>
  </el-form>
</template>