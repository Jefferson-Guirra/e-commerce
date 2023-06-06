import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../../protocols/db/account/load-account-by-access-token-repository'
import { DbRemoveBookList } from './db-remove-book-list'

const makeFakeAccount = (): accountLoginModel => ({
  username: 'any_username',
  password: 'any_password',
  email: 'any_email',
  accessToken: 'any_token',
  id: 'any_user_id',
})
const makeLoadAccountByAccessTokenStub =
  (): LoadAccountByAccessTokenRepository => {
    class LoadAccountByAccessTokenRepositoryStub
      implements LoadAccountByAccessTokenRepository
    {
      async loadByAccessToken(
        accessToken: string
      ): Promise<accountLoginModel | null> {
        return await Promise.resolve(makeFakeAccount())
      }
    }
    return new LoadAccountByAccessTokenRepositoryStub()
  }
interface SutTypes {
  loadAccountByAccessTokenStub: LoadAccountByAccessTokenRepository
  sut: DbRemoveBookList
}

const makeSut = (): SutTypes => {
  const loadAccountByAccessTokenStub = makeLoadAccountByAccessTokenStub()
  const sut = new DbRemoveBookList(loadAccountByAccessTokenStub)
  return {
    loadAccountByAccessTokenStub,
    sut,
  }
}
describe('DbRemoveBookList', () => {
  test('should call loadAccountByAccessToken wit correct accessToken', async () => {
    const { sut, loadAccountByAccessTokenStub } = makeSut()
    const loadByAccessTokenSpy = jest.spyOn(
      loadAccountByAccessTokenStub,
      'loadByAccessToken'
    )
    await sut.remove('any_token', 'any_id')
    expect(loadByAccessTokenSpy).toHaveBeenCalledWith('any_token')
  })
})
