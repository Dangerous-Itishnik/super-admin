import SignInForm from '@/components/auth/SignIn'
import '../styles/_index.scss'

import styles from './page.module.scss'
export default async function HomePage() {
  return (
    <div className={styles.container}>
      <SignInForm />
    </div>
  )
}
