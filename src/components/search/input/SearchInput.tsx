import { InputHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'

export const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <input className={styles.input} {...props} />
    </>
  )
}
