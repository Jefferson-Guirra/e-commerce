import { Validation } from '../../../protocols/validate'
import { HttpRequest } from '../../../protocols/http'
import { UpdateAmountBookBuyListController } from './update-amount-book-buy-list-controller'
import { MissingParamError } from '../../../errors/missing-params-error'
import { badRequest } from '../../../helpers/http'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
    bookId: 'any_id',
  },
})

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validation(input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  validatorStub: Validation
  sut: UpdateAmountBookBuyListController
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidationStub()
  const sut = new UpdateAmountBookBuyListController(validatorStub)

  return {
    validatorStub,
    sut,
  }
}

describe('UpdateAmountBookBuyListController', () => {
  test('should call validate with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return 400 if validate return error', async () => {
    const { sut, validatorStub } = makeSut()
    jest
      .spyOn(validatorStub, 'validation')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
