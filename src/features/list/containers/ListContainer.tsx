import styles from './styles.module.css'
import { ListBooks } from '../pages/ListBooks'
import { AddBookModel } from '../../../server/domain/usecases/book-list/add-book-list'
interface IListContainer {
  books: AddBookModel[]
  accessToken: string
}
export const ListContainer = (props: IListContainer) => {
  return (
    <main className={styles.container}>
      <ListBooks {...props} />
    </main>
  )
}
