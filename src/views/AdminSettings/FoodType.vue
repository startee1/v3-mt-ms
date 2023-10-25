<script setup lang="ts">
import { ACTIONURL,IMAGE_PRE } from '@/config'
import { ShopTypeAddApi, ShopTypeApi, ShopTypeDeleteApi, ShopTypeImageApi } from '@/services/api'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const type = ref<string>('')
const childeType = ref<string>('')
const dialogVisible = ref<boolean>(false)
const parentid = ref<number>(0)
const uploadId = ref<number>(0)

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  let name = response.data.name
  ShopTypeImageApi(name, uploadId.value)
  .then(res => {
    if (res) getType()
  })
}
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
const tableData = ref<any[]>([])
const handleAddMain = ()=> { 
  ShopTypeAddApi(type.value, 0)
  .then(res => {
    if (res) {
      getType()
    }
  })
}
const handleChildrenDialog = (id:number)=> {
  parentid.value =  id
  dialogVisible.value = true
}
const handleAddChildren = ()=> {
  ShopTypeAddApi(childeType.value, parentid.value)
  .then(res => {
    if (res) {
      getType()
    }
  })
  dialogVisible.value = false
}
const handleDelete = (id:number)=> { 
  ShopTypeDeleteApi(id)
  .then(res => {
    if (res) {
      getType()
    }
  })
}
const getType = () => {
  ShopTypeApi()
  .then(res => {
    if (res) {
      let data = []; 
      for(let i = 0; i < res.data.length; i++) {
        if (res.data[i].parentid == 0) {
          data.push(res.data[i])
        }else{
          for(let j = 0; j < data.length; j++) {
            if (data[j]['id'] == res.data[i].parentid) {
              if (data[j].children) {
                data[j].children.push(res.data[i])
              }else{
                data[j].children = [res.data[i]]
              }
              break
            }
          }
        }
      }
      tableData.value = data
    }
  })
}

onMounted(() => {
 getType()
})
</script>

<template>
  <div>
    <el-input v-model="type" style="width: 200px; margin-right: 20px;"/>
    <el-button @click="handleAddMain">添加类型</el-button>
    <el-divider/>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="name" label="名称" sortable />
      <el-table-column label="图片">
        <template #default="scope">
          <el-upload
            class="avatar-uploader"
            :action="ACTIONURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            @click="uploadId = scope.row.id"
          >
            <img v-if="scope.row.image" :src="IMAGE_PRE + '/' + scope.row.image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" v-if="!scope.row.parentid" @click="handleChildrenDialog(scope.row.id)"
            >添加子类型</el-button
          >
          <el-button size="small" @click="handleDelete(scope.row.id)"
            >删除该类型</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="类别">
      <el-input v-model="childeType" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddChildren">
            添加
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 40px;
  height: 40px;
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
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>

