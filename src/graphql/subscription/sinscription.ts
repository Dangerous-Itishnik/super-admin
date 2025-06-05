import {gql} from "@apollo/client";

export const POST_ADDED_SUBSCRIPTION = gql`
    subscription PostAdded($postId: Int!) {
        postAdded(postId: $postId) {
            images {
                id
                createdAt
                url
                width
                height
                fileSize
            }
            id
            ownerId
            description
            createdAt
            updatedAt
            postOwner{
                id
                userName
                firstName
                lastName
                avatars{
                    url
                    width
                    height
                    fileSize
                }
            }
        }
    }
`;