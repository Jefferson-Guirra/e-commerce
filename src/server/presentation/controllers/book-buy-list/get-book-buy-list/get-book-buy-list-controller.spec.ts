import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'
import { GetBookBuyListController } from './get-book-buy-list-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
    bookId: 'any_book_id',
  },
})
const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validation(input: any): Error | undefined {
      return
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  validationStub: Validation
  sut: GetBookBuyListController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new GetBookBuyListController(validationStub)

  return {
    validationStub,
    sut,
  }
}

describe('GetBookBuyListController', () => {
  test('should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
})
