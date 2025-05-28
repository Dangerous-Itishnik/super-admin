import UserRow from '@/features/users/UserRow'
import styles from './users.module.scss'
import {User} from '@/generated/graphql'
import React from 'react'

type UsersTableProps = {
    data: { getUsers: { users: User[] } } | undefined
    icon: (key: string) => React.ReactNode
    onChangeSortBy: (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>, key: string) => void
    refetch: () => void
    onUserDetails: (userId: number) => void
    ref?: React.RefObject<HTMLTableElement>
}

const UsersTable = React.memo(
    React.forwardRef<HTMLTableElement, UsersTableProps>(
        ({data, icon, onChangeSortBy, refetch, onUserDetails }, ref) => {
            return (
                <table ref={ref} className={styles.table}>
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th onClick={e => onChangeSortBy(e, 'name')}>Username {icon('name')}</th>
                        <th>Profile link</th>
                        <th onClick={e => onChangeSortBy(e, 'date')}>Date {icon('date')}</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.getUsers.users.map(user => (
                        <UserRow key={user.id} user={user} refetch={refetch} onUserDetails={onUserDetails}/>
                    ))}
                    </tbody>
                </table>
            )
        }
    )
)

export default UsersTable
