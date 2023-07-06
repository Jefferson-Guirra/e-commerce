import { ReactNode } from 'react'
import styles from './styles.module.css'
interface Props {
  children: ReactNode
}

export const ListContainer = ({ children }: Props) => {
  return <article className={styles.container}>{children}</article>
}
