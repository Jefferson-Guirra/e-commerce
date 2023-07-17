import { ReactNode } from 'react'
import styles from './styles.module.css'
interface Props {
  title: string
  children: ReactNode
}

export const ListHeaderCard = ({ title, children }: Props) => {
  return (
    <article className={styles.container}>
      <h2>{title}</h2>
      {children}
    </article>
  )
}
