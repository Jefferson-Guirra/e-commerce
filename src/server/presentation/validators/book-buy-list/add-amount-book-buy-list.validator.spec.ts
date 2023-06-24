import { MissingParamError } from '../../errors/missing-params-error'
import { HttpRequest } from '../../protocols/http'
import { UpdateAmountBookBuyListValidator } from './add-amount-book-buy-list-validator'

const makeFakeRequest = (field: string): HttpRequest => {
  const body: any = {
    accessToken: 'any_token',
    bookId: 'any_book_id',
    amount: 1,
  }
  delete body[field]
  return {
    body,
  }
}

const makeSut = (): UpdateAmountBookBuyListValidator =>
  new UpdateAmountBookBuyListValidator()

describe('AddAmountBookBuyListValidator', () => {
  test('should return MissingParamsError if accessToken not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('accessToken'))
    expect(response).toEqual(new MissingParamError('accessToken'))
  })

  test('should return MissingParamsError if bookId not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('bookId'))
    expect(response).toEqual(new MissingParamError('bookId'))
  })

  test('should return MissingParamsError if amount not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('amount'))
    expect(response).toEqual(new MissingParamError('amount'))
  })
})

export {}
