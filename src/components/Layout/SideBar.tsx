'use client'

import Link from 'next/link'
import {useAuth} from '@/libs/hooks/AuthHook.'

import styles from './sideBar.module.scss'
import {Button} from '../Button/Button'
import {Person} from "@/assets/icons/components";
import Paid from "@/assets/icons/components/Paid";
import Image from "@/assets/icons/components/Image";
import TrendingUp from "@/assets/icons/components/TrendingUp";

const Sidebar = () => {
    const {logout} = useAuth()

    const navItems = [
        {name: 'Users list', href: '/users', icon: <Person/>},
        {name: 'Payments List', href: '/payments', icon: <Paid/>},
        {name: 'Statistic', href: '/statistic', icon: <TrendingUp/>},
        {name: 'Posts List', href: '/posts', icon: <Image/>},
    ]

    return (
        <div className={styles.sidebar}>
            <div className={styles.nav}>
                <nav className={styles.sidebar}>
                    <ul className={styles.list}>
                        {navItems.map(item => (
                            <li key={item.name} className={styles.item}>
                                <Link className={styles.link} href={item.href}>
                                    {item.icon} {item.name}
                                </Link>
                            </li>
                        ))}
                        <li className={styles.item}>
                            <Button variant={'outline'} onClick={logout}>
                                Logout
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
