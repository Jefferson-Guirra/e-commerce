import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { AddBookListController } from './add-book-list-controller'
import { badRequest } from '../../helpers/http'
import { MissingParamError } from '../../errors/missing-params-error'
import { AddBookListRepository } from '../../../data/protocols/db/book-list/add-book-repository'
import { BookModel } from '../../../domain/models/book'

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
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
    },
  }
}
const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validation(input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

const makeAddBookListStub = (): AddBookListRepository => {
  class AddBookListRepositoryStub implements AddBookListRepository {
    async addBook(book: BookModel): Promise<AddBookModel> {
      return Promise.resolve({
        title: 'any_title',
        description: 'any_description',
        authors: ['any_author'],
        price: 0.0,
        language: 'any_language',
        publisher: 'any_publisher',
        publisherDate: 'any_date',
        imgUrl: 'any_url',
        id: 'any_id',
      })
    }
  }
  return new AddBookListRepositoryStub()
}
interface SutTypes {
  validationStub: Validation
  addBookListRepositoryStub: AddBookListRepository
  sut: AddBookListController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addBookListRepositoryStub = makeAddBookListStub()
  const sut = new AddBookListController(
    validationStub,
    addBookListRepositoryStub
  )

  return {
    validationStub,
    addBookListRepositoryStub,
    sut,
  }
}

describe('LoginController', () => {
  test('should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
  test('should return 400 if validation return error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validation')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should call addBook with correct values', async () => {
    const { sut, addBookListRepositoryStub } = makeSut()
    const addBookSpy = jest.spyOn(addBookListRepositoryStub, 'addBook')
    await sut.handle(makeFakeRequest())
    expect(addBookSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
})
