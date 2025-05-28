import React, {useState} from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import {useParams, usePathname, useRouter} from 'next/navigation'

import styles from './tabs.module.scss'
import Photos from '@/features/UserDetails/Photos/Photos'
import Payments from '@/features/UserDetails/Payments/Payments'
import Followers from '@/features/UserDetails/Followers/Followers'
import Following from '@/features/UserDetails/Following/Following'
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";

export type TabType = 'Photos' | 'Payments' | 'Followers' | 'Following'

export type ProfileTabsProps = {
    activeTab: TabType
    onTabChange: (tab: TabType) => void
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({activeTab: propActiveTab, onTabChange}) => {
    const params = useParams()
    const pathname = usePathname()
    const router = useRouter()
    const id = Number(params.userId)
    const [internalActiveTab, setInternalActiveTab] = useState<TabType>(
        propActiveTab || (pathname?.split('/').pop() as TabType) || 'Photos'
    )

    const activeTab = propActiveTab !== undefined ? propActiveTab : internalActiveTab

    const handleValueChange = (value: string) => {
        const tab = value as TabType

        if (onTabChange) {
            onTabChange(tab)
        } else {
            setInternalActiveTab(tab)
            router.push(`/users/${id}/info/${tab}`)
        }
    }
    const tabValues: TabType[] = ['Photos', 'Payments', 'Followers', 'Following']
    return (
        <div className={styles.container}>
            <ProfileHeader/>
            <Tabs.Root className={styles.tabsRoot} onValueChange={handleValueChange} value={activeTab}>
                <Tabs.List className={styles.tabsList}>
                    {tabValues.map(tab => (
                        <Tabs.Trigger
                            className={`${styles.tabsTrigger} ${activeTab === tab ? styles.activeTab : ''}`}
                            key={tab}
                            value={tab}
                        >
                            {tab === 'Photos' && 'Photos'}
                            {tab === 'Payments' && 'Payments'}
                            {tab === 'Followers' && 'Followers'}
                            {tab === 'Following' && 'Following'}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                <Tabs.Content value={'Photos'}>
                    <Photos/>
                </Tabs.Content>
                <Tabs.Content value={'Payments'}>
                    <Payments/>
                </Tabs.Content>
                <Tabs.Content value={'Followers'}>
                    <Followers/>
                </Tabs.Content>
                <Tabs.Content value={'Following'}>
                    <Following/>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}

export default ProfileTabs
