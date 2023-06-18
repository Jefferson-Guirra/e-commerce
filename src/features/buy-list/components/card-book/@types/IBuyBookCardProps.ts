import { HttpResponse } from '../../../../../server/presentation/protocols/http'

export interface IBuyBookCardProps {
  publisher: string
  id: string
  title: string
  imgUrl: string
  amount: number
  price: number
  bookId: string
  pageCount: number
  publisherDate: string
  shipping: number
  language: string
  handleExcludeBuyBookDatabase: (bookId: string) => Promise<HttpResponse>
  handleDefaultAddAmountBuyBookListDatabase: (bookId: string) => Promise<void>
  handleDefaultRemoveAmountBuyBookListDatabase: (
    bookId: string
  ) => Promise<void>
}
