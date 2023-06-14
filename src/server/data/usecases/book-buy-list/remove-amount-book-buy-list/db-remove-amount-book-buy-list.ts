import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { RemoveAmountBuyBook } from '../../../../domain/usecases/book-buy-list/remove-amount-book-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'
import { LoadBuyBookByQueryDocRepository } from '../../../protocols/db/book-buy-list/load-book-buy-list-by-query-doc-repository'
import { RemoveAmountBuyBookRepository } from '../../../protocols/db/book-buy-list/remove-amount-book-buy-list'

export class DbRemoveAmountBookBuyList implements RemoveAmountBuyBook {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository,
    private readonly loadBook: LoadBuyBookByQueryDocRepository,
    private readonly removeBookAmountRepository: RemoveAmountBuyBookRepository
  ) {}
  async removeAmount(
    accessToken: string,
    bookId: string
  ): Promise<AddBuyBookModel | undefined> {
    const account = await this.loadAccount.loadByAccessToken(accessToken)
    if (!account) {
      return
    }
    const { id } = account
    const loadBook = await this.loadBook.loadBookByQueryDoc(id, bookId)
    if (!loadBook) {
      return
    }
    await this.removeBookAmountRepository.removeAmountBook(loadBook)
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
