'use client'
import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/libs/hooks/AuthHook.'

import styles from './sideBar.module.scss'
import { Button } from '../Button/Button'

const Sidebar: React.FC = () => {
  const { logout } = useAuth()

  const navItems = [
    { name: 'Users list', href: '/users', icon: 'users' },
    { name: 'Dashboard', href: '/dashboard', icon: 'chart-bar' },
  ]

  return (
    <div className={styles.sidebar}>
      <div className={styles.nav}>
        <nav className={styles.sidebar}>
          <ul className={styles.list}>
            {navItems.map(item => (
              <li key={item.name} className={styles.item}>
                <Link className={styles.link} href={item.href}>
                  {item.name}
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
