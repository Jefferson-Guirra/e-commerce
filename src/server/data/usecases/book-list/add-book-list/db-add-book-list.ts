import { BookModel } from '../../../../domain/models/book-list/book'
import {
  AddBookList,
  AddBookModel,
} from '../../../../domain/usecases/add-book-list'
import { ServerError } from '../../../../presentation/errors/server-error'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'
import { AddBookListRepository } from '../../../protocols/db/book-list/add-book-list-repository'
import { LoadBookByQueryDocRepository } from '../../../protocols/db/book-list/load-book-list-by-query-doc'
import { CreateQueryDoc } from './protocols/create-query-doc'
import { GetDate } from './protocols/get-date'

export class DbAddBookList implements AddBookList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository,
    private readonly addBookListRepository: AddBookListRepository,
    private readonly getDate: GetDate,
    private createQueryDoc: CreateQueryDoc,
    private readonly loadBook: LoadBookByQueryDocRepository
  ) {}
  async add(book: BookModel): Promise<AddBookModel | undefined> {
    const { accessToken, bookId, ...bookFields } = book
    const account = await this.loadAccount.loadByAccessToken(accessToken)
    if (!account) {
      return
    }

    const { id } = account
    const queryDoc = this.createQueryDoc.create(id.toString(), bookId)
    const bookIsValid = await this.loadBook.loadBookByQuery(queryDoc)
    if (bookIsValid) {
      return bookIsValid
    }

    const addBook = await this.addBookListRepository.addBook({
      id: bookId,
      date: this.getDate.date,
      userId: id.toString(),
      ...bookFields,
    })

    if (!addBook) {
      return Promise.reject(new ServerError())
    }

    return addBook
  }
}
