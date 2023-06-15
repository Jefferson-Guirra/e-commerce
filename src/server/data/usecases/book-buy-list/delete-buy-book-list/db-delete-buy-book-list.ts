import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { DeleteBuyBookList } from '../../../../domain/usecases/book-buy-list/delete-book-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'

export class DbDeleteBuyBookList implements DeleteBuyBookList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async deleteBook(
    accessToken: string,
    bookId: string
  ): Promise<AddBuyBookModel | null> {
    await this.loadAccount.loadByAccessToken(accessToken)
    return null
  }
}
