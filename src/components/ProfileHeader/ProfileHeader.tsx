import Image from 'next/image'
import styles from './profileHeader.module.scss'
import { Typography } from '@/components/Typography'
import { useParams } from 'next/navigation'
import { useGetUserQuery } from '@/generated/graphql'
import Link from "next/link"
import ArrowBackOutline from "@/assets/icons/components/ArrowBackOutline";

const ProfileHeader = () => {
    const { userId } = useParams()
    const userIdNum = Number(userId)

    const { data, error, loading } = useGetUserQuery({
        variables: { userId: userIdNum },
        skip: isNaN(userIdNum),
    })
    const profile = data?.getUser?.profile
    const userName = data?.getUser?.userName

    if (loading) return <div>Загрузка...</div>
    if (error || !profile) return <div>Ошибка загрузки профиля</div>

    return (
        <div className={styles.headerContainer}>
            <Link  href="/users" >
                <ArrowBackOutline/>
            </Link>
            <div className={styles.imageAndUsername}>
                <div className={styles.imageContainer}>
                    {profile.avatars?.length ? (
                        <Image
                            alt="UserPhoto"
                            className={styles.avatar}
                            fill
                            priority
                            sizes="(max-width: 60px) 100vw"
                            src={profile.avatars[0]?.url ?? '/default-avatar.png'}
                        />
                    ) : (
                        <div className={styles.avatar}>фото нет</div>
                    )}
                </div>

                <div className={styles.textContainer}>
                    <Typography className={styles.userName} variant="h3">
                        {userName}
                    </Typography>
                    <Typography className={styles.userEmail} variant="body2">
                        {data?.getUser.email}
                    </Typography>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.userNameContainer}>
                    <Typography className={styles.userName} variant="body2">
                        UserID <br/>
                        {profile.id}
                    </Typography>
                    <Typography className={styles.userName} variant="body2">
                        Profile Creation Date <br/>
                        {new Date(data.getUser.createdAt).toLocaleDateString('ru-RU')}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader

