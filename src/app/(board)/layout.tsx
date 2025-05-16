'use client'
import React, { ReactNode } from 'react'

import Sidebar from '@/components/layout/SideBar'
import { useAuth } from '@/libs/hooks/AuthHook.'
import Header from '@/components/layout/Header'
import styles from './board.module.scss'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <div>Lade...</div>
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
