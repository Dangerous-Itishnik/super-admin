
import styles from "./postSkeleton.module.scss"

const PostSkeleton = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonText} style={{ width: '60%' }}></div>
            </div>
        </div>
    );
};

export default PostSkeleton