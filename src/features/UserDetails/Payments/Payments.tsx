import {useGetPaymentsByUserQuery} from "@/generated/graphql";
import {useParams} from "next/navigation";
import {useAction} from "@/libs/hooks/useAction";

import {Table} from "@/components/Table/Table";
import {usePaymentsTableConfig} from "@/features/UserDetails/configs";
import {Pagination} from "@/components/pagination/Pagination";

const Payments = () => {
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
    const {data, error, loading} = useGetPaymentsByUserQuery({
        variables: {
            userId: userIdNum,
            pageSize: 6,
            pageNumber: currentPage as number,
            sortBy,
            sortDirection: sort
        }
    })

    const {columns} = usePaymentsTableConfig()

    return (
        <div>
            <Table
                data={data?.getPaymentsByUser?.items ?? []}
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
                totalCount={data?.getPaymentsByUser.totalCount}
            />
        </div>
    )
}

export default Payments
