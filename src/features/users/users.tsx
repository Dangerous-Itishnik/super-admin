'use client'
import {
    useGetUsersQuery,
    UserBlockStatus,
} from '@/generated/graphql'
import {Pagination} from '@/components/pagination/Pagination'
import React, {useCallback, useState} from 'react'
import UserSearch from '@/components/Search/searchUser'
import {UsersTable} from '@/features/users/UserTable'
import {SelectCustom} from '@/components/Select/select'
import styles from './users.module.scss'
import {useRouter} from "next/navigation";
import {useAction} from "@/libs/hooks/useAction";
import UserSkeleton from "@/features/users/UserSkeleton/UserSkeleton";
import {statusOptions} from "@/libs/constants";

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
    const {data, refetch, loading, networkStatus, error} = useGetUsersQuery({
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


    const handleUserDetails = useCallback((userId: number) => {
        router.push(`/users/${userId}/info`)
    }, [router])

    const isInitialLoading = loading && !data
    const isSearching = loading && networkStatus === 4 && !data?.getUsers?.users.length

    return (
        <div className={styles.container}>
            {isInitialLoading ? (
                <>
                    <div className={styles.sands}>
                        <div className={styles.searchSkeleton}></div>
                        <div className={styles.selectSkeleton}></div>

                    </div>
                    <UserSkeleton rows={5}/>
                </>
            ) : (
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

                    {isSearching && data?.getUsers?.users.length === 0 ? (
                        <UserSkeleton rows={5}/>
                    ) : (
                        <>
                            <UsersTable
                                data={data?.getUsers?.users ?? []}
                                icon={icon}
                                onChangeSortBy={handleSortChange}
                                context={{
                                    refetch,
                                    onUserDetails: handleUserDetails
                                }}
                            />

                            {!loading && (
                                <Pagination
                                    options={paginationOptions}
                                    pageSize={pageSize}
                                    currentPage={currentPage as number}
                                    onCurrentPageChange={onCurrentPageChange}
                                    onPageSizeChange={onPageSizeChange}
                                    portionValue={pageSize.toString()}
                                    totalCount={data?.getUsers.pagination.totalCount}
                                />
                            )}
                        </>
                    )}

                    {/* No Results State */}
                    {!loading && data?.getUsers?.users.length === 0 && valueSearch && (
                        <div className={styles.noResults}>
                            No users found for "{valueSearch}"
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className={styles.error}>
                            Error loading users: {error.message}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
export default React.memo(Users)
