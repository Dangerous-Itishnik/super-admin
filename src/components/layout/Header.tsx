'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import styles from './header.module.scss'

const Header: React.FC = () => {
  const pathname = usePathname()

  // Set page title based on current path
  const getPageTitle = () => {
    if (pathname?.startsWith('/users/')) {
      return 'User Details'
    } else if (pathname === '/users') {
      return 'Users List'
    } else if (pathname === '/dashboard') {
      return 'Dashboard'
    }
    return 'Super Admin Panel'
  }

  return (
    <header className={styles.header}>
      <h1>{getPageTitle()}</h1>

      <div>
        <span>Super Admin</span>
      </div>
    </header>
  )
}

export default Header
