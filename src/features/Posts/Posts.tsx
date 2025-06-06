'use client'
import {useCallback, useEffect, useRef, useState} from "react";
import UserSearch from "@/components/Search/searchUser";
import Post from "@/components/Post/Post";
import {
    GetPostsQuery,
    PostAddedDocument,
    PostAddedSubscription,
    useGetPostsQuery,
} from "@/generated/graphql";
import {useAction} from "@/libs/hooks/useAction";
import styles from "./posts.module.scss"
import {useObserver} from "@/libs/hooks/useObserver";
import PostSkeleton from "@/features/Posts/PostSkeleton/PostSkeleton";


const Posts = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const listRef = useRef<HTMLDivElement>(null)
    const {sort, setCurrentPage, sortBy} = useAction();

    const {data, fetchMore, refetch, loading, error, networkStatus, subscribeToMore} = useGetPostsQuery({
        variables: {
            endCursorPostId: 0,
            pageSize: 4,
            sortBy,
            sortDirection: sort,
            searchTerm,
        },
        notifyOnNetworkStatusChange: true,
    })

    useEffect(() => {
        const unsubscribe = subscribeToMore<PostAddedSubscription>({
            document: PostAddedDocument,
            updateQuery: (prev: GetPostsQuery, {subscriptionData}) => {
                if (!subscriptionData?.data?.postAdded) return prev;

                const newPost = subscriptionData.data.postAdded;
                const existingPosts = prev.getPosts?.items || [];

                const postExists = existingPosts.some((post) => post.id === newPost.id);
                if (postExists) return prev;

                return {
                    ...prev,
                    getPosts: {
                        ...prev.getPosts,
                        items: [newPost, ...existingPosts]
                    }
                };
            }
        });

        return unsubscribe;
    }, [subscribeToMore]);

    const oldPosts = data?.getPosts?.items || []
    const posts = Array.from(
        new Map(oldPosts.map(post => [post.id, post])).values()
    )

    const loadMore = () => {
        if (!data?.getPosts?.items?.length) return;

        const lastPostId = data.getPosts.items[data.getPosts.items.length - 1]?.id || 0;

        fetchMore({
            variables: {endCursorPostId: lastPostId},
            updateQuery: (prev, {fetchMoreResult}) => {
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
            setSearchTerm(newSearchTerm);
            setCurrentPage(1);

            setTimeout(() => {
                refetch({
                    searchTerm: newSearchTerm,
                    endCursorPostId: 0,
                    pageSize: 4,
                    sortBy,
                    sortDirection: sort
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
// Initial Loading - zeige Skeleton
    const isInitialLoading = loading && !data;
    // Search Loading - wenn gesucht wird
    const isSearching = loading && networkStatus === 4; // NetworkStatus.refetch
    // Load More Loading - beim Paginieren
    const isLoadingMore = loading && networkStatus === 3;

    return (
        <div className={styles.container}>
            <UserSearch onSearch={handleSearch}/>

            <div className={styles.images} ref={listRef}>

                {posts.map((post) => (
                    <Post key={post.id} post={post} data-id={post.id} refetch={refetch}/>
                ))}

                {isInitialLoading && (
                    <>
                        {Array.from({length: 4}).map((_, index) => (
                            <PostSkeleton key={`skeleton-${index}`}/>
                        ))}
                    </>
                )}

                {isSearching && posts.length === 0 && (
                    <>
                        {Array.from({length: 4}).map((_, index) => (
                            <PostSkeleton key={`search-skeleton-${index}`}/>
                        ))}
                    </>
                )}

                {isLoadingMore && (
                    <>
                        {Array.from({length: 2}).map((_, index) => (
                            <PostSkeleton key={`loadmore-skeleton-${index}`}/>
                        ))}
                    </>
                )}

                {!loading && posts.length === 0 && searchTerm && (
                    <div className={styles.noResults}>
                        No posts found for "{searchTerm}"
                    </div>
                )}

                {error && (
                    <div className={styles.error}>
                        Error loading posts: {error.message}
                    </div>
                )}

                <div ref={sentinelRef} data-id="sentinel" style={{height: '1px'}}/>
            </div>
        </div>
    );
};

export default Posts;