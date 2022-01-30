/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import request from '@/api/request'

export interface loginParam {
  username: string
  password: string
}

export interface passwordParam {
  user_id: string | number | undefined
  old_passwd: string
  new_passwd: string
  cfm_passwd: string
}

export function login(params: loginParam): Promise<IApiResponse<IUser | null>> {
  return request({
    url: '/auth/http/login',
    method: 'post',
    data: params
  })
}

export function currentUser(): Promise<IApiResponse<IUser | null>> {
  return request({
    url: '/auth/http/currentUser',
    method: 'get'
  })
}

export function changePassword(param: passwordParam): Promise<IApiResponse<boolean>> {
  return request({
    url: '/auth/http/changePassword',
    method: 'post',
    data: param
  })
}
