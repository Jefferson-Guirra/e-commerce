import { MissingParamError } from '../../../errors/missing-params-error'
import { HttpRequest } from '../../../protocols/http'
import { GetBookListValidator } from './get-book-list-validator'

const makeFakeRequest = (field: string): HttpRequest => {
  const body: any = {
    accessToken: 'any_token',
    bookId: 'any_book_id',
  }
  delete body[field]
  return {
    body,
  }
}
const makeSut = (): GetBookListValidator => new GetBookListValidator()
describe('GetBookListValidator', () => {
  test('should return MissingParamsError if accessToken not provided', async () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('accessToken'))
    expect(response).toEqual(new MissingParamError('accessToken'))
  })

  test('should return MissingParamsError if bookId not provided', async () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('bookId'))
    expect(response).toEqual(new MissingParamError('bookId'))
  })
})

export {}
