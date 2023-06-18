import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'
import { accountLoginModel } from '../../../protocols/db/account/load-account-by-access-token-repository'
import { DbDeleteAllBooksBuyList } from './db-delete-all-books-buy-list'

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
          id: 'any_user_id',
          accessToken: 'any_token',
        })
      }
    }
    return new LoadAccountRepositoryStub()
  }

interface SutTypes {
  loadAccountRepositoryStub: LoadAccountByAccessTokenRepository
  sut: DbDeleteAllBooksBuyList
}
const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = makeLoadAccountRepositoryStub()
  const sut = new DbDeleteAllBooksBuyList(loadAccountRepositoryStub)
  return {
    loadAccountRepositoryStub,
    sut,
  }
}

describe('DbDeleteAllBooksBuyList', () => {
  test('should DbDeleteAllBooksBuyList call LoadAccount with correct value', async () => {
    const { loadAccountRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
    await sut.deleteAllBooks('any_token')
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return null LoadAccount return null', async () => {
    const { loadAccountRepositoryStub, sut } = makeSut()
    jest
      .spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.deleteAllBooks('any_token')
    expect(response).toEqual(null)
  })

  test('should return throw if LoadAccount return throw', async () => {
    const { loadAccountRepositoryStub, sut } = makeSut()
    jest
      .spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const response = sut.deleteAllBooks('any_token')
    await expect(response).rejects.toThrow()
  })
})