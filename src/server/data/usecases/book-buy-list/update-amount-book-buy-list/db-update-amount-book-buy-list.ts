import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { UpdateAmountBuyBook } from '../../../../domain/usecases/book-buy-list/update-amount-book-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'
import { LoadBuyBookByQueryDocRepository } from '../../../protocols/db/book-buy-list/load-book-buy-list-by-query-doc-repository'

export class DbUpdateAmountBookBuyList implements UpdateAmountBuyBook {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository,
    private readonly loadBook: LoadBuyBookByQueryDocRepository
  ) {}
  async updateAmount(
    accessToken: string,
    bookId: string,
    amount: number
  ): Promise<AddBuyBookModel | null> {
    const account = await this.loadAccount.loadByAccessToken(accessToken)
    if (!account) {
      return null
    }

    const { id } = account
    await this.loadBook.loadBookByQueryDoc(id, bookId)
    return {
      authors: ['any_author'],
      amount: 0,
      date: 0,
      description: 'any_description',
      title: 'any_title',
      bookId: 'any_book_id',
      id: 'any_id',
      imgUrl: 'any_url',
      language: 'any-language',
      price: 0,
      publisher: 'any_publisher',
      publisherDate: 'any_date',
      queryDoc: 'any_id_doc',
      userId: 'any_user_id',
    }
  }
}
