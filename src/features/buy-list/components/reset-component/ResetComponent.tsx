import { useState } from 'react'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5'
import { AddBuyBookModel } from '../../../../server/domain/usecases/book-buy-list/add-book-buy-list'
import { Api } from '../../../../utils/api'
import { useHeaderContext } from '../../../../context/header/HeaderContext'
import { List } from '../../../../components'
import { parseCookies } from 'nookies'
interface Props {
  reset: boolean
  handleReset: (state: boolean) => void
}

const apiBook = new Api()
export const ResetComponent = ({ reset, handleReset }: Props) => {
  const { dispatch: dispatchHeader } = useHeaderContext()
  const { resetBooksStorage, dispatch } = useBuyContext()
  const [bookList, setBookList] = useState<AddBuyBookModel[]>([])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    book: AddBuyBookModel
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
  const resetBooksCollection = async (collection: AddBuyBookModel[]) => {
    const accessToken = JSON.parse(parseCookies().literando_accessToken)
    try {
      dispatch({ type: 'FETCH_COLLECTION_START' })
      for (const book of collection) {
        const { date, id, queryDoc, ...bookFields } = book
        await apiBook.post({ accessToken, ...bookFields }, 'buybooklist/add')
      }
      dispatch({ type: 'RESET_COLLECTION_BOOKS', payload: { collection } })
    } catch {
      dispatch({ type: 'FETCH_COLLECTION_ERROR' })
    }
  }
  const handleSubmit = () => {
    handleReset(false)
    if (!!bookList.length) {
      resetBooksCollection(bookList)
      dispatchHeader({
        type: 'ADD_AMOUNT_LIST',
        payload: { amount: bookList.length },
      })
    } else {
      resetBooksCollection(resetBooksStorage)
      dispatchHeader({
        type: 'ADD_AMOUNT_LIST',
        payload: { amount: resetBooksStorage.length },
      })
    }
    setBookList([])
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
              {resetBooksStorage.map((book) => (
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
              {!!bookList.length ? 'desfazer' : 'desfazer todos'}
            </List.Button>
          </article>
        </List.Reset.Root>
      )}
    </>
  )
}
