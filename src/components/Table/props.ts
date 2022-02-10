import { PropType } from 'vue'
import { NDataTable } from 'naive-ui'
import { propTypes } from '@/utils/props'
import { BasicColumn } from './types/table'

export const basicProps = {
  ...NDataTable.props, // 这里继承原 UI 组件的 props
  title: {
    type: String,
    default: null
  },
  titleTooltip: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: 'medium'
  },
  dataSource: {
    type: [Object],
    default: () => []
  },
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => []
  },
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
    required: true
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record) => string)>,
    default: undefined
  },
  pagination: {
    type: [Object, Boolean],
    default: () => {}
  },
  //废弃
  showPagination: {
    type: [String, Boolean],
    default: 'auto'
  },
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null
  },
  canResize: propTypes.bool.def(true),
  resizeHeightOffset: propTypes.number.def(0)
}
