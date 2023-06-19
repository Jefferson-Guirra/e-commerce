import styles from './styles.module.css'
import { useState } from 'react'
import PaypalAction from '../../../components/PaypalAction'
import { useRouter } from 'next/router'
import { useUserContext } from '../../../context/user/UserContext'
import { IBuyBooksProps } from '../@types/IBuyBooksProps'
import { BuyBookCard } from '../components'
import { ApiBook } from '../../../utils/book-api'
import { HttpResponse } from '../../../server/presentation/protocols/http'
import { BiUndo } from 'react-icons/bi'
import { AddBuyBookModel } from '../../../server/domain/usecases/book-buy-list/add-book-buy-list'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

const apiBook = new ApiBook()
export const BuyBooks = ({ books, accessToken }: IBuyBooksProps) => {
  const [bookList, setBookList] = useState(books)
  const [purchase, setPurchase] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reset, setReset] = useState<AddBuyBookModel | null>(null)
  const router = useRouter()
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
    setReset(deleteBook.body)
    return deleteBook
  }

  const handleUpdateAmountBookBuyList = async (
    bookId: string,
    value: number
  ) => {
    await apiBook.put(
      { accessToken, bookId, amount: value },
      'buybooklist/update-amount'
    )
    const updatedBooks = [...bookList]
    const index = updatedBooks.findIndex((book) => book.bookId === bookId)
    updatedBooks[index].amount = value
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

  const resetBook = async () => {
    setReset(null)
    const newBooks = [...bookList]
    newBooks.push(reset as AddBuyBookModel)
    setBookList(newBooks)
    await apiBook.post({ accessToken, ...reset }, 'buybooklist/add')
  }

  return (
    <>
      <section className={styles.content}>
        <article className={styles.title}>
          <h1>Meu Carrinho</h1>
          <button
            className={
              reset ? `${styles.reset} ${styles.active}` : styles.reset
            }
            onClick={resetBook}
          >
            <BiUndo size={30} />
          </button>
        </article>
        {bookList.map((book) => (
          <BuyBookCard
            loading={loading}
            setLoading={setLoading}
            handleUpdateAmountBookBuyList={handleUpdateAmountBookBuyList}
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
