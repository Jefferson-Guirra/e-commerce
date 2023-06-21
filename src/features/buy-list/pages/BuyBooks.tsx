import styles from './styles.module.css'
import { useState } from 'react'
import PaypalAction from '../../../components/PaypalAction'
import { useRouter } from 'next/router'
import { IBuyBooksProps } from '../@types/IBuyBooksProps'
import { BuyBookCard } from '../components'
import { ApiBook } from '../../../utils/book-api'
import { HttpResponse } from '../../../server/presentation/protocols/http'
import { BiUndo } from 'react-icons/bi'
import { AddBuyBookModel } from '../../../server/domain/usecases/book-buy-list/add-book-buy-list'
import { useBuyBooksContext } from '../../../context/books-buy-list/BooksBuyListContext'
import { HiTrash } from 'react-icons/hi'
import { parseCookies } from 'nookies'
//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

const formatLength = (length: number) => {
  if (length >= 100) {
    return '++'
  }
  return length
}
const apiBook = new ApiBook()
export const BuyBooks = ({ books, accessToken }: IBuyBooksProps) => {
  const [bookList, setBookList] = useState(books)
  const [purchase, setPurchase] = useState(false)
  const [reset, setReset] = useState<AddBuyBookModel | null>(null)
  const router = useRouter()
  const price = bookList.reduce((acc, v) => acc + v.price * v.amount, 0)
  const { excludeAllBookBuyGroupId, groupBookId, handleRemoveGroupBookId } =
    useBuyBooksContext()

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
    handleRemoveGroupBookId({ accessToken, bookId })
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

  const handleExcludeByGroupId = async () => {
    const newBooks = bookList.filter(
      (book) => !groupBookId.find((props) => props.bookId === book.bookId)
    )
    setBookList(newBooks)
    await excludeAllBookBuyGroupId()
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

          <div className={styles['actions-exclude']}>
            {groupBookId.length > 0 && (
              <button
                onClick={handleExcludeByGroupId}
                className={styles['exclude-group-button']}
              >
                <HiTrash size={27} />
                <span>
                  <p>{formatLength(groupBookId.length)}</p>
                </span>
              </button>
            )}
            {reset && (
              <button className={styles.reset} onClick={resetBook}>
                <BiUndo size={30} />
              </button>
            )}
          </div>
        </article>
        {bookList.map((book) => (
          <BuyBookCard
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
