import type {Post as PostType} from "@/generated/graphql";
import {SwiperSlider} from "@/components/Swiper/SwiperSlider";
import styles from "./post.module.scss"
import SmallAvatar from "@/components/SmallAvatar/SmallAvatar";
import {Typography} from "@/components/Typography";
import Default from "../../assets/icons/svg/person.svg"
import Link from "next/link";
import {useState} from "react";
import {formatDistanceToNow} from "date-fns";
import UnBlock from "@/assets/icons/components/UnBlock";
import Block from "@/assets/icons/components/Block";
import {useModal} from "@/libs/hooks/useModal";
import UserBan from "@/features/BanAndUnban/UserBan";



type Props ={
    post: PostType;
    refetch: () => void;
}
const Post = ({post, refetch,...props}: Props) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleDescription = () => {
        setIsExpanded(!isExpanded)
    }
    return (
        <div className={styles.post} data-id={post.id} {...props}>
            {post && (
                <div className={`${styles.slider} ${isExpanded ? styles.sliderShift : ''}`}>
                    <SwiperSlider imagesUrl={post.images ?? []}/>
                </div>
            )}
            {post.postOwner && (
                <div className={isExpanded ? styles.sliderShift : styles.truncated}>
                    <div className={styles.user}>
                        {post.postOwner.avatars && post.postOwner.avatars.length > 0 ? (
                            <SmallAvatar url={post.postOwner.avatars[0].url ?? ''}/>
                        ) : (
                            <SmallAvatar url={Default}/>
                        )}
                        <Link href={`/users/${post.postOwner.id}/info`}>
                            {post.postOwner.userName || 'User Profile'}
                        </Link>
                        <div>
                            <UserBan
                                user={post.postOwner}
                                refetch={refetch}
                                triggerButton={post.userBan ? <Block /> : <UnBlock />}
                            />
                        </div>
                    </div>
                    <Typography variant="body2" className={styles.date}>
                        {formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}
                    </Typography>
                </div>
            )}
            {post && (
                <div className={styles.text}>
                    <div className={styles.descriptionContainer}>
                        <Typography
                            variant="body2"
                            className={`${styles.description} ${isExpanded ? styles.expanded : styles.truncated}`}
                        >
                            {isExpanded ? (
                                <>
                                    {post.description}
                                    <span
                                        style={{cursor: 'pointer', color: 'aquamarine'}}
                                        onClick={toggleDescription}
                                        onKeyDown={(e) => e.key === 'Enter' && toggleDescription()}
                                        role="button"
                                        tabIndex={0}
                                    >
                    {'  Show less'}
                  </span>
                                </>
                            ) : (
                                <>
                                    <span className={styles.descriptionText}>{post.description}</span>
                                    <span
                                        style={{color: 'aquamarine', cursor: 'pointer'}}
                                        onClick={toggleDescription}
                                        onKeyDown={(e) => e.key === 'Enter' && toggleDescription()}
                                        role="button"
                                        tabIndex={0}
                                    >
                    {'  Show more'}
                  </span>
                                </>
                            )}
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Post;
