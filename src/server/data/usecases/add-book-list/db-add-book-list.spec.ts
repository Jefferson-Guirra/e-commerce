import { BookModel } from '../../../domain/models/book'
import { AddBookModel } from '../../../domain/usecases/add-book-list'
import {
  LoadAccountByAccessTokenRepository,
  accountLoginModel,
} from '../../protocols/db/account/load-account-by-access-token-repository'
import {
  AddBookListRepository,
  AddBookRepositoryModel,
} from '../../protocols/db/book-list/add-book-list-repository'
import { GetDate } from '../logout-account/protocols/get-date'
import { DbAddBookList } from './db-add-book-list'

const makeFakeLoadAccountByAccessToken =
  (): LoadAccountByAccessTokenRepository => {
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
          id: 'any_id',
        })
      }
    }
    return new LoadAccountByAccessTokenStub()
  }

const makeFakeAddBookModel = (): AddBookModel => {
  return {
    title: 'any_title',
    description: 'any_description',
    authors: ['any_author'],
    price: 0.0,
    language: 'any_language',
    publisher: 'any_publisher',
    publisherDate: 'any_date',
    date: 123456,
    imgUrl: 'any_url',
    id: 'any_id',
  }
}

const makeFakeAddBookRepositoryRequest = (): AddBookRepositoryModel => {
  return {
    title: 'any_title',
    description: 'any_description',
    authors: ['any_author'],
    price: 0.0,
    language: 'any_language',
    publisher: 'any_publisher',
    publisherDate: 'any_date',
    date: 123456,
    imgUrl: 'any_url',
    id: 'any_id',
    userId: 'any_id',
  }
}

const makeFakeRequest = (): BookModel => {
  return {
    title: 'any_title',
    description: 'any_description',
    authors: ['any_author'],
    price: 0.0,
    language: 'any_language',
    publisher: 'any_publisher',
    publisherDate: 'any_date',
    imgUrl: 'any_url',
    accessToken: 'any_token',
    bookId: 'any_id',
  }
}

const makeFakeAddBookListRepository = (): AddBookListRepository => {
  class AddBookListRepositoryStub implements AddBookListRepository {
    async addBook(book: AddBookRepositoryModel): Promise<AddBookModel> {
      return await Promise.resolve(makeFakeAddBookModel())
    }
  }

  return new AddBookListRepositoryStub()
}

const makeFakeGetDate = (): GetDate => {
  class GetDateStub implements GetDate {
    date(): number {
      return 123456
    }
  }
  return new GetDateStub()
}

interface SutTypes {
  loadAccountByAccessTokenStub: LoadAccountByAccessTokenRepository
  addBookListRepositoryStub: AddBookListRepository
  getDateStub: GetDate
  sut: DbAddBookList
}

const makeSut = (): SutTypes => {
  const loadAccountByAccessTokenStub = makeFakeLoadAccountByAccessToken()
  const addBookListRepositoryStub = makeFakeAddBookListRepository()
  const getDateStub = makeFakeGetDate()
  const sut = new DbAddBookList(
    loadAccountByAccessTokenStub,
    addBookListRepositoryStub,
    getDateStub
  )
  return {
    loadAccountByAccessTokenStub,
    addBookListRepositoryStub,
    getDateStub,
    sut,
  }
}
describe('DbAddBookList', () => {
  beforeAll(() => {
    jest.setSystemTime(new Date(2020, 3, 1))
  })

  afterAll(() => {
    jest.useRealTimers()
  })
  test('should call loadAccountByAccessToken with correct token', async () => {
    const { sut, loadAccountByAccessTokenStub } = makeSut()
    const loadSpy = jest.spyOn(
      loadAccountByAccessTokenStub,
      'loadByAccessToken'
    )
    await sut.add(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return throw if loadAccountByAccessToken fails', async () => {
    const { sut, loadAccountByAccessTokenStub } = makeSut()
    jest
      .spyOn(loadAccountByAccessTokenStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(makeFakeRequest())
    await expect(promise).rejects.toThrow()
  })

  test('should return undefined if loadAccountByAccessToken return null', async () => {
    const { sut, loadAccountByAccessTokenStub } = makeSut()
    jest
      .spyOn(loadAccountByAccessTokenStub, 'loadByAccessToken')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.add(makeFakeRequest())
    expect(response).toBeFalsy()
  })

  test('should call addBookListRepository with correct values', async () => {
    const { sut, addBookListRepositoryStub } = makeSut()
    const addBookSpy = jest.spyOn(addBookListRepositoryStub, 'addBook')
    await sut.add(makeFakeRequest())
    expect(addBookSpy).toHaveBeenCalledWith(makeFakeAddBookRepositoryRequest())
  })

  test('should return a book if correct values provided', async () => {
    const { sut } = makeSut()
    const response = await sut.add(makeFakeRequest())
    expect(response).toEqual(makeFakeAddBookModel())
  })

  test('should return throw if addBookRepository return throw', async () => {
    const { sut, addBookListRepositoryStub } = makeSut()
    jest
      .spyOn(addBookListRepositoryStub, 'addBook')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(makeFakeRequest())
    expect(promise).rejects.toThrow()
  })
})
