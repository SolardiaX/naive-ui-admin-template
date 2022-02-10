import { ComputedRef } from 'vue'
import { isBoolean } from '@/utils/check'
import { BasicTableProps } from '@/components/Table/types/table'
import { PaginationProps } from '@/components/Table/types/pagination'
import { APISETTING } from '@/components/Table/const'

export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  { getPaginationInfo, setPagination, setLoading, tableData },
  emit
) {
  const dataSourceRef = ref<Recordable[]>([])

  watchEffect(() => {
    tableData.value = unref(dataSourceRef)
  })

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource }: any = unref(propsRef)
      dataSource && (dataSourceRef.value = dataSource)
    },
    {
      immediate: true
    }
  )

  const getRowKey = computed(() => {
    const { rowKey }: any = unref(propsRef)
    return rowKey
      ? rowKey
      : () => {
          return 'key'
        }
  })

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef)
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef)
    }
    return unref(dataSourceRef)
  })

  async function fetch(opt?) {
    try {
      setLoading(true)
      const { request, pagination }: any = unref(propsRef)
      if (!request) return
      //组装分页信息
      const pageField = APISETTING.pageField
      const sizeField = APISETTING.sizeField
      const totalField = APISETTING.totalField
      const listField = APISETTING.listField

      let pageParams = {}
      const { page = 1, pageSize = 10 } = unref(getPaginationInfo) as PaginationProps

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {}
      } else {
        pageParams[pageField] = (opt && opt[pageField]) || page
        pageParams[sizeField] = pageSize
      }

      const params = {
        ...pageParams
      }
      const res = await request(params)

      const resultTotal = res[totalField] || 0
      const currentPage = res[pageField]

      // 如果数据异常，需获取正确的页码再次执行
      if (resultTotal) {
        if (page > resultTotal) {
          setPagination({
            [pageField]: resultTotal
          })
          fetch(opt)
        }
      }
      const resultInfo = res[listField] ? res[listField] : []
      dataSourceRef.value = resultInfo
      setPagination({
        [pageField]: currentPage,
        [totalField]: resultTotal
      })
      if (opt && opt[pageField]) {
        setPagination({
          [pageField]: opt[pageField] || 1
        })
      }
      emit('fetch-success', {
        items: unref(resultInfo),
        resultTotal
      })
    } catch (error) {
      console.error(error)
      emit('fetch-error', error)
      dataSourceRef.value = []
      // setPagination({
      //   pageCount: 0,
      // });
    } finally {
      setLoading(false)
    }
  }

  onMounted(() => {
    setTimeout(() => {
      fetch()
    }, 16)
  })

  function setTableData(values) {
    dataSourceRef.value = values
  }

  function getDataSource(): any[] {
    return getDataSourceRef.value
  }

  async function reload(opt?) {
    await fetch(opt)
  }

  return {
    fetch,
    getRowKey,
    getDataSourceRef,
    getDataSource,
    setTableData,
    reload
  }
}
