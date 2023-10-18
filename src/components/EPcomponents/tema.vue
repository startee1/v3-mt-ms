<script lang="tsx" setup>
import { ElButton, ElCheckbox, ElInput, ElSwitch, TableV2FixedDir } from 'element-plus'

interface IProps {
  page?: number
  pagesize?: number
  count?: number
  title: Array<any>  // [['属性名','标题名称','表格宽度']]
  data: Array<any>   // [{'属性名': '属性值'}]
  edit?: 'none' | 'yes' | 'no'
  selection?: boolean
  editArray?: Array<any>
}

const props = withDefaults(defineProps<IProps>(), {
  page: 0,
  pagesize: 0,
  count: 0,
  title: () => [],
  data: () => [],
  edit: 'none',
  selection: false,
  editArray: () => [],
})



const emits = defineEmits(['pagechange','edit-data','delete-data','edit-table']);

let {page,pagesize,count,title,data,selection,edit,editArray} = props;

const tableData = ref([])
const table = ref(null);
const table_height = ref(300)
const dialogDeleteVisible = ref(false)
const delete_id = ref(0);

let values = [];
// 表格顶部标题栏
if(title){
  for(let i in title){
    let val = title[i];
    if(val instanceof String){
      values.push([val,val,150])
    }else if(val instanceof Array){
      let width = val[2] ? val[2] : 150;
      values.push([val[0],val[1],width])
    }
  }
}

const SelectionCell = ({
  value,
  intermediate = false,
  onChange,
}) => {
  return (
    <ElCheckbox
      onChange={onChange}
      modelValue={value}
      indeterminate={intermediate}
    />
  )
}

const InputCell = ({
  value,
  onChange,
  forwardRef,
}) => {
  return (
    <ElInput ref={forwardRef} onInput={onChange} modelValue={value} />
  )
}

const selectionbox = {
  key: 'selection',
  width: 50,
  fixed: true,
  cellRenderer: ({ rowData }) => {
    const onChange = (value) => (rowData.checked = value)
    return <SelectionCell value={rowData.checked} onChange={onChange} />
  },

  headerCellRenderer: () => {
    const _data = unref(tableData)
    const onChange = (value) =>
      (tableData.value = _data.map((row) => {
        row.checked = value
        return row
      }))
    const allSelected = _data.every((row) => row.checked)
    const containsChecked = _data.some((row) => row.checked)

    return (
      <SelectionCell
        value={allSelected}
        intermediate={containsChecked && !allSelected}
        onChange={onChange}
      />
    )
  },
}

const generateColumns = function (){
  let res = [];
  if(selection){
    res = [selectionbox]
  }
  for(let i in values){
    res.push({
      key: values[i][0],
      dataKey: values[i][0],
      title: values[i][1],
      fixed: values[i][0] == 'id' ? TableV2FixedDir.LEFT : false,
      width: values[i][2],
      cellRenderer: ({ rowData, column }) => {
        if(column.dataKey == 'myshow' && rowData[column.dataKey].value != undefined){
          const onChange = (value) => {
            console.log('change', rowData[column.dataKey], value)
            rowData[column.dataKey].value = value;
            emits('edit-table',rowData['id'],column.dataKey,rowData[column.dataKey].value);
          }
  
          return (
            <ElSwitch
              inline-prompt
              model-value={rowData[column.dataKey].value}
              onChange={onChange}
              disabled={false}
              size="large"
              active-text="开"
              inactive-text="关"
              active-value={1}
              inactive-value={0}
            />
          )
        }else if(rowData[column.dataKey]?.canedit && rowData[column.dataKey].canedit == true){
          const onChange = (value) => {
            rowData[column.dataKey].value = value;
          }
          const onEnterEditMode = () => {
            rowData[column.dataKey].editing = true
          }
  
          const onExitEditMode = () => {
            rowData[column.dataKey].editing = false;
            emits('edit-table',rowData['id'],column.dataKey,rowData[column.dataKey].value);
          }
          const input = ref()
          const setRef = (el) => {
            input.value = el
            if (el) {
              el.focus?.()
            }
          }
  
          return rowData[column.dataKey].editing ? (
            <InputCell
              forwardRef={setRef}
              value={rowData[column.dataKey].value}
              onChange={onChange}
              onKeydown={(e)=>{ if(e.key == "Enter") onExitEditMode()}}
            />
          ) : (
            <div class="table-v2-inline-editing-trigger" style="min-width:20px;min-height:20px;box-size:border-box;" onClick={onEnterEditMode}>
              {rowData[column.dataKey].value}
            </div>
          )
        }else{
          return (
            <div>
              {rowData[column.dataKey]}
            </div>
          )
        }
      },
    })
  }
  return res;
}

// 监听页码改动
const my_count = ref(0);
const my_pagesize = ref(0);

watch(
  () => props.count,
  (newVal, oldVal) => {
    my_count.value = props.count;
    my_pagesize.value = props.pagesize;
  }
)


const rebuildData = (data:any)=>{
  let temdata = data
  if(temdata.length > 0){
    for(let i in temdata){
      for(let j in temdata[i]){
        let canedit = true;
        if(j != 'id'){
          if(( edit == 'yes' && editArray.includes(temdata[i][j]) ) || ( edit == 'no' && !editArray.includes(temdata[i][j]) )){
            temdata[i][j] = {
              value: temdata[i][j],
              canedit,
              editing: false
            }
          }
        }
      }
    }
  }
  tableData.value = temdata
}

const columns = generateColumns()

columns[columns.length] = {
    key: 'operations',
    title: '操作',
    fixed: TableV2FixedDir.RIGHT,
    cellRenderer: ({ rowData }) => {
      const id = rowData.id

      const onEditColumn = ()=>{
        emits('edit-data',id);
      }
      const onDeleteColumn = ()=>{
        delete_id.value = id;
        dialogDeleteVisible.value = true
      }
      
      return(
      <>
        <ElButton size="small" onClick={onEditColumn}>编辑</ElButton>
        <ElButton size="small" type="danger" onClick={onDeleteColumn}>
          删除
        </ElButton>
      </>
    )
    },
    width: 150,
    align: 'center',
    flexGrow: 1,
  }




// 重构数据
watch(
  () => props.data,
  (newVal, oldVal) => {
    rebuildData(newVal)
  },
  { immediate: true, deep: true }
)


onMounted(()=>{
  nextTick(()=>{
    if(table?.value?.clientHeight){
      table_height.value = table.value.clientHeight - 20;
    }
  })
})
</script>

<template>
  <div class="table-box" ref="table">      
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :data="tableData"
          row-key="id"
          :width="width"
          :height="height"
          :footer-height="50"
          fixed
        >
          <template #footer>
            <el-pagination style="margin-top:20px;" background layout="prev, pager, next" @current-change="(p) => emits('pagechange',p)" :default-current-page="page" :page-size="my_pagesize" :total="my_count" />
          </template>
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </div>
  <el-dialog v-model="dialogDeleteVisible" title="确认删除?" width="200px">
    <div style="display: flex;justify-content: flex-end;">
      <el-button @click="dialogDeleteVisible = false">取消</el-button>
      <el-button type="primary" @click="() => {dialogDeleteVisible = false;emits('delete-data',delete_id);}">确认</el-button>
    </div>    
  </el-dialog>
</template>

<style scoped>
.table-box{
  height:calc(100vh - 220px);
}
:deep(.table-v2-inline-editing-trigger:hover){
  cursor: pointer;
  border: 1px dashed rgb(64,158,255);
}
</style>