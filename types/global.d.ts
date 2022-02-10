import { LoadingBarApiInjection, MessageApiInjection } from 'naive-ui'

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }

  declare interface ViteEnv {
    VITE_PORT: number
    VITE_USE_MOCK: boolean
    VITE_DROP_CONSOLE: boolean
    VITE_BASE_URL: string
    VITE_API_BASE_URL: string
    VITE_OUTPUT_DIR: string
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  }

  interface Window {
    $loading: LoadingBarApiInjection | undefined
    $message: MessageApiInjection | undefined
  }

  declare interface Fn<T = any, R = T> {
    (..._arg: T[]): R
  }

  declare interface PromiseFn<T = any, R = T> {
    (..._arg: T[]): Promise<R>
  }

  declare interface IObject<T> {
    [index: string]: T
  }

  declare type Nullable<T> = T | null
  declare type NonNullable<T> = T extends null | undefined ? never : T
  declare type Recordable<T = any> = Record<string, T>
  declare type ReadonlyRecordable<T = any> = { readonly [key: string]: T }
  declare type Indexable<T = any> = { [key: string]: T }
  declare type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }
  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  declare type IntervalHandle = ReturnType<typeof setInterval>

  declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T
  }

  declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null
  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement
  }

  declare type LabelValueOptions = {
    label: string
    value: any
    disabled: boolean
    [key: string]: string | number | boolean
  }[]
}
