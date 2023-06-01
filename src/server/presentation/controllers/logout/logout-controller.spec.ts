import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { LogoutController } from './logout-controller'
import { badRequest, serverError } from '../../helpers/http'
import { MissingParamError } from '../../errors/missing-params-error'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validation(input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      accessToken: 'any_token',
    },
  }
}
interface SutTypes {
  validateStub: Validation
  sut: LogoutController
}

const makeSut = (): SutTypes => {
  const validateStub = makeValidationStub()
  const sut = new LogoutController(validateStub)
  return {
    validateStub,
    sut,
  }
}

describe('LoginController', () => {
  test('should call Validation with correct value', async () => {
    const { sut, validateStub } = makeSut()
    const validateSpy = jest.spyOn(validateStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return 400 if validation return error', async () => {
    const { sut, validateStub } = makeSut()
    jest
      .spyOn(validateStub, 'validation')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should return 500 if validation return throw', async () => {
    const { sut, validateStub } = makeSut()
    jest.spyOn(validateStub, 'validation').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
