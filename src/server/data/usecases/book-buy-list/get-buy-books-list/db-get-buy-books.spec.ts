import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../../protocols/db/account/load-account-by-access-token-repository'
import { DbGetBuyBooks } from './db-get-buy-books-list'

const makeLoadAccountStub = (): LoadAccountByAccessTokenRepository => {
  class LoadAccountByAccessTokenRepositoryStub
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

  return new LoadAccountByAccessTokenRepositoryStub()
}
interface SutTypes {
  loadAccountStub: LoadAccountByAccessTokenRepository
  sut: DbGetBuyBooks
}

const makeSut = (): SutTypes => {
  const loadAccountStub = makeLoadAccountStub()
  const sut = new DbGetBuyBooks(loadAccountStub)
  return {
    loadAccountStub,
    sut,
  }
}

describe('DbGetBuyBooks', () => {
  test('should call loadAccount with correct accessToken', async () => {
    const { sut, loadAccountStub } = makeSut()
    const loadAccountSpy = jest.spyOn(loadAccountStub, 'loadByAccessToken')
    await sut.getBuyBooks('any_token')
    expect(loadAccountSpy).toHaveBeenCalledWith('any_token')
  })
})
