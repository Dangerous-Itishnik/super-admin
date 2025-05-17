'use client'

import Image from 'next/image'
import styles from './profileHeader.module.scss'
import {Typography} from '@/components/Typography'
import {Profile} from "@/generated/graphql";

const ProfileHeader = ({profile}:{profile: Profile}) => {

    return (
        <div className={styles.headerContainer}>
            <div className={styles.imageContainer}>
                {profile.avatars?.length ? (
                    <Image
                        alt={`UserPhoto`}
                        className={styles.avatar}
                        fill
                        priority
                        sizes={'(max-width: 204px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                        // @ts-expect-error
                        src={profile.avatars | profile.avatars[0].url}
                    />
                ) : (
                    <div className={styles.avatar}>фото нет</div>
                )}
            </div>
            <div className={styles.container}>
                <div className={styles.userNameContainer}>
                    <Typography className={styles.userName} variant={'h3'}>
                        {profile.userName}
                    </Typography>
                    <Typography className={styles.userName} variant={'h3'}>
                        {profile.id}
                    </Typography>
                    <Typography className={styles.userName} variant={'h3'}>
                        {new Date(profile.createdAt).toLocaleDateString('ru-RU')}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
