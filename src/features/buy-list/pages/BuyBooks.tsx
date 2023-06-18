import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { RemoveBook } from '../../../services/db/usecases/remove-book'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../services/db/helpers/firebaseConnection'
import PaypalAction from '../../../components/PaypalAction'
import { useRouter } from 'next/router'
import { useUserContext } from '../../../context/user/UserContext'
import { IBuyBooksProps } from '../@types/IBuyBooksProps'
import { BuyBookCard } from '../components'
import { ApiBook } from '../../../utils/book-api'
import { HttpResponse } from '../../../server/presentation/protocols/http'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

const apiBook = new ApiBook()
export const BuyBooks = ({ books, accessToken }: IBuyBooksProps) => {
  const [bookList, setBookList] = useState(books)
  const [purchase, setPurchase] = useState(false)
  const router = useRouter()
  const { updatedBuyList, clearPurchaseList } = useUserContext()
  const price = bookList.reduce((acc, v) => acc + v.price * v.amount, 0)

  const handleExcludeBuyBookDatabase = async (
    bookId: string
  ): Promise<HttpResponse> => {
    const newBooks = bookList.filter((book) => book.bookId !== bookId)
    const deleteBook = await apiBook.delete(
      { accessToken, bookId },
      'buybooklist/delete'
    )
    setBookList(newBooks)
    return deleteBook
  }

  const handleDefaultAddAmountBuyBookListDatabase = async (bookId: string) => {
    await apiBook.put(
      { accessToken, bookId, amount: 1 },
      'buybooklist/update-amount'
    )
    const updatedBooks = [...bookList]
    const index = updatedBooks.findIndex((book) => book.bookId === bookId)
    updatedBooks[index].amount = updatedBooks[index].amount + 1
    setBookList(updatedBooks)
  }

  const handleDefaultRemoveAmountBuyBookListDatabase = async (
    bookId: string
  ) => {
    await apiBook.put(
      { accessToken, bookId, amount: -1 },
      'buybooklist/update-amount'
    )
    const updatedBooks = [...bookList]
    const index = updatedBooks.findIndex((book) => book.bookId === bookId)
    updatedBooks[index].amount = updatedBooks[index].amount - 1
    setBookList(updatedBooks)
  }

  const clearBuyList = async () => {
    const buyBooksList = books
    for (const buyBook of buyBooksList) {
      await apiBook.delete(
        { accessToken, bookId: buyBook.id },
        'buybooklist/delete'
      )
    }
    setBookList([])
  }

  return (
    <>
      <section className={styles.content}>
        <h1>Meu Carrinho</h1>
        {bookList.map((book) => (
          <BuyBookCard
            handleDefaultRemoveAmountBuyBookListDatabase={
              handleDefaultRemoveAmountBuyBookListDatabase
            }
            handleDefaultAddAmountBuyBookListDatabase={
              handleDefaultAddAmountBuyBookListDatabase
            }
            handleExcludeBuyBookDatabase={handleExcludeBuyBookDatabase}
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
      {bookList.length > 0 && (
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
      {purchase && (
        <PaypalAction
          setValue={setPurchase}
          price={price.toFixed(2)}
          clearBuyList={clearBuyList}
        />
      )}
    </>
  )
}
