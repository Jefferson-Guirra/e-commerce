import { ButtonHTMLAttributes, ElementType, ReactNode } from 'react'
import styles from '../default/styles.module.css'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  children: ReactNode
}

export const ButtonAction = ({ text, children, disabled, ...rest }: Props) => {
  return (
    <div className={`${styles.container} ${styles.loading}`}>
      {!disabled ? (
        <button {...rest}>{text}</button>
      ) : (
        <button disabled {...rest}>
          {children}
        </button>
      )}
    </div>
  )
}
