import { BookModel } from '../../../domain/models/book/book'
import {
  AddBookBuyList,
  AddBuyBookModel,
} from '../../../domain/usecases/book-buy-list/add-book-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../protocols/db/account/load-account-by-access-token-repository'

export class DbAddBookBuyList implements AddBookBuyList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async add(book: BookModel): Promise<AddBuyBookModel | undefined> {
    await this.loadAccount.loadByAccessToken(book.accessToken)
    return
  }
}
