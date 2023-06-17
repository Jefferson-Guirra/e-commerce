import { LoadAccountByAccessTokenRepository } from '../../../protocols/db/account/load-account-by-access-token-repository'
import { accountLoginModel } from '../../../protocols/db/account/load-account-by-access-token-repository'
import { DbUpdateAmountBookBuyList } from './db-update-amount-book-buy-list'

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
  sut: DbUpdateAmountBookBuyList
}

const makeSut = (): SutTypes => {
  const loadAccountStub = makeLoadAccountStub()
  const sut = new DbUpdateAmountBookBuyList(loadAccountStub)
  return {
    loadAccountStub,
    sut,
  }
}

describe('DbUpdateAmountBookBuyList', () => {
  test('should call loadAccountByAccessToken wit correct token', async () => {
    const { sut, loadAccountStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountStub, 'loadByAccessToken')
    await sut.updateAmount('any_token', 'any_book_id', 1)
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return throw if loadAccountByAccessToken return throw', async () => {
    const { sut, loadAccountStub } = makeSut()
    jest
      .spyOn(loadAccountStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.updateAmount('any_token', 'any_book_id', 1)
    await expect(promise).rejects.toThrow()
  })
})
