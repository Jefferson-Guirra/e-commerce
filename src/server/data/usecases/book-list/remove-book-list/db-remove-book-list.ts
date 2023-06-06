import { AddBookModel } from '../../../../domain/usecases/book-list/add-book-list'
import { RemoveBookList } from '../../../../domain/usecases/book-list/remove-book-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'

export class DbRemoveBookList implements RemoveBookList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async remove(
    accessToken: string,
    idBook: string
  ): Promise<AddBookModel | undefined> {
    await this.loadAccount.loadByAccessToken(accessToken)
    return
  }
}
