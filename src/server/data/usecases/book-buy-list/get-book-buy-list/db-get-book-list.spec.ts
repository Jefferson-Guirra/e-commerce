import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../../protocols/db/account/load-account-by-access-token-repository'
import { DebGetBookBuyList } from './db-get-book-buy-list'
import { AddBuyBookModel } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { GetBookBuyListRepository } from '../../../protocols/db/book-buy-list/get-book-buy-list-repository'

const makeFakeAddBuyBookModel = (): AddBuyBookModel => ({
  pageCount: 1,
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

const makeGetBuyBookListRepositoryStub = (): GetBookBuyListRepository => {
  class GetBookBuyListRepositoryStub implements GetBookBuyListRepository {
    async getBook(
      userId: string,
      bookId: string
    ): Promise<AddBuyBookModel | null> {
      return await Promise.resolve(makeFakeAddBuyBookModel())
    }
  }
  return new GetBookBuyListRepositoryStub()
}

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
  getBookBuyListRepositoryStub: GetBookBuyListRepository
  loadAccountStub: LoadAccountByAccessTokenRepository
  sut: DebGetBookBuyList
}

const makeSut = (): SutTypes => {
  const getBookBuyListRepositoryStub = makeGetBuyBookListRepositoryStub()
  const loadAccountStub = makeLoadAccountStub()
  const sut = new DebGetBookBuyList(
    loadAccountStub,
    getBookBuyListRepositoryStub
  )
  return {
    getBookBuyListRepositoryStub,
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

  test('should call getBook with correct values', async () => {
    const { getBookBuyListRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(getBookBuyListRepositoryStub, 'getBook')
    await sut.getBook('any_token', 'any_book_id')
    expect(loadSpy).toHaveBeenCalledWith('any_user_id', 'any_book_id')
  })

  test('should return throw if getBook return throw', async () => {
    const { getBookBuyListRepositoryStub, sut } = makeSut()
    jest
      .spyOn(getBookBuyListRepositoryStub, 'getBook')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.getBook('any_token', 'any_book_id')
    expect(promise).rejects.toThrow()
  })
})
