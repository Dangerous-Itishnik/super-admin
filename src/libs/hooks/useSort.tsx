import Filter from '../../assets/icons/components/Filter'

import React, { useCallback, useState } from 'react'
import { SortDirection } from '@/generated/graphql'
import PolygonUp from '@/assets/icons/components/PolygonUp'
import Polygon from '@/assets/icons/components/Polygon'

export const useSortBy = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [sort, setSort] = useState<SortDirection>(SortDirection.Desc)

  const onSortChange = useCallback(
    (key: string) => {
      if (activeKey === key) {
        setSort(sort === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc)
      } else {
        setActiveKey(key)
        setSort(SortDirection.Desc)
      }
    },
    [activeKey, sort]
  )

  const icon = useCallback(
    (key: string): React.ReactNode => {
      console.log('Icon called:', { key, activeKey, sort })
      if (activeKey !== key) return <Filter />
      if (sort === SortDirection.Desc) return <Polygon />
      if (sort === SortDirection.Asc) return <PolygonUp />
      return <Filter />
    },
    [activeKey, sort]
  )

  return { activeKey, sort, onSortChange, icon }
}
