import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../../protocols/db/account/load-account-by-access-token-repository'
import { DbDeleteBuyBookList } from './db-delete-buy-book-list'

const makeLoadAccountByAccessTokenStun =
  (): LoadAccountByAccessTokenRepository => {
    class LoadAccountBysAccessTokenRepositoryStub
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
    return new LoadAccountBysAccessTokenRepositoryStub()
  }
interface SutTypes {
  loadAccountStub: LoadAccountByAccessTokenRepository
  sut: DbDeleteBuyBookList
}
const makeSut = (): SutTypes => {
  const loadAccountStub = makeLoadAccountByAccessTokenStun()
  const sut = new DbDeleteBuyBookList(loadAccountStub)
  return {
    loadAccountStub,
    sut,
  }
}
describe('first', () => {
  test('should call loadAccount with correct token', async () => {
    const { sut, loadAccountStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountStub, 'loadByAccessToken')
    await sut.deleteBook('any_token', 'any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return throw if loadAccount fails', async () => {
    const { sut, loadAccountStub } = makeSut()
    jest
      .spyOn(loadAccountStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.deleteBook('any_token', 'any_id')
    expect(promise).rejects.toThrow()
  })
})
