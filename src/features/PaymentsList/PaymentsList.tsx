'use client'
import React, {useCallback, useState} from 'react'
import UserSearch from "@/components/Search/searchUser";
import {useAction} from "@/libs/hooks/useAction";
import {useGetPaymentsQuery} from "@/generated/graphql";
import {Pagination} from "@/components/pagination/Pagination";
import {usePaymentsAllTableConfig} from "@/features/UserDetails/configs";
import {Table} from "@/components/Table/Table";

const PaymentsList = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const {columns} = usePaymentsAllTableConfig()
    const {
        paginationOptions,
        onPageSizeChange,
        onCurrentPageChange,
        handleSortChange,
        icon,
        activeKey,
        sort,
        pageSize,
        currentPage,
        setCurrentPage,
        sortBy,
    } = useAction();
    const {data} = useGetPaymentsQuery({
        variables: {
            pageSize: 6,
            pageNumber: currentPage as number,
            sortBy,
            sortDirection: sort,
            searchTerm
        }
    })

    const handleSearch = useCallback(
        (searchTerm: string) => {
            setSearchTerm(searchTerm)
            setCurrentPage(1)
        },
        [setCurrentPage]
    )
    return <div>

        <UserSearch onSearch={handleSearch}/>
        <Table
            data={data?.getPayments.items ?? []}
            columns={columns}
            sortIcon={icon}
            onSortChange={handleSortChange}
            activeKey={activeKey}
            sortBy={sortBy}
            sortDirection={sort}
        />
        <Pagination
            options={paginationOptions}
            pageSize={pageSize}
            currentPage={currentPage as number}
            onCurrentPageChange={onCurrentPageChange}
            onPageSizeChange={onPageSizeChange}
            portionValue={pageSize.toString()}
            totalCount={data?.getPayments.totalCount}
        />

    </div>
}

export default PaymentsList
