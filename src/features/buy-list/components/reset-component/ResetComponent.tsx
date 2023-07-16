import { useCallback } from 'react'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'
import { AddBuyBookModel } from '../../../../server/domain/usecases/book-buy-list/add-book-buy-list'
import { Api } from '../../../../utils/api'
import { useHeaderContext } from '../../../../context/header/HeaderContext'
import { List } from '../../../../components'
import { parseCookies } from 'nookies'
import { ResetProps } from '../../../../components/list/reset/ListReset'
import { AddBookModel } from '../../../../server/domain/usecases/book-list/add-book-list'
interface Props {
  handleReset: (state: boolean) => void
}

const apiBook = new Api()
export const ResetComponent = ({ handleReset }: Props) => {
  const { dispatch: dispatchHeader } = useHeaderContext()
  const { resetBooksStorage, dispatch } = useBuyContext()

  const handleCLick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { target, currentTarget } = e
    if (target === currentTarget) {
      handleReset(false)
    }
  }, [])

  const resetBooksCollection = async (collection: AddBuyBookModel[]) => {
    const accessToken = JSON.parse(parseCookies().literando_accessToken)
    try {
      dispatch({ type: 'FETCH_COLLECTION_START' })
      for (const book of collection) {
        const { date, id, queryDoc, ...bookFields } = book
        await apiBook.post({ accessToken, ...bookFields }, 'buybooklist/add')
      }
      dispatch({ type: 'RESET_COLLECTION_BOOKS', payload: { collection } })
      dispatchHeader({
        type: 'ADD_AMOUNT_LIST',
        payload: { amount: collection.length },
      })
    } catch (err) {
      console.error(err)
      dispatch({ type: 'FETCH_COLLECTION_ERROR' })
    }
  }

  const resetDatabase: ResetProps['resetDatabase'] = useCallback(
    async (books) => {
      handleReset(false)
      if (!!books.length) {
        await resetBooksCollection(books as AddBuyBookModel[])
      } else {
        await resetBooksCollection(resetBooksStorage)
      }
    },
    []
  )

  return (
    <List.Reset.Root onClick={handleCLick}>
      <List.Reset.Component
        handleReset={handleReset}
        books={resetBooksStorage}
        resetDatabase={resetDatabase}
      />
    </List.Reset.Root>
  )
}
