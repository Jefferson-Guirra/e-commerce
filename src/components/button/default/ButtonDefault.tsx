import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  children?: ReactNode
}

export const ButtonDefault = ({ text, children, ...rest }: Props) => {
  return (
    <div className={styles.container}>
      <button {...rest}>
        {children}
        {text}
      </button>
    </div>
  )
}
