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
    const {data, refetch, loading, error} = useGetUsersQuery({
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
        (newSearchTerm: string) => {
            setValueSearch(newSearchTerm)
            setCurrentPage(1);
            refetch({
                searchTerm: newSearchTerm,
                sortBy,
                sortDirection: sort,
            })
        },
        [refetch, setCurrentPage, sort, sortBy]
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


    return (
        <div className={styles.container}>
                    <div className={styles.sands}>
                        <UserSearch onSearch={handleSearch}/>
                        <SelectCustom
                            className={styles.select}
                            options={statusOptions}
                            onValueChange={handleStatus}
                            value={valueStatus}
                        />
                    </div>

                    { data?.getUsers?.users.length && (
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
                    )}


                    {!loading && data?.getUsers?.users.length === 0 && valueSearch && (
                        <div className={styles.noResults}>
                            No users found for "{valueSearch}"
                        </div>
                    )}

                    {error && (
                        <div className={styles.error}>
                            Error loading users: {error.message}
                        </div>
                    )}
        </div>
    );
}
export default React.memo(Users)
