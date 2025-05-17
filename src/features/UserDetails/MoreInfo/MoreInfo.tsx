'use client'

import {useGetUserQuery} from "@/generated/graphql";
import {useParams} from "next/navigation";



const MoreInfo = () => {
    const { userId } = useParams()
    const userIdNumber = Number(userId)
    const { data, error } = useGetUserQuery({
        variables: { userId: 2679 }
    })
    if (!userId) {
        return <div>User ID not found in URL</div>
    }



    if (isNaN(userIdNumber)) {
        return <div>Invalid user ID format</div>
    }



    if (error) {
        return <div>Error loading user: {error.message}</div>
    }
    return (
        <div> Hallo ich bin da</div>
    )
}

export default MoreInfo