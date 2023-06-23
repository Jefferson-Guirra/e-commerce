import { AddBuyBookModel } from '../../../server/domain/usecases/book-buy-list/add-book-buy-list'

export interface BuyBooksState {
  books: AddBuyBookModel[]
  deleteBooksStorage: { accessToken: string; bookId: string }[]
  resetBooksStorage: AddBuyBookModel[]
  loading: boolean
  price: number
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
  price: 0.0,
  priceStorage: [],
}
