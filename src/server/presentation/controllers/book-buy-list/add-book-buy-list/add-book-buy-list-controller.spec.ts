import { MissingParamError } from '../../../errors/missing-params-error'
import { badRequest } from '../../../helpers/http'
import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'
import { AddBookBuyListController } from './add-book-buy-list-controller'
const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validation(input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
    bookId: 'any_id',
  },
})

interface SutTypes {
  validateStub: Validation
  sut: AddBookBuyListController
}

const makeSut = (): SutTypes => {
  const validateStub = makeValidationStub()
  const sut = new AddBookBuyListController(validateStub)
  return {
    sut,
    validateStub,
  }
}
describe('AddBookBuyListController', () => {
  test('should call validate with correct values', async () => {
    const { sut, validateStub } = makeSut()
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
})
