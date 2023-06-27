import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { GetBookBuyList } from '../../../../domain/usecases/book-buy-list/get-book-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'

export class DebGetBookBuyList implements GetBookBuyList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async getBook(
    accessToken: string,
    bookId: string
  ): Promise<AddBuyBookModel | null | undefined> {
    const account = await this.loadAccount.loadByAccessToken(accessToken)
    if (!account) {
      return
    }
    return null
  }
}
