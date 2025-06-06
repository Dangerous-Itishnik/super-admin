import {useGetFollowersQuery} from "@/generated/graphql";
import {useParams} from "next/navigation";
import {Table} from "@/components/Table/Table"
import {useAction} from "@/libs/hooks/useAction";
import {useFollowersTableConfig} from "@/features/UserDetails/configs";
import {Pagination} from "@/components/pagination/Pagination";
import UserDetailSkeleton from "@/features/UserDetails/UserDetailsSkeleton/UserDetailSkeleton";
import React from "react";


export default function Followers() {
    const {userId} = useParams()
    const userIdNum = Number(userId)
    const {columns} = useFollowersTableConfig()
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
        sortBy,
    } = useAction();
    const {data, loading, error} = useGetFollowersQuery({
        variables: {
            userId: userIdNum,
            pageSize: pageSize,
            pageNumber: currentPage as number,
            sortBy,
            sortDirection: sort
        }
    })

    return (
        <>
            {loading ? (
                <UserDetailSkeleton rows={5}/>
            ) : (
                <div>
                    <Table
                        data={data?.getFollowers.items || []}
                        columns={columns}
                        loading={loading}
                        error={error?.message}
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
                        totalCount={data?.getFollowers.totalCount}
                    />
                </div>
            )}
        </>

    )
}
