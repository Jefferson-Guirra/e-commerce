import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { LoginController } from './login-controller'

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
  sut: LoginController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new LoginController(validationStub)

  return {
    validationStub,
    sut,
  }
}
describe('LoginController', () => {
  test('should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validation')
    const makeFakeRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    }
    await sut.handle(makeFakeRequest)
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest)
  })
})
