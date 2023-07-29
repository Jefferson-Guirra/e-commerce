import { AddBookModel } from '../../../@types/book/add-book-model'

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
