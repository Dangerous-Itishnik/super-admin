import Image from 'next/image'
import styles from './ImageCard.module.scss'
import {ImagePost} from "@/generated/graphql";

type Props = {
    post: ImagePost
}
export const ImageCard = ({post}: Props) => {
    return (
        <>
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
        </>
    )
}
