import React from 'react'
import styles from './styles.module.css'
import { SignUp } from '../pages/SignUp'
export const SignUpContainer = () => {
  return (
    <main className={styles.container}>
      <SignUp />
    </main>
  )
}
