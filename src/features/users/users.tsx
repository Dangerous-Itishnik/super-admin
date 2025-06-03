'use client'
import {
    useGetUsersQuery,
    UserBlockStatus,
} from '@/generated/graphql'
import {Pagination} from '@/components/pagination/Pagination'
import React, {useCallback, useMemo, useState} from 'react'
import UserSearch from '@/components/Search/searchUser'
import {UsersTable} from '@/features/users/UserTable'
import {SelectCustom} from '@/components/select/select'
import styles from './users.module.scss'
import {useRouter} from "next/navigation";
import {useAction} from "@/libs/hooks/useAction";

const Users = () => {
    const [valueStatus, setValueStatus] = useState<UserBlockStatus>(UserBlockStatus.All)
    const [valueSearch, setValueSearch] = useState<string>('')
    const {
        icon,
        sort,
        handleSortChange,
        paginationOptions,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        sortBy,
    } = useAction();



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
    }, [router])

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
                data={data?.getUsers?.users ?? []}
                icon={icon}
                onChangeSortBy={handleSortChange}
                context={{
                    refetch,
                    onUserDetails: handleUserDetails
                }}

            />
            <Pagination
                options={paginationOptions}
                pageSize={pageSize}
                currentPage={currentPage as number}
                onCurrentPageChange={onCurrentPageChange}
                onPageSizeChange={onPageSizeChange}
                portionValue={pageSize.toString()}
                totalCount={data?.getUsers.pagination.totalCount}
            />
        </>
    )
}
export default React.memo(Users)
