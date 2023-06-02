import { BookModel } from '../../../domain/models/book'
import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../protocols/db/account/load-account-by-access-token-repository'
import { DbAddBookList } from './db-add-book-list'

const makeFakeLoadAccountByAccessToken =
  (): LoadAccountByAccessTokenRepository => {
    class LoadAccountByAccessTokenStub
      implements LoadAccountByAccessTokenRepository
    {
      async loadByAccessToken(
        accessToken: string
      ): Promise<accountLoginModel | null> {
        return await Promise.resolve({
          username: 'any_username',
          password: 'any_password',
          email: 'any_email',
          accessToken: 'any_token',
          id: 'any_id',
        })
      }
    }
    return new LoadAccountByAccessTokenStub()
  }
const makeFakeAddBookModel = (): BookModel => {
  return {
    title: 'any_title',
    description: 'any_description',
    authors: ['any_author'],
    price: 0.0,
    language: 'any_language',
    publisher: 'any_publisher',
    publisherDate: 'any_date',
    imgUrl: 'any_url',
    accessToken: 'any_token',
    bookId: 'any_book_id',
  }
}

interface SutTypes {
  loadAccountByAccessTokenStub: LoadAccountByAccessTokenRepository
  sut: DbAddBookList
}

const makeSut = (): SutTypes => {
  const loadAccountByAccessTokenStub = makeFakeLoadAccountByAccessToken()
  const sut = new DbAddBookList(loadAccountByAccessTokenStub)
  return {
    loadAccountByAccessTokenStub,
    sut,
  }
}
describe('DbAddBookList', () => {
  test('should call loadAccountByAccessToken with correct token', async () => {
    const { sut, loadAccountByAccessTokenStub } = makeSut()
    const loadSpy = jest.spyOn(
      loadAccountByAccessTokenStub,
      'loadByAccessToken'
    )
    await sut.add(makeFakeAddBookModel())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
