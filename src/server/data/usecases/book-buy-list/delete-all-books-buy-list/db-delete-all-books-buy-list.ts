import { DeleteAllBuyBookList } from '../../../../domain/usecases/book-buy-list/delete-all-book-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'

export class DbDeleteAllBooksBuyList implements DeleteAllBuyBookList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}

  async deleteAllBooks(accessToken: string): Promise<void | null> {
    await this.loadAccount.loadByAccessToken(accessToken)
  }
}
