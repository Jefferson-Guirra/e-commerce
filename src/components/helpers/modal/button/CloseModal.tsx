import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const CloseModal = ({ children, className, ...rest }: Props) => {
  return (
    <button className={`${className} ${styles.btn}`} {...rest}>
      {children}
    </button>
  )
}
