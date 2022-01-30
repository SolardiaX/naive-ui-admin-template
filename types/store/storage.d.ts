/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

declare interface ILocalStore {
  startTime: number
  expires: number
  [propName: string]: any
}
