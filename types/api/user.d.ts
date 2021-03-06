/*
 * Copyright (c) 2022. All rights reserved by XtraVisions.
 */

declare interface ICurrentUser {
  user_id: number
  username: string
  display: string
  org_id: number
  auth_token: string
  roles: string[]
}
