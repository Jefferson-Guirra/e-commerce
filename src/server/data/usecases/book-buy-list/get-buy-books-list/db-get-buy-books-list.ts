import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { GetBuyBooks } from '../../../../domain/usecases/book-buy-list/get-books-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'

export class DbGetBuyBooks implements GetBuyBooks {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async getBuyBooks(accessToken: string): Promise<AddBuyBookModel[] | null> {
    await this.loadAccount.loadByAccessToken(accessToken)
    return null
  }
}
