import { IBookIdApi } from '../services/api/@types'
import { BookModel } from '../server/domain/models/book/book'
import { Api } from './api'
import { AddBookDatabase } from './protocols/add-book-databse'
import { ExcludeBookDatabase } from './protocols/exlcude-book-database'

const apiBook = new Api()

export class HandleBookDatabase
  implements AddBookDatabase, ExcludeBookDatabase
{
  async addBook(accessToken: string, book: IBookIdApi): Promise<void> {
    if (!accessToken) {
      alert('É necessário efetuar o Login')
    } else {
      const { id, ...booksFields } = book
      const addBook: BookModel = {
        accessToken,
        bookId: id,
        imgUrl: `https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h400&source=gbs_api`,
        ...booksFields,
      }
      await apiBook.post(addBook, 'booklist/add')
    }
  }

  async removeBook(accessToken: string, idBook: string): Promise<void> {
    await apiBook.delete({ accessToken, idBook }, 'booklist/remove')
  }
}
