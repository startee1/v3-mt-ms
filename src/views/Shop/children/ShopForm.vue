<script setup lang="ts">
import type { IShop } from '@/types'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  _response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}


const props = withDefaults(defineProps<{shop: IShop}>(),{
  shop: () => ({
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
})
let { shop } = toRefs(props)

</script>

<template>
  <el-form
    :model="shop"
    label-width="100"
    style="max-width: 800px;margin: auto;"
  >
    <el-form-item label="商铺名称" prop="title" required>
      <el-input v-model="shop.title" />
    </el-form-item>
    <el-form-item label="详细地址" prop="address" required>
      <el-input v-model="shop.address" />
    </el-form-item>
    <el-form-item label="联系电话" prop="phone" required>
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
    <el-form-item label="商铺头像" prop="logo">
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="shop.logo" :src="shop.logo" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="商铺背景" prop="background">
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="shop.background" :src="shop.background" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="营业执照" prop="yinyezhizhao">
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="shop.yinyezhizhao" :src="shop.yinyezhizhao" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="餐饮许可证" prop="canyinxuke">
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="shop.canyinxuke" :src="shop.canyinxuke" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button>提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
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