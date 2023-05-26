import { SignupController } from './signup-controller'
import { Validation } from '../../protocols/validate'
import { HttpRequest } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-params-error'
import { badRequest } from '../../helpers/http'
interface SutTypes {
  sut: SignupController
  validationStub: Validation
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
    const fakeAccount: HttpRequest = {
      body: {
        username: 'any_username',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    }
    await sut.handle(fakeAccount)
    expect(validateSpy).toHaveBeenCalledWith(fakeAccount)
  })

  test('should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validation')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const fakeAccount: HttpRequest = {
      body: {
        username: 'any_username',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    }
    const response = await sut.handle(fakeAccount)
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
