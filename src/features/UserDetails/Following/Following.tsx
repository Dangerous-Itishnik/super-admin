import {useGetFollowingQuery} from "@/generated/graphql";
import {useParams} from "next/navigation";
import styles from "@/features/UserDetails/Followers/followers.module.scss";
import {Table} from "@/components/Table/table"

import {useAction} from "@/libs/hooks/useAction";
import {useFollowingTableConfig} from "@/features/UserDetails/configs";
import {Pagination} from "@/components/pagination/Pagination";


const Following = () => {
    const {userId} = useParams()
    const userIdNum = Number(userId)
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

    const {data, loading, error} = useGetFollowingQuery({
        variables: {
            userId: userIdNum,
            pageSize: pageSize,
            pageNumber: currentPage as number,
            sortBy,
            sortDirection: sort
        }
    })

    const {columns} = useFollowingTableConfig()

    return (
        <div className={styles.profileSettings}>
            <Table
                data={data?.getFollowing.items || []}
                columns={columns}
                loading={loading}
                error={error?.message}
                tableClassName={styles.paymentsTable}
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
                totalCount={data?.getFollowing.totalCount}
            />
        </div>
    )
}
export default Following
