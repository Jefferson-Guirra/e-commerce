import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../../protocols/db/account/load-account-by-access-token-repository'
import { DbRemoveAmountBookBuyList } from './db-remove-amount-book-buy-list'

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
  sut: DbRemoveAmountBookBuyList
}

const makeSut = (): SutTypes => {
  const loadAccountStub = makeLoadAccountStub()
  const sut = new DbRemoveAmountBookBuyList(loadAccountStub)
  return {
    loadAccountStub,
    sut,
  }
}
describe('DbRemoveAmountBookBuyList', () => {
  test('should call loadAccountByAccessToken wit correct token', async () => {
    const { sut, loadAccountStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountStub, 'loadByAccessToken')
    await sut.removeAmount('any_token', 'any_book_id')
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return throw if loadAccountByAccessToken return throw', async () => {
    const { sut, loadAccountStub } = makeSut()
    jest
      .spyOn(loadAccountStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.removeAmount('any_token', 'any_book_id')
    await expect(promise).rejects.toThrow()
  })

  test('should return undefined if loadAccountByAccessToken return null', async () => {
    const { sut, loadAccountStub } = makeSut()
    jest
      .spyOn(loadAccountStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.removeAmount('any_token', 'any_book_id')
    expect(response).toBeFalsy()
  })
})
