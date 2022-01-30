/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

declare interface IApiResponse<T = any> {
  status: boolean
  code: number
  message: string
  data: T
}
