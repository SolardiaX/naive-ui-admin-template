import { useUserStore } from '@/store/modules/user'
import { isString } from '@/utils/check'

export function usePermission() {
  const userStore = useUserStore()

  /**
   * 检查权限
   * @param roles
   */
  function _somePermissions(roles: string[] | string | undefined) {
    const currentRoles = userStore.currentUser?.roles
    if (roles === undefined || currentRoles === undefined || currentRoles.length === 0) return false

    if (isString(roles)) roles = [roles]

    if (roles.length === 1 && roles[0] === '*') return true

    let matched = 0
    roles.forEach((rs) => {
      if (rs.split(',').some((r) => currentRoles.some((cr) => cr === r))) matched += 1
    })

    return matched > 0
  }

  /**
   * 判断是否存在权限
   * 可用于 v-if 显示逻辑
   * */
  function hasPermission(roles: string[] | string | undefined): boolean {
    if (!roles || !roles.length) return true
    return _somePermissions(roles)
  }

  return { hasPermission }
}
