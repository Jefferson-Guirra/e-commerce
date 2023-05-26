import { SignupController } from './signup-controller'
import { Validation } from '../../protocols/validate'
import { HttpRequest } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-params-error'
import { badRequest } from '../../helpers/http'
interface SutTypes {
  sut: SignupController
  validationStub: Validation
}

const makeFakeAddAccount = (): HttpRequest => {
  return {
    body: {
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password',
    },
  }
}
const makeValidate = (): Validation => {
  class ValidationStub implements Validation {
    validation() {
      return undefined
    }
  }
  return new ValidationStub()
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidate()
  const sut = new SignupController(validationStub)
  return {
    validationStub,
    sut,
  }
}
describe('Signup Controller', () => {
  test('Should validation call with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validation')
    await sut.handle(makeFakeAddAccount())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeAddAccount())
  })

  test('should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validation')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const response = await sut.handle(makeFakeAddAccount())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
