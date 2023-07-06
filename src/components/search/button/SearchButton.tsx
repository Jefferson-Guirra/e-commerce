import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const SearchButton = ({ children, ...rest }: Props) => {
  return (
    <button className={styles.btn} {...rest}>
      {children}
    </button>
  )
}

export default SearchButton
