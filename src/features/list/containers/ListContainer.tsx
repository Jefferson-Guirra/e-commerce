import styles from './styles.module.css'
import { ListBooks } from '../pages/ListBooks'
import { IDataBook } from '../../../services/db/@types'
interface IListContainer {
  books: IDataBook[]
}
export const ListContainer = (props: IListContainer) => {
  return (
    <main className={styles.container}>
      <ListBooks {...props} />
    </main>
  )
}
