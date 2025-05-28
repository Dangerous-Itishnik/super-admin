import React, {useCallback, useMemo, useState} from 'react'
import {PaginationModel, useGetPaymentsByUserQuery} from "@/generated/graphql";
import {useParams} from "next/navigation";
import {useSortBy} from "@/libs/hooks/useSort";
import usePagination from "@/libs/hooks/usePagination";
import {Pagination} from "@/components/pagination/Pagination";
import {Typography} from "@/components/Typography";

import styles from "./payments.module.scss"

const Payments = () => {
    const [valuePagination] = useState<PaginationModel | null>(null)
    const {sort} = useSortBy()
    const {currentPage, setCurrentPage, pageSize, setPageSize, sortBy} = usePagination()
    const {userId} = useParams()
    const userIdNum = Number(userId)
    const {data} = useGetPaymentsByUserQuery({
        variables: {
            userId: userIdNum,
            pageSize: 10,
            pageNumber: currentPage as number,
            sortBy,
            sortDirection: sort
        }
    })

    console.log(data)
    const paginationOptions = useMemo(
        () => [
            {label: '10', value: '10'},
            {label: '20', value: '20'},
            {label: '30', value: '30'},
        ],
        []
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


    return <div>
        <div className={styles.profileSettings}>
        <table className={styles.paymentsTable}>
            <thead>
            <tr>
                <th>
                    <Typography variant={'h2'}>Date of Payment</Typography>
                </th>
                <th>
                    <Typography variant={'h2'}>End Date of Subscription</Typography>
                </th>
                <th>
                    <Typography variant={'h2'}>Amount, $</Typography>
                </th>
                <th>
                    <Typography variant={'h2'}>Subscription Type</Typography>
                </th>
                <th>
                    <Typography variant={'h2'}>Payment Type</Typography>
                </th>
            </tr>
            </thead>
            <tbody>
            {data?.getPaymentsByUser?.items.map(payment => (
                <tr key={payment.id}>
                    <td>{new Date(payment.dateOfPayment).toLocaleDateString()}</td>
                    <td>{new Date(payment.endDate).toLocaleDateString()}</td>
                    <td>${payment.price}</td>
                    <td>{payment.type}</td>
                    <td>{payment.paymentType}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        <Pagination
            options={paginationOptions}
            pageSize={pageSize}
            currentPage={currentPage as number}
            onCurrentPageChange={onCurrentPageChange}
            onPageSizeChange={onPageSizeChange}
            portionValue={pageSize.toString()}
            totalCount={valuePagination?.totalCount}
        />
    </div>
}

export default Payments
