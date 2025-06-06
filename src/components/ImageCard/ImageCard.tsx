import Image from 'next/image'
import styles from './ImageCard.module.scss'
import {ImagePost} from "@/generated/graphql";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
    post: ImagePost
    isSkeleton?: boolean;
}
export const ImageCard = ({post, isSkeleton}: Props) => {
    return (
        <>
            {isSkeleton ? (
                <Skeleton width={234} height={228} borderRadius={3} />
            ) : (
            <div className={styles.imageBox}>
                {post.id && (
                    <Image
                        alt={`Image`}
                        className={styles.image}
                        key={post.id}
                        loading={'lazy'}
                        src={post.url || ''}
                        width={post.width ?? 234}
                        height={post.height ?? 228}
                    />
                )}
            </div>
                )}
        </>
    )
}
