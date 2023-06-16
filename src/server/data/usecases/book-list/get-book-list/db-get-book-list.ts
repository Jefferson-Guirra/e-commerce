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
    await this.loadAccount.loadByAccessToken(accessToken)
    return null
  }
}
