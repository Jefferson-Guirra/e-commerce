import { LogoutValidate } from './logout-validate'
import { MissingParamError } from '../errors/missing-params-error'
interface SutTypes {
  sut: LogoutValidate
}
const makeSut = (): SutTypes => {
  const sut = new LogoutValidate()
  return {
    sut,
  }
}
describe('Signup Controller', () => {
  test('should return MissingParamsError is accessToken not provided ', async () => {
    const fakeRequest = {
      body: {
        token: 'any_token',
      },
    }
    const { sut } = makeSut()
    const response = sut.validation(fakeRequest)
    expect(response).toEqual(new MissingParamError('accessToken'))
  })
})
