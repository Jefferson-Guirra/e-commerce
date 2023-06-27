import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../../protocols/db/account/load-account-by-access-token-repository'
import { DebGetBookBuyList } from './db-get-book-buy-list'

const makeLoadAccountStub = (): LoadAccountByAccessTokenRepository => {
  class LoadAccountStub implements LoadAccountByAccessTokenRepository {
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

  return new LoadAccountStub()
}

interface SutTypes {
  loadAccountStub: LoadAccountByAccessTokenRepository
  sut: DebGetBookBuyList
}

const makeSut = (): SutTypes => {
  const loadAccountStub = makeLoadAccountStub()
  const sut = new DebGetBookBuyList(loadAccountStub)
  return {
    loadAccountStub,
    sut,
  }
}

describe('DebGetBookBuyList', () => {
  test('should call loadAccount with correct accessToken', async () => {
    const { loadAccountStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountStub, 'loadByAccessToken')
    await sut.getBook('any_token', 'any_book_id')
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return undefined if loadAccount return null', async () => {
    const { loadAccountStub, sut } = makeSut()
    jest
      .spyOn(loadAccountStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.getBook('any_token', 'any_book_id')
    expect(response).toBe(undefined)
  })

  test('should return throw if loadAccount throw', async () => {
    const { loadAccountStub, sut } = makeSut()
    jest
      .spyOn(loadAccountStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.getBook('any_token', 'any_book_id')
    await expect(promise).rejects.toThrow()
  })
})
