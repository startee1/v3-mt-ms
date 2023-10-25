<script setup lang="ts">
import { MapSearchApi, ShopTypeApi } from '@/services/api'
import { Plus } from '@element-plus/icons-vue'
import { ACTIONURL, IMAGE_PRE } from '@/config'
import type { IShop } from '@/types'
import type { UploadProps, FormRules, FormInstance } from 'element-plus'

interface LinkItem {
  value: string
  link: string
}
const shopTypeData = ref<any[]>([])
const props = withDefaults(defineProps<{shop: IShop}>(),{
  shop: () => ({
    title: '',
    address: '',
    phone: '',
    info: '',
    typemainid: 0,
    typeviceid: 0,
    preview: '',
    deliveryPrice: 0,
    minPriceDelivery: 0,
    startTime: '00:00',
    endTime: '12:00',
    logo: '',
    background:'',
    yinyezhizhao: '',
    canyinxuke: '',
  })
})
let { shop } = toRefs(props)
const ruleFormRef = ref<FormInstance>()
// 商品分类
const shopType = ref([])

const handleLogoSuccess: UploadProps['onSuccess'] = (response) => {shop.value.logo = IMAGE_PRE + '/' + response.data.name}
const handleBackgroundSuccess: UploadProps['onSuccess'] = (response) => {shop.value.background = IMAGE_PRE + '/' + response.data.name}
const handleYinyezhizhaoSuccess: UploadProps['onSuccess'] = (response) => {shop.value.yinyezhizhao = IMAGE_PRE + '/' + response.data.name}
const handleCanyinxukeSuccess: UploadProps['onSuccess'] = (response) => {shop.value.canyinxuke = IMAGE_PRE + '/' + response.data.name}

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

const emits = defineEmits<{
  submit: []
}>()
// 商品分类改变
const handleTypeChange = (value: any) => {
  if (value[0]) shop.value.typemainid = value[0]
  if (value[1]) shop.value.typeviceid = value[1]
}
// 表单验证
const rules = reactive<FormRules<IShop>>({
  title: [{ required: true, message: '商铺名称不能为空', trigger: 'blur' }],
  address: [{ required: true, message: '详细地址不能为空', trigger: 'blur' }],
  phone: [{ required: true, message: '联系电话不能为空', trigger: 'blur' }],
})
// 地址搜索
let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    if (queryString) {
      MapSearchApi(queryString)
      .then(res => {
        if (res) {
          let data = res.data.result
          let makeData: LinkItem[] = []
          for (let i in data) {
            makeData.push( { value: `${data[i].name}（${data[i].address}）`, link: '' } )
          }
          cb(makeData)
        }
      })
    }
  }, 3000)
}
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('submit')
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 获取类别
const getType = () => {
  ShopTypeApi()
  .then(res => {
    if (res) {
      let data:Array<{value?: any, label?: any,id?: any,children?: any[]}> = []; 
      for(let i = 0; i < res.data.length; i++) {
        if (res.data[i].parentid == 0) {
          data.push({'value': res.data[i].id, 'label': res.data[i].name, 'id': res.data[i].id})
        }else{
          for(let j = 0; j < data.length; j++) {
            if (data[j]['id'] == res.data[i].parentid) {
              if (data[j].children) {
                data[j].children!.push({'value': res.data[i].id, 'label': res.data[i].name, 'id': res.data[i].id})
              }else{
                data[j].children = [{'value': res.data[i].id, 'label': res.data[i].name, 'id': res.data[i].id}]
              }
              break
            }
          }
        }
      }
      shopTypeData.value = data
    }
  })
}

onMounted(() => {
 getType()
})

</script>

<template>
  <el-form
    :model="shop"
    label-width="100"
    style="max-width: 800px;margin: auto;"
    :rules="rules"
    ref="ruleFormRef"
  >
    <el-form-item label="商铺名称" prop="title">
      <el-input v-model="shop.title" placeholder="请输入商铺名称"/>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-autocomplete
        v-model="shop.address"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入地址"
      />
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
      <el-input v-model="shop.phone" />
    </el-form-item>
    <el-form-item label="商铺简介" prop="info">
      <el-input v-model="shop.info" />
    </el-form-item>
    <el-form-item label="商铺标语" prop="preview">
      <el-input v-model="shop.preview" />
    </el-form-item>
    <el-form-item label="配送费" prop="deliveryPrice" required>
      <el-input-number
        v-model="shop.deliveryPrice"
        :min="0"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="起送价格" prop="minPriceDelivery" required>
      <el-input-number
        v-model="shop.minPriceDelivery"
        :min="0"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="起送时间" prop="startTime" required>
      <el-time-select
      v-model="shop.startTime"
      :max-time="shop.endTime"
      class="mr-4"
      placeholder="Start time"
      start="00:00"
      step="00:15"
      end="23:30"
    />
    </el-form-item>
    <el-form-item label="结束时间" prop="endTime" required>
      <el-time-select
        v-model="shop.endTime"
        :min-time="shop.startTime"
        placeholder="End time"
        start="00:00"
        step="00:15"
        end="23:30"
      />
    </el-form-item>
    <el-form-item label="商铺分类">
      <el-cascader v-model="shopType" :options="shopTypeData" placeholder="请选择"   @change="handleTypeChange"/>
    </el-form-item>
    <el-form-item label="商铺头像" prop="logo">
      <el-upload
        class="avatar-uploader"
        :action="ACTIONURL"
        :show-file-list="false"
        :on-success="handleLogoSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="shop.logo" :src="shop.logo" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="商铺背景" prop="background">
      <el-upload
        class="avatar-uploader"
        :action="ACTIONURL"
        :show-file-list="false"
        :on-success="handleBackgroundSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="shop.background" :src="shop.background" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="营业执照" prop="yinyezhizhao">
      <el-upload
        class="avatar-uploader"
        :action="ACTIONURL"
        :show-file-list="false"
        :on-success="handleYinyezhizhaoSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="shop.yinyezhizhao" :src="shop.yinyezhizhao" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="餐饮许可证" prop="canyinxuke">
      <el-upload
        class="avatar-uploader"
        :action="ACTIONURL"
        :show-file-list="false"
        :on-success="handleCanyinxukeSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="shop.canyinxuke" :src="shop.canyinxuke" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm(ruleFormRef)">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
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