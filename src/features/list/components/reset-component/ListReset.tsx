import { useState } from 'react'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5'
import { Api } from '../../../../utils/api'
import { List } from '../../../../components'
import { useListContext } from '../../../../context/books-list/BookList'
import { parseCookies } from 'nookies'
import { AddBookModel } from '../../../../server/domain/usecases/book-list/add-book-list'
interface IProps {
  reset: boolean
  handleReset: (state: boolean) => void
}

const apiBook = new Api()
export const ResetComponent = ({ reset, handleReset }: IProps) => {
  const { resetStorage, dispatch } = useListContext()
  const [bookList, setBookList] = useState<AddBookModel[]>([])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    book: AddBookModel
  ) => {
    if (e.target.checked) {
      setBookList((state) => [...state, book])
    } else {
      setBookList((state) =>
        state.filter(({ bookId }) => bookId !== book.bookId)
      )
    }
  }

  const handleCLick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { target, currentTarget } = e
    if (target === currentTarget) {
      handleReset(false)
    }
  }
  const handleSubmit = async () => {
    handleReset(false)
    const accessToken = JSON.parse(parseCookies().literando_accessToken)
    try {
      dispatch({ type: 'FETCH_COLLECTION_START' })
      if (bookList.length > 0) {
        for (const book of bookList) {
          const { date, id, queryDoc, ...bookFields } = book
          await apiBook.post({ accessToken, ...bookFields }, 'booklist/add')
          dispatch({ type: 'RESET_BOOKS', payload: { books: bookList } })
        }
      } else {
        for (const book of resetStorage) {
          const { date, id, queryDoc, ...bookFields } = book
          await apiBook.post({ accessToken, ...bookFields }, 'booklist/add')
        }
        dispatch({ type: 'RESET_ALL_BOOKS' })
      }
      setBookList([])
    } catch (err) {
      console.error(err)
    } finally {
      dispatch({ type: 'FETCH_COLLECTION_SUCCESS' })
    }
  }
  return (
    <>
      {reset && (
        <List.Reset.Root onClick={handleCLick}>
          <article className={styles.container}>
            <List.Button className="close" onClick={() => handleReset(false)}>
              <List.Icon icon={IoClose} size={30} color="#fff" />
            </List.Button>
            <div className={styles.content}>
              {resetStorage.map((book) => (
                <div className={styles['card']} key={book.id}>
                  <List.Link href={`/Book/${book.id}`}>
                    <List.Img
                      src={`${book.imgUrl}`}
                      alt={`imagem do livro ${book.title}`}
                    />
                  </List.Link>
                  <div className={styles['info-book']}>
                    <List.Data
                      title={book.title}
                      language={book.language}
                      page={book.pageCount}
                      price={book.price}
                    />
                    <List.Input
                      className="reset-checkbox"
                      type="checkbox"
                      onChange={(e) => handleChange(e, book)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <List.Button className="reset-all" onClick={handleSubmit}>
              {bookList.length > 0 ? 'desfazer' : 'desfazer todos'}
            </List.Button>
          </article>
        </List.Reset.Root>
      )}
    </>
  )
}
