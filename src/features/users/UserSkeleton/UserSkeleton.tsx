import React from 'react';
import styles from './userSkeleton.module.scss';

interface UserPageSkeletonProps {
    rows?: number;
}

const UserSkeleton: React.FC<UserPageSkeletonProps> = ({ rows = 5 }) => {
    return (
        <>
            {/* Search and Filter Skeleton */}
            <div className={styles.sands}>
                <div className={styles.searchSkeleton}>
                    <div className={styles.skeletonInput}></div>
                </div>
                <div className={styles.selectSkeleton}>
                    <div className={styles.skeletonSelect}></div>
                </div>
            </div>

            {/* Table Skeleton */}
            <div className={styles.tableContainer}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th><div className={styles.skeletonHeaderText}></div></th>
                            <th><div className={styles.skeletonHeaderText}></div></th>
                            <th><div className={styles.skeletonHeaderText}></div></th>
                            <th><div className={styles.skeletonHeaderText}></div></th>
                            <th><div className={styles.skeletonHeaderText}></div></th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from({ length: rows }).map((_, index) => (
                            <tr key={index}>
                                <td><div className={styles.skeletonCellText}></div></td>
                                <td><div className={styles.skeletonCellText}></div></td>
                                <td><div className={styles.skeletonCellText}></div></td>
                                <td><div className={styles.skeletonCellText}></div></td>
                                <td><div className={styles.skeletonCellText}></div></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Skeleton */}
            <div className={styles.paginationSkeleton}>
                <div className={styles.skeletonPaginationItem}></div>
                <div className={styles.skeletonPaginationItem}></div>
                <div className={styles.skeletonPaginationItem}></div>
                <div className={styles.skeletonPaginationItem}></div>
                <div className={styles.skeletonPaginationItem}></div>
            </div>
        </>
    );
};

export default UserSkeleton;