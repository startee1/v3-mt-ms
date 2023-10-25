<script setup lang="ts">
import { MenuApi } from '@/services/api'
import { Plus } from '@element-plus/icons-vue'
import { ACTIONURL, IMAGE_PRE } from '@/config'
import type { UploadProps } from 'element-plus'
import type { IGoods, IGoodsLogo } from '@/types'
const props = withDefaults(defineProps<{goods: IGoods}>(),{
  goods: () => ({
    title: '',
    shopid: 0,
    price: 0,
    myshow: 1,
    menuType: '',
    logo: '',
    singleSell: 1,
    size: '1人份',
    discount: 10,
    goodsLogo: '无',
    packingCharges: 0,
    isChoice: 0,
    choice: '',
  })
})
// 商品信息
const { goods } = toRefs(props)
const shopid = ref<number>(0)
const choiceList = ref([])
choiceList.value = props.goods.choice ? JSON.parse(props.goods.choice) : []
console.log(choiceList.value)
// 添加子类型的父类型名称
const fatname = ref<string>('')
// 添加父类型名称
const fatnameAdd = ref<string>('')
// 子类型
const childChoice = reactive({
  name: '',
  price: 0,
})
// 子类型对话框
const childDialog = ref<boolean>(false)
// 商品标识
const GoodsLogoType:Array<{label: IGoodsLogo,value: IGoodsLogo }> = [
  {label: '无', value: '无'},
  {label: '招牌', value: '招牌'},
  {label: '新品', value: '新品'},
]

const menuList = ref<Array<{label:string,value:string}>>([])
// 获取菜单列表
const getMenu = () => {
  MenuApi(shopid.value)
  .then(res => {
    if (res) {
      let data = []
      for (let i = 0; i < res.data.length; i++){
        data.push({label: res.data[i].name+`(代号：${res.data[i].id})`, value: res.data[i].id})
      }
      menuList.value = data
    }
  })
}
// 添加父类型
const addFatChoice = () => {
  choiceList.value.push({name: fatnameAdd.value, children: []})
  fatnameAdd.value = ''
}
// 删除父类型
const handleCloseFatChoice = (name: string) => {
  choiceList.value = choiceList.value.filter(item => {
    return item.name != name
  })
}
// 显示子类型添加框
const addChlidChoice = (name:string) => {
  fatname.value = name
  childDialog.value = true
}
// 添加子类型
const confirmChlidChoice = (check:boolean) => {
  if (check && childChoice.name != '') {
    for (let i = 0; i < choiceList.value.length; i++) {
      if (fatname.value == choiceList.value[i]['name']) {
        choiceList.value[i]['children'].push({name: childChoice.name,price: childChoice.price})
      }
    }
  }
  childChoice.name = ''
  childChoice.price = 0
  fatname.value = ''
  childDialog.value = false
}
// 删除子标签
const handleCloseChoice = (child:{name: string, price: number}, choice: string) => {
  for (let i = 0; i < choiceList.value.length; i++) {
      if (choice == choiceList.value[i]['name']) {
        let temChild = choiceList.value[i]['children']
        choiceList.value[i]['children'] = temChild.filter(item => {
          return item.name != child.name && item.price != child.price
        })
      }
    }
}
// 上传图片
const handleLogoSuccess: UploadProps['onSuccess'] = (response) => {goods.value.logo = IMAGE_PRE + '/' + response.data.name}
// 上传前判断
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片必须是 jpg 或者 png 格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }
  return true
}
watch(choiceList.value,
  (newVal) => {
    goods.value.choice = JSON.stringify(newVal)
    console.log('here',goods.value.choice)
  },
  {immediate: true}
)
onMounted(() => {
  let id: Number | string = window.sessionStorage.getItem('id')  || 0
  shopid.value = Number(id)
  getMenu()
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
        v-model="goods.price"
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
        v-model="goods.menuType"
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
      <span> （￥ {{ (goods.price * goods.discount * 0.1).toFixed(2) }}）</span>
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
      <el-upload
        class="avatar-uploader"
        :action="ACTIONURL"
        :show-file-list="false"
        :on-success="handleLogoSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="goods.logo" :src="goods.logo" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
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
    </el-form-item>
    <div v-if="goods.isChoice">
      <el-divider/>
        <el-form-item label="设置规格">
          <div style="width: 100%;margin-bottom: 20px;">
            <el-input v-model="fatnameAdd" style="width: 200px;margin-right: 20px;"/>
            <el-button v-if="goods.isChoice" class="m-2" @click="addFatChoice">添加</el-button>
          </div>
          
          <div v-for="choice in choiceList" class="choice">
            <div class="choice-left">
              <el-tag closable size="large" @close="handleCloseFatChoice(choice.name)">
                标题：{{ choice.name }}
              </el-tag>
            </div>
            <div class="choice-right">
              <el-tag type="info" v-for="child in choice.children" style="margin: 0 10px;" closable @close="handleCloseChoice(child,choice.name)">{{ child.name }} | {{ child.price }}元</el-tag>
              <el-tag @click="addChlidChoice(choice.name)">添加类别</el-tag>
            </div>
          </div>
        </el-form-item>
      <el-divider/>
    </div>
  </el-form>
  <el-dialog :title="`添加子类别(${fatname})`" v-model="childDialog">
    <el-form>
      <el-form-item label="名称">
        <el-input v-model="childChoice.name" placeholder="请填写名称" clearable />
      </el-form-item><el-form-item label="价格">
        <el-input-number
          v-model="childChoice.price"
          :min="0"
          controls-position="right"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirmChlidChoice(false)">取消</el-button>
        <el-button type="primary" @click="confirmChlidChoice(true)">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.choice {
  display: flex;
  margin: 10px;
  width: 100%;
}
.choice-left {
  font-size: 20px;
}
.avatar-uploader .avatar {
  width: 98px;
  height: 98px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 98px;
  height: 98px;
  text-align: center;
}
</style>