'use client'

import {useGetUserQuery, User} from "@/generated/graphql";
import {useParams} from "next/navigation";
import {useState} from "react";


const MoreInfo = () => {
const{userId} = useParams()


    const { data } = useGetUserQuery({
        variables: { userId: numericUserId},
    })



    return (
        <div>
            <h1>User Details</h1>

            <pre>{JSON.stringify(data?.getUser.id, null, 2)}</pre>
        </div>
    )
}

export default MoreInfo