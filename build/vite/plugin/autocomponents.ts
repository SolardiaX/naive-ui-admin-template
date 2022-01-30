/**
 *  Introduces component library styles on demand.
 * https://github.com/antfu/unplugin-vue-components
 */
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

export function configAutoComponentsPlugin() {
  return Components({
    // 指定组件位置，默认是src/components
    dirs: ['src/components', 'src/layout'],
    // ui库解析器
    resolvers: [NaiveUiResolver(), VueUseComponentsResolver()],
    extensions: ['vue', 'tsx'],
    // 配置文件生成位置
    dts: 'types/auto-components.d.ts',
    // 搜索子目录
    deep: true,
    // 允许子目录作为组件的命名空间前缀。
    directoryAsNamespace: false
    // include:[]
  })
}
