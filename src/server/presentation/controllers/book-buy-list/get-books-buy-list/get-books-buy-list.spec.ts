import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'
import { GetBuyBooksController } from './get-books-buy-list'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
  },
})
const makeValidatorStub = (): Validation => {
  class ValidatorStub implements Validation {
    validation(input: any): Error | undefined {
      return
    }
  }
  return new ValidatorStub()
}
interface SutTypes {
  validatorStub: Validation
  sut: GetBuyBooksController
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidatorStub()
  const sut = new GetBuyBooksController(validatorStub)

  return {
    validatorStub,
    sut,
  }
}
describe('GetBuyBooksController', () => {
  test('should call validation with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validationSpy = jest.spyOn(validatorStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
})
