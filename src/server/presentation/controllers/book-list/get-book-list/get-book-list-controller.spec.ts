import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'
import { GetBookListController } from './get-book-list-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
    bookId: 'any_id',
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

interface SutTypes {
  validationStub: Validation
  sut: GetBookListController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidateStub()
  const sut = new GetBookListController(validationStub)
  return {
    validationStub,
    sut,
  }
}

describe('GetBookListController', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
})
