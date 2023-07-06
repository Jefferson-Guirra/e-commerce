import { IBuyBooksProps } from '../@types/IBuyBooksProps'
import styles from './styles.module.css'
import { BooksList } from '../pages/BooksList'

export const BooksListContainer = (props: IBuyBooksProps) => {
  return (
    <div className={styles.container}>
      <BooksList {...props} />
    </div>
  )
}
