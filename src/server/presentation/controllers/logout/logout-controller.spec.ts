import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { LogoutController } from './logout-controller'

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
})
