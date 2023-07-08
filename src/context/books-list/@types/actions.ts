import { AddBookModel } from '../../../server/domain/usecases/book-list/add-book-list'

export type Actions =
  | { type: 'INIT'; payload: { books: AddBookModel[] } }
  | {
      type: 'ADD_SELECTED_BOOK'
      payload: { bookId: string; accessToken: string }
    }
  | {
      type: 'REMOVE_SELECTED_BOOK'
      payload: { bookId: string }
    }
  | { type: 'REMOVE_BOOK'; payload: { bookId: string } }
  | { type: 'REMOVE_ALL_BOOKS' }
  | { type: 'RESET_BOOKS'; payload: { books: AddBookModel[] } }
  | { type: 'RESET_ALL_BOOKS' }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'FETCH_ERROR' }
  | { type: 'FETCH_COLLECTION_START' }
  | { type: 'FETCH_COLLECTION_SUCCESS' }
  | { type: 'FETCH_COLLECTION_ERROR' }
