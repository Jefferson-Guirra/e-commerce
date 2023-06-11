import { BookModel } from '../../../domain/models/book/book'
import { HttpRequest } from '../../../presentation/protocols/http'
import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../protocols/db/account/load-account-by-access-token-repository'
import { DbAddBookBuyList } from './db-add-book-buy-list'

const makeFakeRequest = (): BookModel => ({
  accessToken: 'any_token',
  bookId: 'any_id',
  authors: ['any_author'],
  description: 'any_description',
  title: 'any_title',
  imgUrl: 'any_url',
  language: 'any_language',
  price: 0,
  publisher: 'any_publisher',
  publisherDate: 'any_date',
})

const makeLoadAccountRepositoryStub =
  (): LoadAccountByAccessTokenRepository => {
    class LoadAccountRepositoryStub
      implements LoadAccountByAccessTokenRepository
    {
      async loadByAccessToken(
        accessToken: string
      ): Promise<accountLoginModel | null> {
        return await Promise.resolve({
          username: 'any_username',
          password: 'any_password',
          email: 'any_email@mail.com',
          id: 'any_id',
          accessToken: 'any_token',
        })
      }
    }

    return new LoadAccountRepositoryStub()
  }
interface SutTypes {
  loadAccountRepositoryStub: LoadAccountByAccessTokenRepository
  sut: DbAddBookBuyList
}
const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = makeLoadAccountRepositoryStub()
  const sut = new DbAddBookBuyList(loadAccountRepositoryStub)

  return {
    loadAccountRepositoryStub,
    sut,
  }
}
describe('DbAddBookBuyList', () => {
  test('should DbAddBookBuyList call LoadAccount with correct value', async () => {
    const { loadAccountRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
    await sut.add(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
