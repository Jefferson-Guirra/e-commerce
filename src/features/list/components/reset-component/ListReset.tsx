import { useCallback } from 'react'
import { Api } from '../../../../utils/api'
import { List } from '../../../../components'
import { useListContext } from '../../../../context/books-list/BookList'
import { parseCookies } from 'nookies'
import { AddBookModel } from '../../../../@types/book/add-book-model'
import { ResetProps } from '../../../../components/list/reset/ListReset'

interface IProps {
  handleReset: (state: boolean) => void
}

const apiBook = new Api()
export const ResetComponent = ({ handleReset }: IProps) => {
  const { resetStorage, dispatch } = useListContext()

  const handleCLick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { target, currentTarget } = e
    if (target === currentTarget) {
      handleReset(false)
    }
  }

  const resetBooksCollection = async (collection: AddBookModel[]) => {
    const accessToken = JSON.parse(parseCookies().literando_accessToken)
    try {
      dispatch({ type: 'FETCH_COLLECTION_START' })
      for (const book of collection) {
        const { date, id, queryDoc, ...bookFields } = book
        await apiBook.send('add-book', 'POST', { accessToken, ...bookFields })
      }
      dispatch({ type: 'RESET_BOOKS', payload: { books: collection } })
    } catch {
      dispatch({ type: 'FETCH_COLLECTION_ERROR' })
    } finally {
      dispatch({ type: 'FETCH_COLLECTION_SUCCESS' })
    }
  }

  const resetDatabase: ResetProps['resetDatabase'] = useCallback(
    async (books) => {
      handleReset(false)
      try {
        if (!!books.length) {
          await resetBooksCollection(books as AddBookModel[])
        } else {
          await resetBooksCollection(resetStorage)
        }
      } catch (err) {
        console.error(err)
      }
    },
    []
  )
  return (
    <List.Reset.Root onClick={handleCLick}>
      <List.Reset.Component
        handleReset={handleReset}
        resetDatabase={resetDatabase}
        books={resetStorage}
      />
    </List.Reset.Root>
  )
}
