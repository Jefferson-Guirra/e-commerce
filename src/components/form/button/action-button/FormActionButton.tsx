import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  children: ReactNode
}
export const FormActionButton = ({ text, children, ...rest }: Props) => {
  return (
    <button {...rest} className={styles.btn}>
      {children}
      {text}
    </button>
  )
}
