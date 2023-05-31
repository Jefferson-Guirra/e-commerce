import { badRequest } from '../../helpers/http'
import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { LoginController } from './login-controller'

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      email: 'any_email@mail.com',
      password: 'any_password',
    },
  }
}
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
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return badRequest if validation return error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validation').mockReturnValueOnce(new Error())
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new Error()))
  })
})
