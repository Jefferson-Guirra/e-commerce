import { Validate } from './validate'
import { MissingParamError } from '../../errors/missing-params-error'
interface SutTypes {
  sut: Validate
}
const makeSut = (): SutTypes => {
  const sut = new Validate()
  return {
    sut,
  }
}
describe('Signup Controller', () => {
  test('should return InvalidParamsError is username not provided ', async () => {
    const fakeRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    }
    const { sut } = makeSut()
    const response = sut.validation(fakeRequest)
    expect(response).toEqual(new MissingParamError('username'))
  })

  test('should return InvalidParamsError is email not provided ', async () => {
    const fakeRequest = {
      body: {
        username: 'any_username',
        password: 'any_password',
      },
    }
    const { sut } = makeSut()
    const response = sut.validation(fakeRequest)
    expect(response).toEqual(new MissingParamError('email'))
  })

  test('should return InvalidParamsError is password not provided ', async () => {
    const fakeRequest = {
      body: {
        username: 'any_username',
        email: 'any_email@mail.com',
      },
    }
    const { sut } = makeSut()
    const response = sut.validation(fakeRequest)
    expect(response).toEqual(new MissingParamError('password'))
  })
})

export {}
