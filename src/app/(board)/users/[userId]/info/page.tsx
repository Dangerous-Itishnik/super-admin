'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'
import ProfileTabs from '@/components/Tabs/ProfileTabs'

type ValidTab = 'Photos' | 'Payments' | 'Followers' | 'Following'

export default function InfoPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState<ValidTab>('Photos')

  const userId = params.userId as string
  const tabParam = params.tab?.[0] as ValidTab | undefined

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam)
    } else if (!tabParam) {
      router.replace(`/users/${userId}/info/updated_photos`)
    }
  }, [tabParam, activeTab, userId, router])

  const handleTabChange = (tab: ValidTab) => {
    setActiveTab(tab)
    router.push(`/users/${userId}/info/${tab}`)
  }

  return (
    <div>
      <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
