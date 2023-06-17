import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { UpdateAmountBuyBook } from '../../../../domain/usecases/book-buy-list/update-amount-book-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'

export class DbUpdateAmountBookBuyList implements UpdateAmountBuyBook {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async updateAmount(
    accessToken: string,
    bookId: string,
    amount: number
  ): Promise<AddBuyBookModel | null> {
    await this.loadAccount.loadByAccessToken(accessToken)
    return null
  }
}
