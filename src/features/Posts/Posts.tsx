'use client'
import {useCallback, useRef, useState} from "react";
import UserSearch from "@/components/Search/searchUser";
import Post from "@/components/Post/Post";
import {useSubscription} from "@apollo/client";
import {POST_ADDED_SUBSCRIPTION} from "@/graphql/subscription/sinscription";
import {useGetPostsQuery} from "@/generated/graphql";
import {useAction} from "@/libs/hooks/useAction";
import styles from "./posts.module.scss"
import {useObserver} from "@/libs/hooks/useObserver";
import {client} from "@/libs/apollo-client";

const Posts = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const listRef = useRef<HTMLDivElement>(null)
    const {sort, setCurrentPage, sortBy} = useAction();

    const {data, fetchMore, refetch, loading} = useGetPostsQuery({
        variables: {
            endCursorPostId: 0,
            pageSize: 4,
            sortBy,
            sortDirection: sort,
            searchTerm,
        },
        notifyOnNetworkStatusChange: true,
    });

    useSubscription(POST_ADDED_SUBSCRIPTION, {
        onData: ({ data: { data: subscriptionData } }) => {
            if (!subscriptionData?.postAdded) return;

            client.cache.modify({
                fields: {
                    getPosts(existing = { items: [] }) {
                        const existingItems = existing.items || [];
                        const alreadyExists = existingItems.some((post: Post) =>
                            post.id === subscriptionData.postAdded.id
                        );

                        if (alreadyExists) return existing;

                        return {
                            ...existing,
                            items: [subscriptionData.postAdded, ...existingItems],
                        };
                    },
                },
            });
        },
    });

    const oldPosts = data?.getPosts?.items || [];
    const posts = Array.from(
        new Map(oldPosts.map(post => [post.id, post])).values()
    );

    const loadMore = () => {
        if (!data?.getPosts?.items?.length) return;

        const lastPostId = data.getPosts.items[data.getPosts.items.length - 1]?.id || 0;

        fetchMore({
            variables: { endCursorPostId: lastPostId },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || !fetchMoreResult.getPosts) return prev;

                const existingItems = prev.getPosts?.items || [];
                const newItems = fetchMoreResult.getPosts.items || [];

                const allItems = [...existingItems, ...newItems];
                const uniqueItems = Array.from(
                    new Map(allItems.map(post => [post.id, post])).values()
                );

                return {
                    ...fetchMoreResult,
                    getPosts: {
                        ...fetchMoreResult.getPosts,
                        items: uniqueItems
                    }
                };
            }
        });
    };

    const handleSearch = useCallback(
        (newSearchTerm: string) => {
            console.log('Search triggered with term:', newSearchTerm);
            setSearchTerm(newSearchTerm);
            setCurrentPage(1);

            setTimeout(() => {
                console.log('Triggering refetch as backup...');
                refetch({
                    searchTerm: newSearchTerm,
                    endCursorPostId: 0,
                    pageSize: 4,
                    sortBy,
                    sortDirection: sort,
                }).then((result) => {
                    console.log('Backup refetch result:', result);
                }).catch((error) => {
                    console.error('Backup refetch error:', error);
                });
            }, 100);
        },
        [setCurrentPage, refetch, sortBy, sort]
    );


    const sentinelRef = useObserver(
        listRef,
        posts,
        {
            delay: 300,
            onBatchIntersect: () => {
                loadMore();
            },
            threshold: 0.1,
        }
    );

    return (
        <div className={styles.container}>
            <UserSearch onSearch={handleSearch} />
            <div className={styles.images} ref={listRef}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post key={post.id} post={post} data-id={post.id} />
                    ))
                ) : (
                    <div>
                        {loading ? 'Loading...' : 'No posts found'}
                    </div>
                )}
                <div ref={sentinelRef} data-id="sentinel" style={{ height: '1px' }} />
            </div>
        </div>
    );
};

export default Posts;