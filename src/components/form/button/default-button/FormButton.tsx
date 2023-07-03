import { ButtonHTMLAttributes, ElementType, ReactNode } from 'react'
import styles from '../styles.module.css'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  children: ReactNode
}
export const FormButton = ({ text, children, ...rest }: Props) => {
  return (
    <>
      {!rest.disabled ? (
        <button className={styles.btn} {...rest}>
          {text}
        </button>
      ) : (
        <button className={styles.btn} {...rest}>
          {children}
        </button>
      )}
    </>
  )
}
