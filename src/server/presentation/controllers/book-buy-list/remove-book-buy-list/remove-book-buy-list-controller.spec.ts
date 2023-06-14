import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'
import { RemoveBookBuyListController } from './remove-book-buy-list-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
    bookId: 'any_book_id',
  },
})

const makeValidateStub = (): Validation => {
  class ValidationStub implements Validation {
    validation(input: any): Error | undefined {
      return
    }
  }
  return new ValidationStub()
}
interface SutTypes {
  validateStub: Validation
  sut: RemoveBookBuyListController
}

const makeSut = (): SutTypes => {
  const validateStub = makeValidateStub()
  const sut = new RemoveBookBuyListController(validateStub)
  return {
    validateStub,
    sut,
  }
}

describe('RemoveBookBuyLIstController', () => {
  test('should call validation with correct values', async () => {
    const { validateStub, sut } = makeSut()
    const validationSpy = jest.spyOn(validateStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
})
