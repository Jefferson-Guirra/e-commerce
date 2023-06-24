import { AddBuyBookModel } from '../../../server/domain/usecases/book-buy-list/add-book-buy-list'
export type Actions =
  | {
      type: 'INIT_STATE'
      payload: {
        books: AddBuyBookModel[]
      }
    }
  | {
      type: 'ADD_SELECT_BOOK'
      payload: {
        amount: number
        price: number
        accessToken: string
        bookId: string
      }
    }
  | {
      type: 'REMOVE_SELECT_BOOK'
      payload: {
        bookId: string
      }
    }
  | {
      type: 'RESET_BOOKS'
    }
  | {
      type: 'FETCH_START'
    }
  | {
      type: 'FETCH_SUCCESS'
    }
  | {
      type: 'FETCH_ERROR'
    }
  | {
      type: 'FETCH_REMOVE_SUCCESS'
      payload: {
        deleteBook: AddBuyBookModel
      }
    }
  | {
      type: 'FETCH_UPDATE_SUCCESS'
      payload: {
        updateBook: AddBuyBookModel
      }
    }
  | {
      type: 'FETCH_DELETED_BOOKS_SUCCESS'
      payload: {
        deletedBooks: AddBuyBookModel[]
      }
    }
  | {
      type: 'FETCH_CLEAR_STATE'
    }
  | {
      type: 'FETCH_COLLECTION_START'
    }
  | {
      type: 'FETCH_COLLECTION_SUCCESS'
    }
  | {
      type: 'FETCH_COLLECTION_ERROR'
    }
  | {
      type: 'RESET_COLLECTION_BOOKS'
      payload: { collection: AddBuyBookModel[] }
    }
