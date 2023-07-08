import React from 'react'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'
import { BiUndo } from 'react-icons/bi'
import { HiTrash } from 'react-icons/hi'
import { AddBuyBookModel } from '../../../../server/domain/usecases/book-buy-list/add-book-buy-list'
import { Api } from '../../../../utils/api'
import { useHeaderContext } from '../../../../context/header/HeaderContext'
import { List } from '../../../../components'
import { useListContext } from '../../../../context/books-list/BookList'

const formatLength = (length: number) => {
  if (length >= 100) {
    return '++'
  }
  return length
}

interface Props {
  handleReset: (state: boolean) => void
}

const apiBook = new Api()

export const HeaderComponent = ({ handleReset }: Props) => {
  const { deleteStorage, collectionLoading, resetStorage, dispatch } =
    useListContext()

  const handleDeleteCollectionBooks = async () => {
    try {
      dispatch({ type: 'FETCH_COLLECTION_START' })
      const deletedBooks: AddBuyBookModel[] = []
      for (const props of deleteStorage) {
        const { accessToken, bookId } = props
        const response = await apiBook.delete(
          { accessToken, idBook: bookId },
          'booklist/remove'
        )
        deletedBooks.push(response.body)
      }
      dispatch({ type: 'REMOVE_ALL_BOOKS' })
    } catch {
      dispatch({ type: 'FETCH_COLLECTION_ERROR' })
    } finally {
      dispatch({ type: 'FETCH_COLLECTION_SUCCESS' })
    }
  }

  return (
    <List.Header title="Minha Lista">
      {deleteStorage.length > 0 && (
        <List.Button
          disabled={collectionLoading}
          onClick={handleDeleteCollectionBooks}
          className="remove-all"
        >
          <List.Icon icon={HiTrash} size={27} color="#001f3f" />
          <span>
            <p>{formatLength(deleteStorage.length)}</p>
          </span>
        </List.Button>
      )}
      {resetStorage.length > 0 && (
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
