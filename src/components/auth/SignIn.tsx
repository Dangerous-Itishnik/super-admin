'use client'
import React, { useState } from 'react'
import { useAuth } from '@/libs/hooks/AuthHook.'
import styles from './singIn.module.scss'
import {Button} from "@/components/Button/Button";



const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState("admin")
  const [error, setError] = useState('')
  const { login, loginLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await login(email, password)
    if (!result.success) {
      setError(result.error || 'Authentication failed')
    }
  }

  return (
    <div>
      <div>
        {error && <div>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
             className={styles.input}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div>
            <Button type="submit" disabled={loginLoading} variant={"secondary"}>
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInForm
