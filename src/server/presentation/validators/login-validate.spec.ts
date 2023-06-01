import { LoginValidate } from './login-validate'
import { MissingParamError } from '../errors/missing-params-error'
interface SutTypes {
  sut: LoginValidate
}
const makeSut = (): SutTypes => {
  const sut = new LoginValidate()
  return {
    sut,
  }
}
describe('Signup Controller', () => {
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
})