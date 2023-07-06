import { ReactNode } from 'react'
import styles from './styles.module.css'

interface Props {
  children: ReactNode
}
export const ListInfo = ({ children }: Props) => {
  return <article className={styles.container}>{children}</article>
}
