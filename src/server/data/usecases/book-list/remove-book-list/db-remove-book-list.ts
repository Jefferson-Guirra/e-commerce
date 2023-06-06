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
    const account = await this.loadAccount.loadByAccessToken(accessToken)

    if (!account) {
      return undefined
    }
    return {
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
    }
  }
}
