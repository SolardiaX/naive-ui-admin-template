/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

declare interface IApiResponse<T = any> {
  status: boolean
  code: number
  message: string
  data: T
}

declare interface IBaseModel {
  id: number
  created_at: Date
  updated_at: Date
}

declare interface IPaging<T = any> {
  items: T[]
  total: number
}
