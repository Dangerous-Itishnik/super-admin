import React, { useState } from 'react'
import { Input } from '../Input/Input'
import styles from './search.module.scss'
interface UserSearchProps {
  onSearch: (searchTerm: string) => void
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.search}>
        <Input
          type="search"
          label={''}
          id="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by username"
        />
      </div>
    </form>
  )
}

export default UserSearch
