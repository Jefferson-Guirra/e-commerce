import { FormHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'
interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

const Root = ({ children, onSubmit, ...rest }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit && onSubmit(e)
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form} {...rest}>
      {children}
    </form>
  )
}

export default Root
