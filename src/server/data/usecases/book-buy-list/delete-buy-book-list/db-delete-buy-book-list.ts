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
    const account = await this.loadAccount.loadByAccessToken(accessToken)
    if (!account) {
      return null
    }
    return {
      authors: ['any_author'],
      description: 'any_description',
      title: 'any_title',
      imgUrl: 'any_url',
      bookId: 'any_book_id',
      language: 'any_language',
      price: 0,
      publisher: 'any_publisher',
      publisherDate: 'any_date',
      amount: 1,
      date: 0,
      id: 'any_id',
      userId: 'any_user_id',
      queryDoc: 'any_user_id' + 'any_id',
    }
  }
}
