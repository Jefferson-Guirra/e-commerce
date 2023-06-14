import { AddBookModel } from '../../../../domain/usecases/book-list/add-book-list'
import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../../protocols/db/account/load-account-by-access-token-repository'
import { LoadBookByQueryDocRepository } from '../../../protocols/db/book-list/load-book-list-by-query-doc'
import { DbRemoveAmountBookBuyList } from './db-remove-amount-book-buy-list'
import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'

const makeFakeAddBuyBook = (): AddBuyBookModel => ({
  authors: ['any_author'],
  amount: 0,
  date: 0,
  description: 'any_description',
  title: 'any_title',
  bookId: 'any_book_id',
  id: 'any_id',
  imgUrl: 'any_url',
  language: 'any-language',
  price: 0,
  publisher: 'any_publisher',
  publisherDate: 'any_date',
  queryDoc: 'any_id_doc',
  userId: 'any_user_id',
})

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

const makeLoadBookStub = (): LoadBookByQueryDocRepository => {
  class LoadBookByQueryDocRepositoryStub
    implements LoadBookByQueryDocRepository
  {
    async loadBookByQuery(
      userId: string,
      bookId: string
    ): Promise<AddBookModel | null> {
      return await Promise.resolve(makeFakeAddBuyBook())
    }
  }
  return new LoadBookByQueryDocRepositoryStub()
}
interface SutTypes {
  loadBookStub: LoadBookByQueryDocRepository
  loadAccountStub: LoadAccountByAccessTokenRepository
  sut: DbRemoveAmountBookBuyList
}

const makeSut = (): SutTypes => {
  const loadBookStub = makeLoadBookStub()
  const loadAccountStub = makeLoadAccountStub()
  const sut = new DbRemoveAmountBookBuyList(loadAccountStub, loadBookStub)
  return {
    loadBookStub,
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

  test('should call loadBook wit correct values', async () => {
    const { sut, loadBookStub } = makeSut()
    const loadBookSpy = jest.spyOn(loadBookStub, 'loadBookByQuery')
    await sut.removeAmount('any_token', 'any_book_id')
    expect(loadBookSpy).toHaveBeenCalledWith('any_id', 'any_book_id')
  })

  test('should return undefined wit loadBook return null', async () => {
    const { sut, loadBookStub } = makeSut()
    jest
      .spyOn(loadBookStub, 'loadBookByQuery')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.removeAmount('any_token', 'any_book_id')
    expect(response).toBeFalsy()
  })
})
