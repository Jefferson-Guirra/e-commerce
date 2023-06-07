import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../../protocols/db/account/load-account-by-access-token-repository'
import { DbGetBooksList } from './db-get-books-list'

interface SutTypes {
  loadAccountRepositoryStub: LoadAccountByAccessTokenRepository
  sut: DbGetBooksList
}
const makeLoadAccountRepositoryStub =
  (): LoadAccountByAccessTokenRepository => {
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
          accessToken: 'any_token',
          id: 'any_id',
        })
      }
    }

    return new LoadAccountByAccessTokenRepositoryStub()
  }
const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = makeLoadAccountRepositoryStub()
  const sut = new DbGetBooksList(loadAccountRepositoryStub)
  return {
    loadAccountRepositoryStub,
    sut,
  }
}
describe('DbGetBookList', () => {
  test('should call loadAccountByAccessToken with correct token', async () => {
    const { loadAccountRepositoryStub, sut } = makeSut()
    const loadAccountSpy = jest.spyOn(
      loadAccountRepositoryStub,
      'loadByAccessToken'
    )
    await sut.getBooks('any_token')
    expect(loadAccountSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return throw if loadAccountByAccessToken return throw', async () => {
    const { loadAccountRepositoryStub, sut } = makeSut()
    jest
      .spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.getBooks('any_token')
    await expect(promise).rejects.toThrow()
  })

  test('should return null if loadAccountByAccessTokenRepository return null', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
      .mockReturnValue(Promise.resolve(null))
    const response = await sut.getBooks('any_token')
    expect(response).toBeFalsy()
  })
})
