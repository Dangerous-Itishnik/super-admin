'use client'

import Image from 'next/image'
import styles from './profileHeader.module.scss'
import {Typography} from '@/components/Typography'
import { useGetUserQuery} from '@/generated/graphql'

type Props = {
    avatar: string,
    userName: string,
    userId: number,
    createdAt: Date
}

const ProfileHeader = ({avatar,userId,userName, createdAt}: Props) => {

    const {data} = useGetUserQuery({variables: {userId: userId}})
    console.log(data)

    console.log(data)

    return (
        <div className={styles.headerContainer}>
            <div className={styles.imageContainer}>
                {avatar?.length ? (
                    <Image
                        alt={`UserPhoto`}
                        className={styles.avatar}
                        fill
                        priority
                        sizes={'(max-width: 204px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                        src={avatar}
                    />
                ) : (
                    <div className={styles.avatar}>фото нет</div>
                )}
            </div>
            <div className={styles.container}>
                <div className={styles.userNameContainer}>
                    <Typography className={styles.userName} variant={'h3'}>
                        {userName}
                    </Typography>
                    <Typography className={styles.userName} variant={'h3'}>
                        {userId}
                    </Typography>
                    <Typography className={styles.userName} variant={'h3'}>
                        {new Date(createdAt).toLocaleDateString('ru-RU')}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
