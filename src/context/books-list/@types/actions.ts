import { AddBuyBookModel } from '../../../server/domain/usecases/book-buy-list/add-book-buy-list'

export type Actions =
  | { type: 'INIT'; payload: { books: AddBuyBookModel[] } }
  | {
      type: 'ADD_SELECTED_BOOK'
      payload: { bookId: string; accessToken: string }
    }
  | {
      type: 'REMOVE_SELECTED_BOOK'
      payload: { bookId: string }
    }
  | { type: 'REMOVE_BOOK'; payload: { book: AddBuyBookModel } }
  | { type: 'REMOVE_ALL_BOOKS' }
  | { type: 'RESET_BOOKS'; payload: { books: AddBuyBookModel[] } }
  | { type: 'RESET_ALL_BOOKS' }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'FETCH_ERROR' }
  | { type: 'FETCH_COLLECTION_START' }
  | { type: 'FETCH_COLLECTION_SUCCESS' }
  | { type: 'FETCH_COLLECTION_ERROR' }
