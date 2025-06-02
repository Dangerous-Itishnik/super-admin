import React, {useMemo} from "react";
import {TableColumn} from "@/components/Table/Table";
import {Follow, Payment, User} from "@/generated/graphql";
import DropdownSelect from "@/features/users/DropdownSelect/DropdownSelect";
import {Block} from "@/assets/icons/components";


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

export const useUsersTableConfig = () => {
    const columns: TableColumn<User>[] = useMemo(() => [
        {
            key: 'id',
            label: 'User ID',
            accessor: 'id'
        },
        {
            key: 'userName',
            label: 'Username',
            sortable: true,
            render: (user) => (
                user.userBan ? (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Block/> {user.userName}
                    </div>
                ) : (
                    user.userName
                )
            ),
            accessor: 'userName'
        },
        {
            key: 'profileLink',
            label: 'Profile link',
            render: (user, _value, context) => (
                <a
                    href={`/users/${user.id}/info`}
                    onClick={(e) => {
                        e.preventDefault();
                        context?.onUserDetails?.(user.id);
                    }}
                >
                    {user.userName}
                </a>
            )
        },
        {
            key: 'createdAt',
            label: 'Registration Date',
            sortable: true,
            render: (user) => new Date(user.createdAt).toLocaleDateString(),
            accessor: 'createdAt'
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (user, _value, context) => (
                <DropdownSelect
                    user={user}
                    refetch={context?.refetch ?? (() => {})}
                    onUserDetails={() => context?.onUserDetails?.(user.id)}
                />
            )
        }
    ], []);

    return { columns };
};
