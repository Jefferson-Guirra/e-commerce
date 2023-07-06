import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { MdAdd, MdRemove } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { IDataProps } from './@types/IDataBookProps'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'
import { Api } from '../../../../utils/api'
import { parseCookies } from 'nookies'
import { useHeaderContext } from '../../../../context/header/HeaderContext'

const apiBook = new Api()

export const DataBook = ({
  title,
  bookId,
  amount,
  price,
  language,
  publisherDate,
  pageCount,
}: IDataProps) => {
  const [amountBook, setAmountBook] = useState(amount)
  const { loading, dispatch } = useBuyContext()
  const { dispatch: dispatchHeader } = useHeaderContext()

  const handleUpdateAmountBook = async (bookId: string, value: number) => {
    const accessToken = JSON.parse(parseCookies().literando_accessToken)
    const validate = value > 0 && value !== amount
    if (validate) {
      try {
        dispatch({ type: 'FETCH_START' })
        const book = await apiBook.put(
          { accessToken, bookId, amount: value },
          'buybooklist/update-amount'
        )
        dispatch({
          type: 'FETCH_UPDATE_SUCCESS',
          payload: { updateBook: book.body },
        })
      } finally {
        dispatch({ type: 'FETCH_ERROR' })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleUpdateAmountBook(bookId, amountBook)
  }

  const handleExcludeBuyBook = async (bookId: string) => {
    const { literando_accessToken: accessToken } = parseCookies()
    try {
      dispatch({ type: 'FETCH_START' })
      const response = await apiBook.delete(
        { accessToken: JSON.parse(accessToken), bookId },
        'buybooklist/delete'
      )
      dispatchHeader({
        type: 'REMOVE_AMOUNT_LIST',
        payload: { removeAmount: 1 },
      })
      dispatch({
        type: 'FETCH_REMOVE_SUCCESS',
        payload: { deleteBook: response.body },
      })
    } finally {
      dispatch({ type: 'FETCH_ERROR' })
    }
  }

  useEffect(() => {
    setAmountBook(amount)
  }, [amount])
  return (
    <div className={styles.dataBook}>
      <div className={styles.header}>
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
          <button
            disabled={loading}
            className={styles.btnExclude}
            onClick={() => handleExcludeBuyBook(bookId)}
          >
            <IoClose size={20} color="#363636" />
          </button>
        </div>
      </div>
    </div>
  )
}
