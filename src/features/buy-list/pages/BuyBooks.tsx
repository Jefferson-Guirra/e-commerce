import styles from './styles.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { IBuyBooksProps } from '../@types/IBuyBooksProps'
import { BuyBookCard } from '../components'
import { ApiBook } from '../../../utils/book-api'
import { useEffect } from 'react'
import { HeaderComponent } from '../components/header-component/HeaderComponent'
import { useBuyContext } from '../../../context/books-buy-list/BuyBookContext'
import { BuyComponent } from '../components/buy-component/BuyComponent'
import LoadingComponent from '../components/loading-component/LoadingComponent'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

const apiBook = new ApiBook()

export const BuyBooks = ({ books, accessToken }: IBuyBooksProps) => {
  const {
    dispatch,
    books: booksState,
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

  useEffect(() => {
    dispatch({ type: 'INIT_STATE', payload: { books } })
  }, [])

  return (
    <>
      <section className={styles.content}>
        <HeaderComponent accessToken={accessToken} />
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
