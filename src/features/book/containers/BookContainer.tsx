import styles from './styles.module.css'
import { IBookProps } from '../@types/IBookProps'
import { Book } from '../pages/Book'
export const BookContainer = (props: IBookProps) => {
  return (
    <main className={styles.container}>
      <Book {...props} />
    </main>
  )
}
