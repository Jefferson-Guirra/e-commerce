import { MissingParamError } from '../../errors/missing-params-error'
import { HttpRequest } from '../../protocols/http'
import { RemoveBookListValidator } from './remove-book-list-validator'

const makeFakeRequest = (property: string): HttpRequest => {
  const body: any = {
    accessToken: 'any_token',
    idBook: 'any_id',
  }
  delete body[property]
  return {
    body,
  }
}
const makeSut = (): RemoveBookListValidator => new RemoveBookListValidator()
describe('RemoveBookListValidator', () => {
  test('should return MissingParamsError if accessToken not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('accessToken'))
    expect(response).toEqual(new MissingParamError('accessToken'))
  })
})
