import { InputHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className: 'checkbox' | 'text' | 'password' | 'number' | 'reset-checkbox'
}

export const ListInput = ({ className, ...rest }: Props) => {
  return <input {...rest} className={styles[`input-${className}`]} />
}
