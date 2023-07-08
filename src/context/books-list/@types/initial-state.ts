import { AddBookModel } from '../../../server/domain/usecases/book-list/add-book-list'

export interface ListState {
  booksList: AddBookModel[]
  deleteStorage: { bookId: string; accessToken: string }[]
  resetStorage: AddBookModel[]
  loading: boolean
  collectionLoading: boolean
}

export const initialState: ListState = {
  booksList: [],
  deleteStorage: [],
  resetStorage: [],
  loading: false,
  collectionLoading: false,
}
