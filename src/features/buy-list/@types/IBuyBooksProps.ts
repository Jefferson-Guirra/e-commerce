import { AddBuyBookModel } from '../../../server/domain/usecases/book-buy-list/add-book-buy-list'

export interface IBuyBooksProps {
  books: AddBuyBookModel[]
  accessToken: string
}
