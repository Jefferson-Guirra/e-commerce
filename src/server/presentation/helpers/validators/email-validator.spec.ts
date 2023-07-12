import { EmailValidator } from '../../protocols/email-validator'
import { HttpRequest } from '../../protocols/http'
import { EmailValidation } from './email-validator'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    username: 'any_username',
    email: 'any_email@mail.com',
    password: 'any_password',
  },
})

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  emailValidator: EmailValidator
  sut: EmailValidation
}

const makeSut = (): SutTypes => {
  const emailValidator = makeEmailValidatorStub()
  const sut = new EmailValidation('email', emailValidator)
  return {
    emailValidator,
    sut,
  }
}

describe('EmailValidation', () => {
  test('should call emailValidator correct value', () => {
    const { emailValidator, sut } = makeSut()
    const isValidSpy = jest.spyOn(emailValidator, 'isValid')
    sut.validation(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
