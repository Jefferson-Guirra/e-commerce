import { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import Link from 'next/link'
import styles from './styles.module.css'

interface Props extends LinkProps {
  children: ReactNode
}

export const ListLink = ({ children, ...rest }: Props) => {
  return (
    <Link className={styles.link} {...rest}>
      {children}
    </Link>
  )
}
