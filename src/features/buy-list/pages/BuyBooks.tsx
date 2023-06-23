import styles from './styles.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { IBuyBooksProps } from '../@types/IBuyBooksProps'
import { BuyBookCard } from '../components'
import { ApiBook } from '../../../utils/book-api'
import { BiUndo } from 'react-icons/bi'
import { AddBuyBookModel } from '../../../server/domain/usecases/book-buy-list/add-book-buy-list'
import { HiTrash } from 'react-icons/hi'
import { useEffect } from 'react'

import { useBuyContext } from '../../../context/books-buy-list/BuyBookContext'
import { BuyComponent } from '../components/buy-component/BuyComponent'
import LoadingComponent from '../components/loading-component/LoadingComponent'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

const formatLength = (length: number) => {
  if (length >= 100) {
    return '++'
  }
  return length
}

const apiBook = new ApiBook()

export const BuyBooks = ({ books, accessToken }: IBuyBooksProps) => {
  const {
    dispatch,
    books: booksState,
    deleteBooksStorage,
    resetBooksStorage,
    collectionLoading,
    price,
  } = useBuyContext()
  const [purchase, setPurchase] = useState(false)
  const router = useRouter()

  const clearBuyList = async () => {
    for (const buyBook of booksState) {
      await apiBook.delete(
        { accessToken, bookId: buyBook.id },
        'buybooklist/delete'
      )
    }
  }

  const handleExcludeByGroupId = async () => {
    try {
      dispatch({ type: 'FETCH_COLLECTION_START' })
      const deletedBooks: AddBuyBookModel[] = []
      for (const props of deleteBooksStorage) {
        const { accessToken, bookId } = props
        const response = await apiBook.delete(
          { accessToken, bookId },
          'buybooklist/delete'
        )
        deletedBooks.push(response.body)
      }
      dispatch({
        type: 'FETCH_DELETED_BOOKS_SUCCESS',
        payload: { deletedBooks },
      })
    } catch {
      dispatch({ type: 'FETCH_COLLECTION_ERROR' })
    }
  }
  const resetBook = async () => {
    try {
      dispatch({ type: 'FETCH_COLLECTION_START' })
      for (const book of resetBooksStorage) {
        const { date, id, queryDoc, ...bookFields } = book
        await apiBook.post({ accessToken, ...bookFields }, 'buybooklist/add')
      }
      dispatch({ type: 'RESET_BOOKS' })
    } catch {
      dispatch({ type: 'FETCH_COLLECTION_ERROR' })
    }
  }
  useEffect(() => {
    dispatch({ type: 'INIT_STATE', payload: { books } })
  }, [])

  return (
    <>
      <section className={styles.content}>
        <article className={styles.title}>
          <h1>Meu Carrinho</h1>

          <div className={styles['actions-exclude']}>
            {deleteBooksStorage.length > 0 && (
              <button
                disabled={collectionLoading}
                onClick={handleExcludeByGroupId}
                className={styles['exclude-group-button']}
              >
                <HiTrash size={27} />
                <span>
                  <p>{formatLength(deleteBooksStorage.length)}</p>
                </span>
              </button>
            )}
            {resetBooksStorage.length > 0 && (
              <button
                disabled={collectionLoading}
                className={styles.reset}
                onClick={resetBook}
              >
                <BiUndo size={30} />
              </button>
            )}
          </div>
        </article>
        {booksState.map((book) => (
          <BuyBookCard
            id={book.id}
            bookId={book.bookId}
            language={book.language}
            pageCount={book.pageCount}
            price={book.price}
            publisher={book.publisher}
            publisherDate={book.publisherDate}
            amount={book.amount}
            imgUrl={book.imgUrl}
            shipping={3}
            title={book.title}
            key={book.id}
          />
        ))}
      </section>
      <article className={styles.price}>
        <p>
          Total do carrinho: R${price.toFixed(2).toString().replace('.', ',')}
        </p>
      </article>
      {booksState.length > 0 && (
        <article className={styles.checkout}>
          <button className={styles.addButton} onClick={() => router.push('/')}>
            ESCOLHER MAIS LIVROS
          </button>
          <button
            className={styles.buyButton}
            onClick={() => setPurchase(true)}
          >
            FINALIZAR PEDIDO
          </button>
        </article>
      )}
      <BuyComponent
        purchase={purchase}
        setValue={setPurchase}
        price={price.toFixed(2)}
        clearBuyList={clearBuyList}
      />
      <LoadingComponent loading={collectionLoading} />
    </>
  )
}
