import React, { useState } from 'react'
import { Input } from '../Input/Input'
import styles from './search.module.scss'

type UserSearchProps = {
  onSearch: (searchTerm: string) => void
}

const UserSearch = ({ onSearch }:UserSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('')


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.search}>
        <Input
          type="search"
          label={''}
          id="search"
          value={searchTerm}
          onChange= {handleChange}
          placeholder="Search by username"
        />
      </div>
    </form>
  )
}

export default UserSearch
