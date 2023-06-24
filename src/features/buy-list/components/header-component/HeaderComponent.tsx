import React from 'react'
import styles from './styles.module.css'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'
import { BiUndo } from 'react-icons/bi'
import { HiTrash } from 'react-icons/hi'
import { AddBuyBookModel } from '../../../../server/domain/usecases/book-buy-list/add-book-buy-list'
import { ApiBook } from '../../../../utils/book-api'

const formatLength = (length: number) => {
  if (length >= 100) {
    return '++'
  }
  return length
}

interface IProps {
  handleReset: (state: boolean) => void
}

const apiBook = new ApiBook()

export const HeaderComponent = ({ handleReset }: IProps) => {
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
      dispatch({
        type: 'FETCH_DELETED_BOOKS_SUCCESS',
        payload: { deletedBooks },
      })
    } catch {
      dispatch({ type: 'FETCH_COLLECTION_ERROR' })
    }
  }

  return (
    <article className={styles.container}>
      <h1>Meu Carrinho</h1>

      <div className={styles['actions-exclude']}>
        {deleteBooksStorage.length > 0 && (
          <button
            disabled={collectionLoading}
            onClick={handleDeleteCollectionBooks}
            className={styles['exclude-group-button']}
          >
            <HiTrash size={27} fill="#001f3f" />
            <span>
              <p>{formatLength(deleteBooksStorage.length)}</p>
            </span>
          </button>
        )}
        {resetBooksStorage.length > 0 && (
          <button
            disabled={collectionLoading}
            className={styles.reset}
            onClick={() => handleReset(true)}
          >
            <BiUndo size={30} fill="#001f3f" />
          </button>
        )}
      </div>
    </article>
  )
}
