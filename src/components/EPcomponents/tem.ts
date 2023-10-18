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
