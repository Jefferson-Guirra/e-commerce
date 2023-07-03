import { FormHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}
export const FormRoot = ({ children, ...rest }: Props) => {
  return (
    <form className={styles.container} {...rest}>
      {children}
    </form>
  )
}
