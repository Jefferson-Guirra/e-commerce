import { MissingParamError } from '../../errors/missing-params-error'
import { GetBuyBooksValidator } from './get-book-buy-list-validator'

const makeSut = (): GetBuyBooksValidator => new GetBuyBooksValidator()

describe('GetBuyBooksLIstValidator', () => {
  test('should return MissingParamsError if accessToken not provided', () => {
    const sut = makeSut()
    const response = sut.validation({ body: {} })
    expect(response).toEqual(new MissingParamError('accessToken'))
  })
})
