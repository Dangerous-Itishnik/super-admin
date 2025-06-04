import React from 'react'
import {Block} from '@/assets/icons/components'
import DropdownSelect from '@/features/users/DropdownSelect/DropdownSelect'
import styles from './users.module.scss'
import {User} from '@/generated/graphql'
import Link from "next/link"

type UserRowProps = {
    user: User
    refetch: () => void
    onUserDetails: (userId: number) => void
}

// eslint-disable-next-line react/display-name
const UserRow = React.memo(({user, refetch, onUserDetails}: UserRowProps) => (
    <tr key={user.id} style={{color: 'wheat'}} className={styles.users}>
        <td>{user.id}</td>
        <td>
            {user.userBan ? (
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Block/> {user.userName}
                </div>
            ) : (
                user.userName
            )}
        </td>
        <td><Link href={`/users/${user.id}/info`}>{user.userName}</Link></td>
        <td>{new Date(user.createdAt).toLocaleDateString('ru-RU')}</td>
        <td>
            <DropdownSelect user={user} refetch={refetch} onUserDetails={onUserDetails} />
        </td>
    </tr>
))

export default UserRow
