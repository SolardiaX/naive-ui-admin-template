import { DataTableProps, DataTableBaseColumn } from 'naive-ui'
import { ComponentType } from './componentType'

export interface BasicColumn extends DataTableBaseColumn {
  //编辑表格
  edit?: boolean
  editRow?: boolean
  editable?: boolean
  editComponent?: ComponentType
  editComponentProps?: Recordable
  editRule?: boolean | ((_text: string, _record: Recordable) => Promise<string>)
  editValueMap?: (_value: any) => string
  onEditRow?: () => void
  // 权限编码控制是否显示
  auth?: string[]
  // 业务控制是否显示
  ifShow?: boolean | ((_column: BasicColumn) => boolean)
}

export interface TableActionType {
  reload: (_opt) => Promise<void>
  emit?: any
  getColumns: (_opt?) => BasicColumn[]
  setColumns: (_columns: BasicColumn[] | string[]) => void
}

export interface BasicTableProps extends DataTableProps {
  title?: string
  dataSource: Function
  columns: any[]
  pagination: object
  showPagination: boolean
  actionColumn: any[]
  canResize: boolean
  resizeHeightOffset: number
}
