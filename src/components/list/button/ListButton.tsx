import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className:
    | 'reset'
    | 'remove-all'
    | 'delete'
    | 'update'
    | 'close'
    | 'reset-all'
}
export const ListButton = ({ className, children, ...rest }: Props) => {
  return (
    <button className={styles[`btn-${className}`]} {...rest}>
      {children}
    </button>
  )
}
