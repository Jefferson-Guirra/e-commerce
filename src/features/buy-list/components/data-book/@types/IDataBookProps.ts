import { HttpResponse } from '../../../../../server/presentation/protocols/http'
export interface IDataProps {
  title: string
  bookId: string
  amount: number
  price: number
  pageCount: number
  publisherDate: string
  language: string
}
