'use client'
import { useParams, useRouter } from 'next/navigation'
import ProfileTabs from '@/components/Tabs/ProfileTabs'
export default function Page() {
  const params = useParams()
  const tab = params.tab as 'Photos' | 'Payments' | 'Followers' | 'Following'
  const id = Number(params.userId)
  const router = useRouter()

  const handleTabChange = (tab: 'Photos' | 'Payments' | 'Followers' | 'Following') => {
    router.push(`/users/${id}/info/${tab}`)
  }

  return <ProfileTabs activeTab={tab} onTabChange={handleTabChange} />
}
