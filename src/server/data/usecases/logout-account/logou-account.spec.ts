import {
  LoadAccountByAccessToken,
  accountLoginModel,
} from '../../protocols/db/account/load-account-by-access-token'
import { DbLogoutAccount } from './logout-account'

const makeFakeAccount = (): accountLoginModel => {
  return {
    username: 'any_username',
    password: 'any_password',
    email: 'any_email@mail.com',
    id: 'any_id',
    accessToken: 'any_token',
  }
}
const makeLoadAccountByAccessTokenStub = (): LoadAccountByAccessToken => {
  class LoadAccountByAccessTokenStub implements LoadAccountByAccessToken {
    async load(accessToken: string): Promise<accountLoginModel | null> {
      return await Promise.resolve({
        username: 'any_username',
        password: 'any_password',
        email: 'any_email@mail.com',
        id: 'any_id',
        accessToken: 'any_token',
      })
    }
  }
  return new LoadAccountByAccessTokenStub()
}
interface SutTypes {
  loadAccountByAccessTokenStub: LoadAccountByAccessToken
  sut: DbLogoutAccount
}
const makeSut = (): SutTypes => {
  const loadAccountByAccessTokenStub = makeLoadAccountByAccessTokenStub()
  const sut = new DbLogoutAccount(loadAccountByAccessTokenStub)
  return {
    loadAccountByAccessTokenStub,
    sut,
  }
}
describe('DbLogoutAccount', () => {
  test('should call load with correct token', async () => {
    const { sut, loadAccountByAccessTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByAccessTokenStub, 'load')
    await sut.logout('any_token')
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
