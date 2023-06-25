import { useState } from 'react'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'
import styles from './styles.module.css'
import Image from 'next/image'
import { handleTime } from '../../../../utils/handle-time'
import { IoClose } from 'react-icons/io5'
import { AddBuyBookModel } from '../../../../server/domain/usecases/book-buy-list/add-book-buy-list'
import { Api } from '../../../../utils/api'
interface IProps {
  reset: boolean
  accessToken: string
  handleReset: (state: boolean) => void
}

const apiBook = new Api()
export const ResetComponent = ({ reset, handleReset, accessToken }: IProps) => {
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
    if (bookList.length > 0) {
      resetBooksCollection(bookList)
    } else {
      resetBooksCollection(resetBooksStorage)
    }
    setBookList([])
  }
  return (
    <>
      {reset && (
        <section onClick={handleCLick} className={styles.container}>
          <article className={styles.content}>
            <button className={styles['btn-close']}>
              <IoClose size={30} color="#fff" />
            </button>
            <ul className={styles['list-container']}>
              {resetBooksStorage.map((book) => (
                <li key={book.bookId}>
                  <Image
                    width={100}
                    style={{ maxWidth: '100px' }}
                    height={100}
                    src={book.imgUrl}
                    alt={`imagem do livro ${book.title}`}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
                  />
                  <article className={styles.info}>
                    <div className={styles['data-book']}>
                      <h3>{book.title}</h3>
                      <p>páginas: {book.pageCount}</p>
                      <p>idioma: {book.language}</p>
                      <p>adicionado: {handleTime(book.date)}</p>
                    </div>
                    <input
                      type="checkbox"
                      onChange={(e) => handleChange(e, book)}
                    />
                  </article>
                </li>
              ))}
            </ul>
            <div className={styles.submit}>
              <button onClick={handleSubmit} className={styles['btn-submit']}>
                {bookList.length > 0 ? 'desfazer' : 'desfazer todos'}
              </button>
            </div>
          </article>
        </section>
      )}
    </>
  )
}
