import { AddBookModel } from '../../../../domain/usecases/book-list/add-book-list'
import { GetBooksList } from '../../../../domain/usecases/book-list/get-books-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'

export class DbGetBooksList implements GetBooksList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async getBooks(accessToken: string): Promise<AddBookModel[] | null> {
    await this.loadAccount.loadByAccessToken(accessToken)
    return null
  }
}
