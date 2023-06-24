import { MissingParamError } from '../../errors/missing-params-error'
import { HttpRequest } from '../../protocols/http'
import { DeleteAllBooksBuyListValidator } from './delete-all-books-buy-list-validator'
const makeFakeRequest = (field: string): HttpRequest => {
  const body: any = {
    accessToken: 'any_token',
  }
  delete body[field]
  return {
    body,
  }
}
const makeSut = (): DeleteAllBooksBuyListValidator =>
  new DeleteAllBooksBuyListValidator()
describe('DeleteAllBooksBuyListValidator', () => {
  test('should return MissingParamsError if accessToken not provided', async () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('accessToken'))
    expect(response).toEqual(new MissingParamError('accessToken'))
  })
})

export {}
