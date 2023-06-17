import { MissingParamError } from '../../errors/missing-params-error'
import { HttpRequest } from '../../protocols/http'
import { AddAmountBookBuyListValidator } from './add-amount-book-buy-list-validator'

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

const makeSut = (): AddAmountBookBuyListValidator =>
  new AddAmountBookBuyListValidator()

describe('AddAmountBookBuyListValidator', () => {
  test('should return MissingParamsError if accessToken not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('accessToken'))
    expect(response).toEqual(new MissingParamError('accessToken'))
  })
})
