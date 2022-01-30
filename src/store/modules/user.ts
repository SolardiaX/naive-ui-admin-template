/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

import { defineStore } from 'pinia'
import { currentUser, login, loginParam, passwordParam, changePassword } from '@/api/auth/http'
import { getLocal, setLocal } from '@/store/storage'

const storedUser = getLocal<IUser>('user')

declare interface IUserState {
  currentUser: IUser | null
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => ({
    currentUser: {
      user_id: storedUser.user_id != undefined ? storedUser.user_id : 0,
      username: storedUser.username != undefined ? storedUser.username : '',
      display: storedUser.display != undefined ? storedUser.display : '',
      org_id: storedUser.org_id != undefined ? storedUser.org_id : 0,
      auth_token: storedUser.auth_token != undefined ? storedUser.auth_token : '',
      roles: []
    }
  }),
  actions: {
    logout(): void {
      this.currentUser = null
      setLocal('user', {})
    },
    async login(params: loginParam): Promise<IUser | null> {
      const response = await login(params)

      if (response.code === 200) {
        this.$state.currentUser = response.data!
        setLocal('user', response.data!)
      }

      return Promise.resolve(response.data)
    },
    async getCurrentUser(): Promise<IUser | null> {
      const response = await currentUser()

      if (response.code == 200) {
        this.$state.currentUser = response.data!
        setLocal('user', response.data!)
      }

      return Promise.resolve(response.data)
    },
    async changePassword(param: passwordParam): Promise<boolean> {
      const response = await changePassword(param)
      return Promise.resolve(response.code === 200)
    }
  }
})
