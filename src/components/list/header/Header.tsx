import { ReactNode } from 'react'
import styles from './styles.module.css'
interface Props {
  title: string
  children: ReactNode
}
export const ListHeader = ({ title, children }: Props) => {
  return (
    <section className={styles.container}>
      <h1>{title}</h1>
      <article className={styles.actions}>{children}</article>
    </section>
  )
}
