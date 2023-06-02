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
      return await Promise.resolve(makeFakeAccount())
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

  test('should return undefined if load return null', async () => {
    const { sut, loadAccountByAccessTokenStub } = makeSut()
    jest
      .spyOn(loadAccountByAccessTokenStub, 'load')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.logout('any_token')
    expect(response).toBeFalsy()
  })

  test('should return throw if load return throw', async () => {
    const { sut, loadAccountByAccessTokenStub } = makeSut()
    jest
      .spyOn(loadAccountByAccessTokenStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.logout('any_token')
    await expect(promise).rejects.toThrow()
  })

  test('should return message on a succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.logout('any_token')
    expect(response).toEqual('logout success')
  })
})
