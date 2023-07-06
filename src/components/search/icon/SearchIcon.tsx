import { ElementType } from 'react'
import styles from './styles.module.css'
interface Props {
  size: number
  color: string
  icon: ElementType
}

export const SearchIcon = ({ icon: Icon, ...rest }: Props) => {
  return <Icon className={styles.svg} {...rest} />
}
