import React from 'react'
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader'

const Photos = ({ userId }: { userId: number }) => {
  return (
    <div>
      <ProfileHeader userId={userId} />
    </div>
  )
}

export default Photos
