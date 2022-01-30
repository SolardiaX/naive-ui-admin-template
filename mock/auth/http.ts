import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '../_util'

const adminUser = {
  user_id: '@id',
  username: '@name',
  display: '@cname',
  org_id: '@id',
  roles: ['admin'],
  auth_token: 'fake_auth_token'
}

export default [
  {
    url: '/api/auth/http/currentUser',
    method: 'get',
    response: () => {
      return resultSuccess(adminUser)
    }
  },
  {
    url: '/api/auth/http/login',
    method: 'post',
    response: () => {
      return resultSuccess(adminUser)
    }
  },
  {
    url: '/api/auth/http/changePassword',
    method: 'post',
    response: () => {
      return resultError('原始密码不匹配', { code: 400, data: null })
    }
  }
] as MockMethod[]
