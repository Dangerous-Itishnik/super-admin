'use client'
import React, { ReactNode } from 'react'

import Sidebar from '@/components/Layout/SideBar'
import { useAuth } from '@/libs/hooks/AuthHook.'
import Header from '@/components/Layout/Header'
import styles from './board.module.scss'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className={styles.bodyContainer}>
      <Header />
      <div className={styles.mainBody}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
export default Layout
