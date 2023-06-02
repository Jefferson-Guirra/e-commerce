import { BookModel } from '../../../domain/models/book'
import {
  AddBookList,
  AddBookModel,
} from '../../../domain/usecases/add-book-list'
import { LoadAccountByAccessTokenRepository } from '../../protocols/db/account/load-account-by-access-token-repository'
import { AddBookListRepository } from '../../protocols/db/book-list/add-book-list-repository'
import { GetDate } from '../logout-account/protocols/get-date'

export class DbAddBookList implements AddBookList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository,
    private readonly addBookListRepository: AddBookListRepository,
    private readonly getDate: GetDate
  ) {}
  async add(book: BookModel): Promise<AddBookModel | undefined> {
    const { accessToken, bookId, ...bookFields } = book
    const account = await this.loadAccount.loadByAccessToken(accessToken)
    if (!account) {
      return
    }
    const date = this.getDate.date()
    const { id } = account
    await this.addBookListRepository.addBook({
      id: bookId,
      date,
      userId: id.toString(),
      ...bookFields,
    })

    return {
      title: 'any_title',
      description: 'any_description',
      authors: ['any_author'],
      price: 0.0,
      language: 'any_language',
      publisher: 'any_publisher',
      date: 1254632254,
      publisherDate: 'any_date',
      imgUrl: 'any_url',
      id: 'any_id',
    }
  }
}
