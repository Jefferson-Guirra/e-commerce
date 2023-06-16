import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'
import { accountLoginModel } from '../../../protocols/db/account/load-account-by-access-token-repository'
import { DbGetBookList } from './db-get-book-list'

const makeLoadAccountByAccessToken = (): LoadAccountByAccessTokenRepository => {
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
        id: 'any_user_id',
      })
    }
  }
  return new LoadAccountByAccessTokenStub()
}

interface SutTypes {
  loadAccountRepositoryStub: LoadAccountByAccessTokenRepository
  sut: DbGetBookList
}

const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = makeLoadAccountByAccessToken()
  const sut = new DbGetBookList(loadAccountRepositoryStub)
  return {
    loadAccountRepositoryStub,
    sut,
  }
}

describe('DbGetBookList', () => {
  test('should call loadAccount with correct value', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
    await sut.getBook('any_token', 'any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return throw if loadAccount return throw', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.getBook('any_token', 'any_id')
    await expect(promise).rejects.toThrow()
  })

  test('should return null if loadAccount return null', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.getBook('any_token', 'any_id')
    expect(response).toBeFalsy()
  })
})
