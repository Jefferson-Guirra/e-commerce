import styles from './styles.module.css'
import { AddBookModel } from '../../../@types/book/add-book-model'
import { Books } from '../pages/Books'

interface IListContainer {
  books: AddBookModel[]
  accessToken: string
}
export const ListContainer = (props: IListContainer) => {
  return (
    <main className={styles.container}>
      <Books books={props.books} />
    </main>
  )
}
