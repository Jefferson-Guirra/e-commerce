import { ReactNode } from 'react'
import styles from './styles.module.css'
interface Props {
  children: ReactNode
}
export const ListCard = ({ children }: Props) => {
  return <section className={styles.card}>{children}</section>
}
