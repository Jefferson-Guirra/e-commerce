import { IBookIdApi } from '../services/api/@types'
import { Api } from './api'
import { AddBuyBookDatabase } from './protocols/add-buy-book-database'
import { BookModel } from '../server/domain/models/book/book'
import { HttpResponse } from '../server/presentation/protocols/http'
import { ValidateAddBuyBook } from './protocols/validate-add-buy-book-datadase'
import { Dispatch } from 'react'
import { IActions } from '../context/header/@types/Iactions'

const apiBook = new Api()
export class HandleBuyBookDatabase
  implements AddBuyBookDatabase, ValidateAddBuyBook
{
  async addBook(accessToken: string, book: IBookIdApi): Promise<HttpResponse> {
    const { id, ...booksFields } = book
    const addBuyBook: BookModel = {
      accessToken,
      bookId: id,
      imgUrl: `https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h400&source=gbs_api`,
      ...booksFields,
    }
    const response = await apiBook.post(addBuyBook, 'buybooklist/add')
    return response
  }

  async validateAdd(
    accessToken: string,
    bookId: string,
    dispatch: Dispatch<IActions>,
    amount: number
  ): Promise<void> {
    const response = await apiBook.post(
      { accessToken, bookId },
      'buybooklist/get-book'
    )
    console.log(response)
    if (!response.body && response.statusCode === 200) {
      dispatch({ type: 'ADD_AMOUNT_LIST', payload: { amount } })
    }
  }
}
