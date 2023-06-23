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
}
