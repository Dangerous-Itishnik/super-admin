import {useMemo} from "react";
import {TableColumn} from "@/components/Table/table";
import DropdownSelect from "@/features/users/DropdownSelect/DropdownSelect";
import {Block} from "@/assets/icons/components";
import {Follow, User} from "@/generated/graphql";

export const useFollowersTableConfig = () => {
    const columns: TableColumn[] = useMemo(() => [
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
    const columns: TableColumn[] = useMemo(() => [
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
    const columns: TableColumn[] = useMemo(() => [
        {
            key: 'dateOfPayment',
            label: 'Date of Payment',
            render: (payment) =>
                new Date(payment.dateOfPayment).toLocaleDateString(),
            sortable: true,
        },
        {
            key: 'endDate',
            label: 'End Date of Subscription',
            render: (payment) =>
                new Date(payment.endDate).toLocaleDateString(),
        },
        {
            key: 'price',
            label: 'Amount, $',
            render: (payment) => `$${payment.price}`,
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
    const columns: TableColumn[]  = useMemo(() => [
        {
            key: 'id',
            label: 'User ID',
            sortable: false,
        },
        {
            key: 'name',
            label: 'Username',
            sortable: true,
            render: (user: User) => (
                user.userBan ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Block /> {user.userName}
                    </div>
                ) : (
                    user.userName
                )
            )
        },
        {
            key: 'profileLink',
            label: 'Profile link',
            sortable: false,
            render: (user: User) => <a href={`/users/${user.id}/info`}>{user.userName}</a>
        },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            render: (user: User) => new Date(user.createdAt).toLocaleDateString(),
            accessor: 'createAt'
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (user: User, _: unknown, context?: any) => (
                <DropdownSelect
                    user={user}
                    refetch={context?.refetch}
                    onUserDetails={context?.onUserDetails}
                />
            )
        }
    ], [])

    return { columns }
}
