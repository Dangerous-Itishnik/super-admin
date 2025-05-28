import React, {useCallback, useMemo, useState} from "react";
import {PaginationModel, useGetFollowersQuery, useGetFollowingQuery} from "@/generated/graphql";
import {useSortBy} from "@/libs/hooks/useSort";
import usePagination from "@/libs/hooks/usePagination";
import {useParams} from "next/navigation";
import styles from "@/features/UserDetails/Followers/followers.module.scss";
import {Typography} from "@/components/Typography";
import {Pagination} from "@/components/pagination/Pagination";


const Following = () => {
const [valuePagination] = useState<PaginationModel | null>(null)
const {icon, sort} = useSortBy()
const {currentPage, setCurrentPage, pageSize, setPageSize, sortBy} = usePagination()
const {userId} = useParams()
const userIdNum = Number(userId)
const {data} = useGetFollowingQuery({
  variables: {
    userId: userIdNum,
    pageSize: 10,
    pageNumber: currentPage as number,
    sortBy,
    sortDirection: sort
  }
})


const paginationOptions = useMemo(
    () => [
      {label: '10', value: '10'},
      {label: '20', value: '20'},
      {label: '30', value: '30'},
    ],
    []
)

const onPageSizeChange = useCallback(
    (value: number) => {
      setPageSize(value)
      setCurrentPage(1)
    },
    [setPageSize, setCurrentPage]
)
const onCurrentPageChange = useCallback(
    (value: number | string) => {
      setCurrentPage(Number(value))
    },
    [setCurrentPage]
)


return <div>
  <div className={styles.profileSettings}>
    <table className={styles.paymentsTable}>
      <thead>
      <tr>
        <th>
          <Typography variant={'h2'}>User ID</Typography>
        </th>
        <th>
          <Typography variant={'h2'}>Username</Typography>
        </th>
        <th>
          <Typography variant={'h2'}>Profile Link</Typography>
        </th>
        <th>
          <Typography variant={'h2'}>Subscription Date</Typography>
        </th>
      </tr>
      </thead>
      <tbody>
      {data?.getFollowing.items.map(follower => (
          <tr key={follower.id}>
            <td>{follower.userId}</td>
            <td>${follower.userName}</td>
            <td>{follower.userName}</td>
            <td>{new Date(follower.createdAt).toLocaleDateString()}</td>
          </tr>
      ))}
      </tbody>
    </table>
  </div>
  <Pagination
      options={paginationOptions}
      pageSize={pageSize}
      currentPage={currentPage as number}
      onCurrentPageChange={onCurrentPageChange}
      onPageSizeChange={onPageSizeChange}
      portionValue={pageSize.toString()}
      totalCount={valuePagination?.totalCount}
  />
</div>
}

export default Following
