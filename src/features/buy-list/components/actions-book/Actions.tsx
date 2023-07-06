import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { MdAdd, MdRemove } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { IDataProps } from './@types/IDataBookProps'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'
import { Api } from '../../../../utils/api'
import { parseCookies } from 'nookies'
import { useHeaderContext } from '../../../../context/header/HeaderContext'
import { List } from '../../../../components'

const apiBook = new Api()

export const Actions = ({ bookId, amount }: IDataProps) => {
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
        dispatch({ type: 'FETCH_SUCCESS' })
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
      dispatch({ type: 'FETCH_SUCCESS' })
    }
  }

  useEffect(() => {
    setAmountBook(amount)
  }, [amount])
  return (
    <>
      <article className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <List.Button
            disabled={loading}
            className="update"
            onClick={() => handleUpdateAmountBook(bookId, amountBook - 1)}
          >
            <List.Icon icon={MdRemove} size={20} color="#363636" />
          </List.Button>

          <List.Input
            type="number"
            className="number"
            min="1"
            value={amountBook}
            onChange={({ target }) => setAmountBook(Number(target.value))}
            onBlur={() => handleUpdateAmountBook(bookId, amountBook)}
          />

          <List.Button
            type="submit"
            className="update"
            disabled={loading}
            onClick={() => handleUpdateAmountBook(bookId, amountBook + 1)}
          >
            <List.Icon icon={MdAdd} size={20} color="#363636" />
          </List.Button>
        </form>
        <List.Button
          disabled={loading}
          onClick={() => handleExcludeBuyBook(bookId)}
          className="delete"
        >
          <List.Icon icon={IoClose} size={20} color="#363636" />
        </List.Button>
      </article>
    </>
  )
}
