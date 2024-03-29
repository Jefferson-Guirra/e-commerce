import { AddBuyBookModel } from '../../../@types/buy-book/add-buy-book-model'

export interface BuyBooksState {
  books: AddBuyBookModel[]
  deleteBooksStorage: { accessToken: string; bookId: string }[]
  resetBooksStorage: AddBuyBookModel[]
  loading: boolean
  price: number
  collectionLoading: boolean
  priceStorage: {
    price: number
    id: string
    amount: number
  }[]
}

export const initialState: BuyBooksState = {
  books: [],
  deleteBooksStorage: [],
  resetBooksStorage: [],
  loading: false,
  collectionLoading: false,
  price: 0.0,
  priceStorage: [],
}
