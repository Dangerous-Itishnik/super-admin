import React, { useCallback, useMemo } from "react";

import { useSortBy } from "@/libs/hooks/useSort";
import usePagination from "@/libs/hooks/usePagination";

export const useAction = () => {
    const {
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        sortBy,
        setSortBy
    } = usePagination();

    const {
        activeKey,
        sort,
        onSortChange,
        icon
    } = useSortBy();

    const paginationOptions = useMemo(
        () => [
            { label: '10', value: '10' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
        ],
        []
    );

    const onPageSizeChange = useCallback(
        (value: number) => {
            setPageSize(value);
            setCurrentPage(1);
        },
        [setPageSize, setCurrentPage]
    );

    const onCurrentPageChange = useCallback(
        (value: number | string) => {
            setCurrentPage(Number(value));
        },
        [setCurrentPage]
    );

    const handleSortChange = useCallback(
        (column: string) => {
            onSortChange(column);
            setSortBy(column);
        },
        [onSortChange, setSortBy]
    );

    return {
        paginationOptions,
        onPageSizeChange,
        onCurrentPageChange,
        handleSortChange,
        icon,
        activeKey,
        sort,
        pageSize,
        currentPage,
        sortBy,
        setCurrentPage
    };
};