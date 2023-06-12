import { BookModel } from '../../../domain/models/book/book'
import {
  AddBookBuyList,
  AddBuyBookModel,
} from '../../../domain/usecases/book-buy-list/add-book-buy-list'
import { LoadAccountByAccessTokenRepository } from '../../protocols/db/account/load-account-by-access-token-repository'
import { LoadBuyBookByQueryDocRepository } from '../../protocols/db/book-buy-list/load-book-buy-list-by-query-doc-repository'
import { UpdateBuyBookRepository } from '../../protocols/db/book-buy-list/update-book-buy-list-repository'

export class DbAddBookBuyList implements AddBookBuyList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository,
    private readonly loadBook: LoadBuyBookByQueryDocRepository,
    private readonly updateBook: UpdateBuyBookRepository
  ) {}
  async add(book: BookModel): Promise<AddBuyBookModel | undefined> {
    const account = await this.loadAccount.loadByAccessToken(book.accessToken)

    if (!account) {
      return
    }
    const { id } = account
    const loadBook = await this.loadBook.loadBookByQueryDoc(id, book.bookId)
    if (loadBook) {
      await this.updateBook.updateAmount(loadBook)
    }

    return {
      authors: ['any_author'],
      amount: 0,
      date: 0,
      description: 'any_description',
      title: 'any_title',
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
