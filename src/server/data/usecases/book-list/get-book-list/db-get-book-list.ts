import { AddBookModel } from '../../../../domain/usecases/book-list/add-book-list'
import { GetBookList } from '../../../../domain/usecases/book-list/get-book-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'

export class DbGetBookList implements GetBookList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async getBook(
    accessToken: string,
    bookId: string
  ): Promise<AddBookModel | null> {
    const account = await this.loadAccount.loadByAccessToken(accessToken)
    if (!account) {
      return null
    }
    return {
      bookId: 'any_book_id',
      title: 'any_title',
      description: 'any_description',
      authors: ['any_author'],
      price: 0.0,
      language: 'any_language',
      publisher: 'any_publisher',
      publisherDate: 'any_date',
      date: 123456,
      imgUrl: 'any_url',
      queryDoc: 'any_user_idany_id',
      userId: 'any_user_id',
      id: 'any_id',
    }
  }
}
