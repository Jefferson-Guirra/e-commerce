import { BookModel } from '../../../domain/models/book'
import {
  AddBookList,
  AddBookModel,
} from '../../../domain/usecases/add-book-list'
import { LoadAccountByAccessTokenRepository } from '../../protocols/db/account/load-account-by-access-token-repository'

export class DbAddBookList implements AddBookList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async add(book: BookModel): Promise<AddBookModel | undefined> {
    const { accessToken, ...fields } = book
    await this.loadAccount.loadByAccessToken(accessToken)
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
