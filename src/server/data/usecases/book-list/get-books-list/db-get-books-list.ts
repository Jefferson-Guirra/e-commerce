import { AddBookModel } from '../../../../domain/usecases/book-list/add-book-list'
import { GetBooksList } from '../../../../domain/usecases/book-list/get-books-list'
import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'

export class DbGetBooksList implements GetBooksList {
  constructor(
    private readonly loadAccount: LoadAccountByAccessTokenRepository
  ) {}
  async getBooks(accessToken: string): Promise<AddBookModel[] | null> {
    const account = await this.loadAccount.loadByAccessToken(accessToken)
    if (!account) {
      return null
    }
    return [
      {
        title: 'any_title',
        description: 'any_description',
        authors: ['any_author'],
        price: 0.0,
        language: 'any_language',
        publisher: 'any_publisher',
        date: 1254632254,
        publisherDate: 'any_date',
        imgUrl: 'any_url',
        id: 'any_id',
        userId: 'any_user_id',
        queryDoc: 'any_user_idany_id',
      },
    ]
  }
}
