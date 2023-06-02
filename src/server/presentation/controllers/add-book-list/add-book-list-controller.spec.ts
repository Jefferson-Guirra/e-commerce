import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { AddBookListController } from './add-book-list-controller'

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

interface SutTypes {
  validationStub: Validation
  sut: AddBookListController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new AddBookListController(validationStub)

  return {
    validationStub,
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
})
