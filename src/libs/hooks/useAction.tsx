import {useCallback, useMemo} from "react";

import {useSortBy} from "@/libs/hooks/useSort";
import usePagination from "@/libs/hooks/usePagination";
import {SortDirection} from "@/generated/graphql";


type UseActionReturn = {
    paginationOptions: { label: string; value: string }[]
    onPageSizeChange: (value: number) => void
    onCurrentPageChange: (value: number | string) => void
    handleSortChange: (key: string) => void;
    icon: (key: string) => React.ReactNode;
    activeKey: string | null;
    sort: SortDirection;
    pageSize: number;
    currentPage: number | string;
    sortBy: string;
    setSortBy: (key: string) => void
    setCurrentPage: React.Dispatch<React.SetStateAction<number | string>>;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export const useAction = (): UseActionReturn => {
    const {currentPage, setCurrentPage, pageSize, setPageSize, sortBy, setSortBy} = usePagination();
    const {activeKey, sort, onSortChange, icon} = useSortBy();

    const paginationOptions = useMemo(
        () => [
            {label: '10', value: '10'},
            {label: '20', value: '20'},
            {label: '30', value: '30'},
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
        (key: string) => {
            console.log('handleSortChange called with key:', key);
            onSortChange(key);
            setSortBy(key);
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
        setSortBy,
        setCurrentPage,
        setPageSize
    };
};