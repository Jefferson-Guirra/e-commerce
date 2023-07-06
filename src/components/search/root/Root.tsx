import { FormHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'
interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

const Root = ({ children, ...rest }: Props) => {
  return (
    <form className={styles.form} {...rest}>
      {children}
    </form>
  )
}

export default Root
