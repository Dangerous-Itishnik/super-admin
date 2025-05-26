'use client'

import styles from './header.module.scss'
import Link from "next/link";

export const Header = () => {
    return (
        <header className={styles.header}>
            <Link href={'/'}>
                <h1 className={styles.logo}>Inctagram
                    <span>SuperAdmin</span>
                </h1>
            </Link>
        </header>
    );
};
