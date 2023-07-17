import { List } from '../../../../components'
import { useListContext } from '../../../../context/books-list/BookList'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5'
import { Api } from '../../../../utils/api'
import { parseCookies } from 'nookies'

interface Props {
  bookId: string
}

const bookApi = new Api()

export const Actions = ({ bookId: idBook }: Props) => {
  const { dispatch, loading } = useListContext()

  const handleDelete = async () => {
    const accessToken = JSON.parse(parseCookies().literando_accessToken)
    try {
      dispatch({ type: 'FETCH_START' })
      await bookApi.delete({ accessToken, idBook }, 'booklist/remove')
      dispatch({ type: 'REMOVE_BOOK', payload: { bookId: idBook } })
    } catch (err) {
      console.error(err)
    } finally {
      dispatch({ type: 'FETCH_SUCCESS' })
    }
  }

  return (
    <article className={styles.container}>
      <List.Button disabled={loading} className="delete" onClick={handleDelete}>
        <List.Icon icon={IoClose} size={20} color="#363636" />
      </List.Button>
    </article>
  )
}
