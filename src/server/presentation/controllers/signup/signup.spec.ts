import { InvalidParamsError } from '../../errors/invalid-params-error'
import { badRequest } from '../../helpers/http'
import { SignupController } from './signup-controller'
interface SutTypes {
  sut: SignupController
}
const makeSut = (): SutTypes => {
  const sut = new SignupController()
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
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(badRequest(new InvalidParamsError('username')))
  })

  test('should return InvalidParamsError is email not provided ', async () => {
    const fakeRequest = {
      body: {
        username: 'any_username',
        password: 'any_password',
      },
    }
    const { sut } = makeSut()
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(badRequest(new InvalidParamsError('email')))
  })

  test('should return InvalidParamsError is password not provided ', async () => {
    const fakeRequest = {
      body: {
        username: 'any_username',
        email: 'any_email@mail.com',
      },
    }
    const { sut } = makeSut()
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(badRequest(new InvalidParamsError('password')))
  })
})
