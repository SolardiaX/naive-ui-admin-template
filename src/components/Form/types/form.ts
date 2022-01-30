import { CSSProperties } from 'vue'
import { GridProps, GridItemProps, ButtonProps } from 'naive-ui'
import { ComponentType } from './index'

export interface FormSchema {
  field: string
  label: string
  labelMessage?: string
  labelMessageStyle?: object | string
  defaultValue?: any
  component?: ComponentType
  componentProps?: object
  slot?: string
  rules?: object | object[]
  giProps?: GridItemProps
  isFull?: boolean
  suffix?: string
}

export interface FormProps {
  model?: Recordable
  labelWidth?: number | string
  schemas?: FormSchema[]
  inline: boolean
  layout?: string
  size: string
  collapsed: boolean
  collapsedRows: number
  disable: boolean
  labelPlacement: string
  isFull: boolean
  showActionButtonGroup?: boolean
  showResetButton?: boolean
  resetButtonOptions?: Partial<ButtonProps>
  showSubmitButton?: boolean
  showAdvancedButton?: boolean
  submitButtonOptions?: Partial<ButtonProps>
  submitButtonText?: string
  resetButtonText?: string
  gridProps?: GridProps
  giProps?: GridItemProps
  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<boolean>
  submitOnReset?: boolean
  baseGridStyle?: CSSProperties
}

export interface FormActionType {
  submit: () => Promise<any>
  setProps: (formProps: Partial<FormProps>) => Promise<void>
  setFieldsValue: <T>(values: T) => Promise<void>
  clearValidate: (name?: string | string[]) => Promise<void>
  getFieldsValue: () => Recordable
  resetFields: () => Promise<void>
  validate: (nameList?: any[]) => Promise<any>
}

export type RegisterFn = (formInstance: FormActionType) => void

export type UseFormReturnType = [RegisterFn, FormActionType]
