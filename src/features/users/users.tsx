'use client'
import {
    PaginationModel,
    useGetUsersQuery,
    UserBlockStatus,
} from '@/generated/graphql'
import {Pagination} from '@/components/pagination/Pagination'
import React, {useCallback, useMemo, useState} from 'react'
import usePagination from '@/libs/hooks/usePagination'
import UserSearch from '@/components/Search/searchUser'
import {useSortBy} from '@/libs/hooks/useSort'
import UsersTable from '@/features/users/UserTable'
import {SelectCustom} from '@/components/select/select'
import styles from './users.module.scss'
import {useRouter} from "next/navigation";

const Users = () => {
    const [valuePagination] = useState<PaginationModel | null>(null)
    const [valueStatus, setValueStatus] = useState<UserBlockStatus>(UserBlockStatus.All)
    const {icon, onSortChange, sort} = useSortBy()
    const [valueSearch, setValueSearch] = useState<string>('')
    const {currentPage, setCurrentPage, pageSize, setPageSize, setSortBy, sortBy} = usePagination()
    const router = useRouter()
    const {data, refetch} = useGetUsersQuery({
        variables: {
            pageSize: 10,
            pageNumber: currentPage as number,
            sortBy,
            sortDirection: sort,
            searchTerm: valueSearch,
            statusFilter: valueStatus,
        },
    })

    const sortByMap = useMemo(
        () => ({
            name: 'userName',
            date: 'createdAt',
        }),
        []
    )

    const onChangeSortBy = useCallback(
        (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>, key: string) => {
            const newSortBy = sortByMap[key]
            if (!newSortBy) {
                console.warn('Invalid sort key:', key)
                return
            }
            setSortBy(newSortBy)
            onSortChange(key)
        },
        [sortByMap, onSortChange, setSortBy]
    )
    const onPageSizeChange = useCallback(
        (value: number) => {
            setPageSize(value)
            setCurrentPage(1)
        },
        [setPageSize, setCurrentPage]
    )

    const onCurrentPageChange = useCallback(
        (value: number | string) => {
            setCurrentPage(Number(value))
        },
        [setCurrentPage]
    )

    const handleSearch = useCallback(
        (searchTerm: string) => {
            setValueSearch(searchTerm)
            setCurrentPage(1)
        },
        [setCurrentPage]
    )

    const handleStatus = useCallback(
        (value: UserBlockStatus) => {
            setValueStatus(value)
            setCurrentPage(1)
        },
        [setCurrentPage]
    )

    const paginationOptions = useMemo(
        () => [
            {label: '10', value: '10'},
            {label: '20', value: '20'},
            {label: '30', value: '30'},
        ],
        []
    )


    const statusOptions = useMemo(
        () => [
            {label: 'All', value: UserBlockStatus.All},
            {label: 'Blocked', value: UserBlockStatus.Blocked},
            {label: 'Unblocked', value: UserBlockStatus.Unblocked},
        ],
        []
    )

    const handleUserDetails = useCallback((userId: number) => {
       router.push(`/users/${userId}/info`)
   },[router])

    return (
        <>
            <div className={styles.sands}>
                <UserSearch onSearch={handleSearch}/>
                <SelectCustom
                    className={styles.select}
                    options={statusOptions}
                    onValueChange={handleStatus}
                    value={valueStatus}
                />
            </div>
            <UsersTable
                data={data}
                icon={icon}
                onChangeSortBy={onChangeSortBy}
                refetch={refetch}
                onUserDetails={handleUserDetails}
            />
            <Pagination
                options={paginationOptions}
                pageSize={pageSize}
                currentPage={currentPage as number}
                onCurrentPageChange={onCurrentPageChange}
                onPageSizeChange={onPageSizeChange}
                portionValue={pageSize.toString()}
                totalCount={valuePagination?.totalCount}
            />
        </>
    )
}
export default React.memo(Users)
