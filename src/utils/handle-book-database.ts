import { IBookIdApi } from '../services/api/@types'
import { BookModel } from '../server/domain/models/book/book'
import { Api } from './api'
import { AddBookDatabase } from './protocols/add-book-databse'
import { ExcludeBookDatabase } from './protocols/exlcude-book-database'
import { HttpResponse } from '../server/presentation/protocols/http'

const apiBook = new Api()

export class HandleBookDatabase
  implements AddBookDatabase, ExcludeBookDatabase
{
  async addBook(accessToken: string, book: IBookIdApi): Promise<HttpResponse> {
    const { id, ...booksFields } = book
    const addBook: BookModel = {
      accessToken,
      bookId: id,
      imgUrl: `https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h400&source=gbs_api`,
      ...booksFields,
    }
    return await apiBook.post(addBook, 'booklist/add')
  }

  async removeBook(accessToken: string, idBook: string): Promise<HttpResponse> {
    return await apiBook.delete({ accessToken, idBook }, 'booklist/remove')
  }
}
