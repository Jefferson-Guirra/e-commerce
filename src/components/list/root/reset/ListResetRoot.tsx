import { ReactNode } from 'react'
import styles from './styles.module.css'

interface Props {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  children: ReactNode
}
export const ListResetRoot = ({ children, onClick }: Props) => {
  return (
    <article className={styles.container} onClick={onClick}>
      {children}
    </article>
  )
}
