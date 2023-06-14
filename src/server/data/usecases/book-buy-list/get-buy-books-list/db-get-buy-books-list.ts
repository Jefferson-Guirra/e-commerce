import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { GetBuyBooks } from '../../../../domain/usecases/book-buy-list/get-books-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'
import { GetBuyBooksRepository } from '../../../protocols/db/book-buy-list/get-books-buy-list-repository'

export class DbGetBuyBooks implements GetBuyBooks {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async getBuyBooks(accessToken: string): Promise<AddBuyBookModel[] | null> {
    const account = await this.loadAccount.loadByAccessToken(accessToken)
    if (!account) {
      return null
    }
    return []
  }
}
