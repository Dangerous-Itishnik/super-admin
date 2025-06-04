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

    const {data} = useGetPostsByUserQuery({variables: {userId: userIdNum, endCursorId: postId}})
    console.log(data)
    return (
        <div className={styles.container}>
            {data?.getPostsByUser?.items?.map((image) => (
                <ImageCard post={image} key={image.id}/>
            ))}
        </div>
    )
}

export default Photos
