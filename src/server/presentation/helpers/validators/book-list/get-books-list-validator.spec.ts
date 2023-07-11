import { MissingParamError } from '../../../errors/missing-params-error'
import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'
import { GetBooksListValidator } from './get-books-list-validator'

const makeSut = (): Validation => new GetBooksListValidator()
describe('GetBooksListValidator', () => {
  test('should return MissingParams error if accessTok not provided', () => {
    const sut = makeSut()
    const fakeRequest: HttpRequest = {
      body: {},
    }
    const error = sut.validation(fakeRequest)
    expect(error).toEqual(new MissingParamError('accessToken'))
  })
})

export {}
