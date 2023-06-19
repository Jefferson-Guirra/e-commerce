import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { MdAdd, MdRemove } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { HttpResponse } from '../../../../server/presentation/protocols/http'
import { IDataProps } from './@types/IDataBookProps'

export const DataBook = ({
  title,
  bookId,
  amount,
  price,
  language,
  publisherDate,
  pageCount,
  handleUpdateAmountBookBuyList,
  handleExcludeBuyBookDatabase,
}: IDataProps) => {
  const [loading, setLoading] = useState(false)
  const [amountBook, setAmountBook] = useState(amount)

  const handleUpdateAmountBook = async (bookId: string, value: number) => {
    const validate = value > 0 && value !== amount
    if (validate) {
      try {
        setLoading(true)
        await handleUpdateAmountBookBuyList(bookId, value)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleUpdateAmountBook(bookId, amountBook)
  }

  const handleExcludeBuyBook = async (bookId: string) => {
    try {
      setLoading(true)
      const deleteBook = await handleExcludeBuyBookDatabase(bookId)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setAmountBook(amount)
  }, [amount])

  return (
    <div className={styles.dataBook}>
      <div className={styles.header}>
        <div className={styles.bookTitle}>
          <p>{title}</p>
        </div>
        <div className={styles.actions}>
          <form
            onSubmit={(e) => handleSubmit(e)}
            onBlur={() => handleUpdateAmountBook(bookId, amountBook)}
            className={styles['amount-form']}
          >
            <button disabled={loading}>
              <MdRemove
                onClick={() =>
                  handleUpdateAmountBook(bookId, (amountBook - 1) as number)
                }
                size={20}
                color="#363636"
              />
            </button>
            <input
              type="number"
              min="1"
              value={amountBook}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                setAmountBook(Number(target.value))
              }
            />
            <button disabled={loading}>
              <MdAdd
                onClick={() =>
                  handleUpdateAmountBook(bookId, (amountBook + 1) as number)
                }
                size={20}
                color="#363636"
              />
            </button>
          </form>
          <p>R$: {(price * amount).toFixed(2).toString().replace('.', ',')}</p>
          <button
            disabled={loading}
            className={styles.btnExclude}
            onClick={() => handleExcludeBuyBook(bookId)}
          >
            <IoClose size={20} color="#363636" />
          </button>
        </div>
      </div>
      <div className={styles.textInfo}>
        <p>Ano: </p>
        <span>{publisherDate.replace(/\-\d+/g, '')}</span>
      </div>
      <div className={styles.textInfo}>
        <p className={styles.textInfo}>Páginas: </p>
        <span>{pageCount}</span>
      </div>
      <div className={styles.textInfo}>
        <p>Idioma: </p>
        <span>{language}</span>
      </div>
    </div>
  )
}
