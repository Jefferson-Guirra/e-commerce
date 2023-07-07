import { AddBuyBookModel } from '../../../server/domain/usecases/book-buy-list/add-book-buy-list'

export interface ListState {
  booksList: AddBuyBookModel[]
  deleteStorage: { bookId: string; accessToken: string }[]
  resetStorage: AddBuyBookModel[]
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
