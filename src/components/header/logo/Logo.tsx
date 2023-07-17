import Link from 'next/link'
import { SiBookstack } from 'react-icons/si'
import styles from './styles.module.css'

export const Logo = () => {
  return (
    <Link href="/" className={styles.container}>
      <SiBookstack size={55} color="#ffa500" />
      <p>Literando</p>
    </Link>
  )
}
