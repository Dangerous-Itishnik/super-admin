import {useMemo} from "react";
import {TableColumn} from "@/components/Table/table";
import {Follow, Payment} from "@/generated/graphql";

export const useFollowersTableConfig = () => {
    const columns: TableColumn<Follow>[] = useMemo(() => [
        {
            key: 'userId',
            label: 'User ID',
        },
        {
            key: 'userName',
            label: 'Username',
            render: (follower: Follow) => `${follower.userName}`
        },
        {
            key: 'profileLink',
            label: 'Profile Link',
            accessor: 'userName'
        },
        {
            key: 'createdAt',
            label: 'Subscription Date',
        }
    ], [])

    return { columns }
}

export const useFollowingTableConfig = () => {
    const columns: TableColumn<Follow>[] = useMemo(() => [
        {
            key: 'userId',
            label: 'User ID',
        },
        {
            key: 'userName',
            label: 'Username',
            render: (following: Follow) => `$${following.userName}`
        },
        {
            key: 'profileLink',
            label: 'Profile Link',
            accessor: 'userName'
        },
        {
            key: 'createdAt',
            label: 'Subscription Date',
        }
    ], [])

    return { columns }
}

export const usePaymentsTableConfig = () => {
    const columns: TableColumn<Payment>[] = useMemo(() => [
        {
            key: 'dateOfPayment',
            label: 'Date of Payment',
            render: (payment: Payment) =>
                new Date(payment.createdAt).toLocaleDateString(),
            sortable: true,
        },
        {
            key: 'endDate',
            label: 'End Date of Subscription',
            render: (payment: Payment) =>
                new Date(payment.endDate).toLocaleDateString(),
        },
        {
            key: 'price',
            label: 'Amount, $',
            render: (payment) => `$${payment.amount}`,
            sortable: true,
        },
        {
            key: 'type',
            label: 'Subscription Type',
        },
        {
            key: 'paymentType',
            label: 'Payment Type',
        },
    ], [])

    return { columns }
}
