/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from '@/store/modules/user'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string | undefined,
  timeout: 3000 //ms
})

const errorHandler = (error) => {
  let msg: string
  let response: any

  if (error && error.response) {
    msg = error.response.data.message || error.response.statusText
    response = error.response
  } else if (error && error.data) {
    msg = error.data.message
    response = error
  } else {
    msg = '服务器连接失败'
    response = {
      data: {
        status: false,
        code: 400,
        message: msg,
        data: null
      }
    }
  }

  window.$message?.error(msg)

  return Promise.resolve(response)
}

service.interceptors.request.use((config: AxiosRequestConfig) => {
  const userStore = useUserStore()
  const token = userStore.currentUser?.auth_token

  if (token) {
    config.headers!['Authorization'] = 'Bearer ' + token
  }

  return config
}, errorHandler)

service.interceptors.response.use((response: AxiosResponse<IApiResponse>) => {
  if (response.data.code === 401) {
    const userStore = useUserStore()

    if (userStore.currentUser?.auth_token) {
      userStore.logout()
    }
  } else if (response.data.code !== 200) {
    return errorHandler(response)
  }

  return response
}, errorHandler)

const request = async (config: AxiosRequestConfig): Promise<IApiResponse<any>> => {
  const response = await service(config)
  return response.data
}

export default request
