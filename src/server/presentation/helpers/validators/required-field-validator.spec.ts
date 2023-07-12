import { MissingParamError } from '../../errors/missing-params-error'
import { HttpRequest } from '../../protocols/http'
import { RequiredFieldValidator } from './required-field-validator'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    username: 'any_username',
    password: 'any_password',
    email: 'any_email@mail.com',
  },
})

interface SutTypes {
  sut: RequiredFieldValidator
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidator('field')
  return {
    sut,
  }
}

describe('RequiredFieldValidator', () => {
  test('should return MissingParamsError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validation(makeFakeRequest())
    expect(error).toEqual(new MissingParamError('field'))
  })
})
