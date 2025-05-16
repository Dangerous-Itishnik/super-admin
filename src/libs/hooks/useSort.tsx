import {SvgFilter} from "../../assets/icons/components/Filter"

import {useState} from "react";
import {SortDirection} from "@/generated/graphql";
import PolygonUp from "@/assets/icons/components/PolygonUp";
import Polygon from "@/assets/icons/components/Polygon";

export const useSortBy = () => {
    const [sort, setSort] = useState<SortDirection | 'default'>(SortDirection.Desc)
    const [activeKey, setActiveKey] = useState<string | null>(null)

    const onSortChange = (key: string) => {
        setActiveKey(key)
        if (sort === SortDirection.Desc) setSort(SortDirection.Asc)
        if (sort === SortDirection.Asc) setSort('default')
        if (sort === 'default') setSort(SortDirection.Desc)
    }

    const icon = (key: string): React.ReactNode => {
        if (activeKey !== key) return <SvgFilter/>
        if (sort === SortDirection.Desc) return <Polygon />;
        if (sort === SortDirection.Asc) return <PolygonUp />;
        return <SvgFilter/>
    };

    return {
        sort,
        activeKey,
        onSortChange,
        icon,
    }
}
