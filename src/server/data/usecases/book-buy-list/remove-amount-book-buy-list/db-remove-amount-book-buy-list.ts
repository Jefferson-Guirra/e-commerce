import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { RemoveAmountBuyBook } from '../../../../domain/usecases/book-buy-list/remove-amount-book-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'

export class DbRemoveAmountBookBuyList implements RemoveAmountBuyBook {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async removeAmount(
    accessToken: string,
    bookId: string
  ): Promise<AddBuyBookModel | undefined> {
    await this.loadAccount.loadByAccessToken(accessToken)
    return
  }
}
