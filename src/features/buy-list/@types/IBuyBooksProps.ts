import { AddBuyBookModel } from '../../../@types/buy-book/add-buy-book-model'

export interface IBuyBooksProps {
  books: AddBuyBookModel[]
  accessToken: string
}
