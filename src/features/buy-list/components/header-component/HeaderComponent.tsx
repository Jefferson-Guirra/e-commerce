import React from 'react'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'
import { BiUndo } from 'react-icons/bi'
import { HiTrash } from 'react-icons/hi'
import { AddBuyBookModel } from '../../../../server/domain/usecases/book-buy-list/add-book-buy-list'
import { Api } from '../../../../utils/api'
import { useHeaderContext } from '../../../../context/header/HeaderContext'
import { List } from '../../../../components'

const formatLength = (length: number) => {
  if (length >= 100) {
    return '++'
  }
  return length
}

interface IProps {
  handleReset: (state: boolean) => void
}

const apiBook = new Api()

export const HeaderComponent = ({ handleReset }: IProps) => {
  const { dispatch: dispatchHeader } = useHeaderContext()
  const { deleteBooksStorage, collectionLoading, resetBooksStorage, dispatch } =
    useBuyContext()

  const handleDeleteCollectionBooks = async () => {
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
      dispatchHeader({
        type: 'REMOVE_AMOUNT_LIST',
        payload: { removeAmount: deleteBooksStorage.length },
      })
      dispatch({
        type: 'FETCH_DELETED_BOOKS_SUCCESS',
        payload: { deletedBooks },
      })
    } catch {
      dispatch({ type: 'FETCH_COLLECTION_ERROR' })
    }
  }

  return (
    <List.Header title="Meu carrinho">
      {deleteBooksStorage.length > 0 && (
        <List.Button
          disabled={collectionLoading}
          onClick={handleDeleteCollectionBooks}
          className="remove-all"
        >
          <List.Icon icon={HiTrash} size={27} color="#001f3f" />
          <span>
            <p>{formatLength(deleteBooksStorage.length)}</p>
          </span>
        </List.Button>
      )}
      {resetBooksStorage.length > 0 && (
        <List.Button
          disabled={collectionLoading}
          className={'reset'}
          onClick={() => handleReset(true)}
        >
          <List.Icon icon={BiUndo} size={30} color="#001f3f" />
        </List.Button>
      )}
    </List.Header>
  )
}
