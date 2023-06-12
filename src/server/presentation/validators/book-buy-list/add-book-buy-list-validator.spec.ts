import { BookModel } from '../../../domain/models/book/book'
import { MissingParamError } from '../../errors/missing-params-error'
import { HttpRequest } from '../../protocols/http'
import { AddBookBuyListValidator } from './add-book-buy-list-validator'

const makeFakeRequest = (field: string): HttpRequest => {
  const body: any = {
    accessToken: 'any_token',
    bookId: 'any_id',
    authors: ['any_author'],
    description: 'any_description',
    title: 'any_title',
    imgUrl: 'any_url',
    language: 'any_language',
    price: 0,
    publisher: 'any_publisher',
    publisherDate: 'any_date',
  }

  delete body[field]
  return {
    body,
  }
}
const makeSut = (): AddBookBuyListValidator => new AddBookBuyListValidator()
describe('AddBookBuyList', () => {
  test('should return MissingParamsError if title not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('accessToken'))
    expect(response).toEqual(new MissingParamError('accessToken'))
  })
  test('should return MissingParamsError if bookId not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('bookId'))
    expect(response).toEqual(new MissingParamError('bookId'))
  })
  test('should return MissingParamsError if authors not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('authors'))
    expect(response).toEqual(new MissingParamError('authors'))
  })

  test('should return MissingParamsError if description not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('description'))
    expect(response).toEqual(new MissingParamError('description'))
  })
  test('should return MissingParamsError if title not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('title'))
    expect(response).toEqual(new MissingParamError('title'))
  })
  test('should return MissingParamsError if imgUrl not provided', () => {
    const sut = makeSut()
    const response = sut.validation(makeFakeRequest('imgUrl'))
    expect(response).toEqual(new MissingParamError('imgUrl'))
  })
})
