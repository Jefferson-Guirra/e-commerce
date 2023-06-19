import { HttpResponse } from '../../../../../server/presentation/protocols/http'
import { Dispatch, SetStateAction } from 'react'
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
  handleUpdateAmountBookBuyList: (
    bookId: string,
    value: number
  ) => Promise<void>
  handleExcludeBuyBookDatabase: (bookId: string) => Promise<HttpResponse>
  setLoading: Dispatch<SetStateAction<boolean>>
  loading: boolean
}
