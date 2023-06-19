import { HttpResponse } from '../../../../../server/presentation/protocols/http'
import { Dispatch, SetStateAction } from 'react'
export interface IDataProps {
  title: string
  bookId: string
  amount: number
  price: number
  pageCount: number
  publisherDate: string
  language: string
  handleExcludeBuyBookDatabase: (bookId: string) => Promise<HttpResponse>
  handleUpdateAmountBookBuyList: (
    bookId: string,
    value: number
  ) => Promise<void>
  setLoading: Dispatch<SetStateAction<boolean>>
  loading: boolean
}
