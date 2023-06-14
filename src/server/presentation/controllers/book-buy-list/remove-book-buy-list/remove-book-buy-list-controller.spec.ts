import { MissingParamError } from '../../../errors/missing-params-error'
import { badRequest, ok } from '../../../helpers/http'
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

describe('RemoveBookBuyListController', () => {
  test('should call validation with correct values', async () => {
    const { validateStub, sut } = makeSut()
    const validationSpy = jest.spyOn(validateStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return 400 if validation return a error', async () => {
    const { sut, validateStub } = makeSut()
    jest
      .spyOn(validateStub, 'validation')
      .mockReturnValue(new MissingParamError('any_field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
