import { AddBookModel } from '../../../domain/usecases/book-list/add-book-list'
import { GetBooksList } from '../../../domain/usecases/book-list/get-books-list'
import { MissingParamError } from '../../errors/missing-params-error'
import { badRequest } from '../../helpers/http'
import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { GetBooksListController } from './get-books-list-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
  },
})
const makeValidateStub = (): Validation => {
  class ValidateStub implements Validation {
    validation(input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidateStub()
}

const makeFakeAddBookModel = (): AddBookModel => {
  return {
    title: 'any_title',
    description: 'any_description',
    authors: ['any_author'],
    price: 0.0,
    language: 'any_language',
    publisher: 'any_publisher',
    date: 1254632254,
    publisherDate: 'any_date',
    imgUrl: 'any_url',
    id: 'any_id',
    userId: 'any_user_id',
    queryDoc: 'any_user_idany_id',
  }
}

const makeGetBooksListStub = (): GetBooksList => {
  class GetBooksListStub implements GetBooksList {
    async getBooks(accessToken: string): Promise<AddBookModel[] | null> {
      return await Promise.resolve([
        makeFakeAddBookModel(),
        makeFakeAddBookModel(),
      ])
    }
  }

  return new GetBooksListStub()
}
interface SutTypes {
  validateStub: Validation
  getBooksListStub: GetBooksList
  sut: GetBooksListController
}

const makeSut = (): SutTypes => {
  const validateStub = makeValidateStub()
  const getBooksListStub = makeGetBooksListStub()
  const sut = new GetBooksListController(validateStub, getBooksListStub)
  return {
    validateStub,
    getBooksListStub,
    sut,
  }
}
describe('GetBookList', () => {
  test('should call validate with correct values', async () => {
    const { validateStub, sut } = makeSut()
    const validateSpy = jest.spyOn(validateStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return 400 if validate return error', async () => {
    const { sut, validateStub } = makeSut()
    jest
      .spyOn(validateStub, 'validation')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should call getBooks with correct accessToken', async () => {
    const { sut, getBooksListStub } = makeSut()
    const getBooksSpy = jest.spyOn(getBooksListStub, 'getBooks')
    await sut.handle(makeFakeRequest())
    expect(getBooksSpy).toHaveBeenCalledWith('any_token')
  })
})
