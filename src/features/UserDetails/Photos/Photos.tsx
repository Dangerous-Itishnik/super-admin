'use client'
import {useGetPostsByUserQuery} from "@/generated/graphql";
import {useParams} from "next/navigation";
import {useState} from "react";
import {ImageCard} from "@/components/ImageCard/ImageCard";

import styles from "./photos.module.scss"

const Photos = () => {
    const [postId] = useState<number>(0)
    const {userId} = useParams()
    const userIdNum = Number(userId)

    const {data, loading} = useGetPostsByUserQuery({variables: {userId: userIdNum, endCursorId: postId}})
    return (
        <div className={styles.container}>
            {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                    <ImageCard key={`skeleton-${index}`} isSkeleton={true} />
                ))
            ) : (
                data?.getPostsByUser?.items?.map((image) => (
                    <ImageCard post={image} key={image.id} />
                ))
            )}
        </div>
    )
}

export default Photos
