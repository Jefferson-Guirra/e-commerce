import styles from './styles.module.css'
import { ListBooks } from '../pages/ListBooks'
import { DataBook } from '../../../services/helper/FirebaseFunctions'
interface IListContainer {
  books: DataBook[]
}
export const ListContainer = (props: IListContainer) => {
  return (
    <main className={styles.container}>
      <ListBooks {...props} />
    </main>
  )
}
