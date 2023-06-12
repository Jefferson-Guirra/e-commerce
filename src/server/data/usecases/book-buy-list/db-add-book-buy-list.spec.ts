import { BookModel } from '../../../domain/models/book/book'
import { AddBuyBookModel } from '../../../domain/usecases/book-buy-list/add-book-buy-list'

import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../protocols/db/account/load-account-by-access-token-repository'
import { LoadBuyBookByQueryDocRepository } from '../../protocols/db/book-buy-list/load-book-buy-list-by-query-doc'
import { DbAddBookBuyList } from './db-add-book-buy-list'

const makeFakeAddBuyBook = (): AddBuyBookModel => ({
  authors: ['any_author'],
  description: 'any_description',
  title: 'any_title',
  imgUrl: 'any_url',
  language: 'any_language',
  price: 0,
  publisher: 'any_publisher',
  publisherDate: 'any_date',
  amount: 1,
  date: 0,
  id: 'any_id',
  userId: 'any_user_id',
  queryDoc: 'any_user_id' + 'any_id',
})

const makeFakeRequest = (): BookModel => ({
  accessToken: 'any_token',
  bookId: 'any_id',
  authors: ['any_author'],
  description: 'any_description',
  title: 'any_title',
  imgUrl: 'any_url',
  language: 'any_language',
  price: 0,
  publisher: 'any_publisher',
  publisherDate: 'any_date',
})

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

const makeLoadBookByQueryDocStub = (): LoadBuyBookByQueryDocRepository => {
  class LoadBookByQueryDocRepositoryStub
    implements LoadBuyBookByQueryDocRepository
  {
    async loadBookByQueryDoc(
      userId: string,
      bookId: string
    ): Promise<AddBuyBookModel | null> {
      return await Promise.resolve(makeFakeAddBuyBook())
    }
  }

  return new LoadBookByQueryDocRepositoryStub()
}
interface SutTypes {
  loadBookByQueryDocRepositoryStub: LoadBuyBookByQueryDocRepository
  loadAccountRepositoryStub: LoadAccountByAccessTokenRepository
  sut: DbAddBookBuyList
}
const makeSut = (): SutTypes => {
  const loadBookByQueryDocRepositoryStub = makeLoadBookByQueryDocStub()
  const loadAccountRepositoryStub = makeLoadAccountRepositoryStub()
  const sut = new DbAddBookBuyList(
    loadAccountRepositoryStub,
    loadBookByQueryDocRepositoryStub
  )
  return {
    loadBookByQueryDocRepositoryStub,
    loadAccountRepositoryStub,
    sut,
  }
}
describe('DbAddBookBuyList', () => {
  test('should DbAddBookBuyList call LoadAccount with correct value', async () => {
    const { loadAccountRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
    await sut.add(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return LoadAccount return null', async () => {
    const { loadAccountRepositoryStub, sut } = makeSut()
    jest
      .spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.add(makeFakeRequest())
    expect(response).toBeFalsy()
  })

  test('should return throw if LoadAccount return throw', async () => {
    const { loadAccountRepositoryStub, sut } = makeSut()
    jest
      .spyOn(loadAccountRepositoryStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const response = sut.add(makeFakeRequest())
    await expect(response).rejects.toThrow()
  })

  test('should call LoadBookByQueryDoc with correct values', async () => {
    const { sut, loadBookByQueryDocRepositoryStub } = makeSut()
    const loadBookSpy = jest.spyOn(
      loadBookByQueryDocRepositoryStub,
      'loadBookByQueryDoc'
    )
    await sut.add(makeFakeRequest())
    expect(loadBookSpy).toBeCalledWith('any_user_id', 'any_id')
  })
})
