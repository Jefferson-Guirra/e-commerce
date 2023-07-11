import { AddBookListValidator } from './add-book-list-validator'
import { MissingParamError } from '../../../errors/missing-params-error'
import { HttpRequest } from '../../../protocols/http'

interface SutTypes {
  sut: AddBookListValidator
}
const makeSut = (): SutTypes => {
  const sut = new AddBookListValidator()
  return {
    sut,
  }
}

const makeFakeRequest = (id: string): HttpRequest => {
  const book: any = {
    title: 'any_title',
    description: 'any_description',
    pageCount: 1,
    authors: ['any_author'],
    price: Number(0.0),
    language: 'any_language',
    publisher: 'any_publisher',
    publisherDate: 'any_date',
    imgUrl: 'any_url',
    accessToken: 'any_token',

    bookId: 'any_id',
  }

  delete book[id]

  return {
    body: book,
  }
}
describe('Signup Controller', () => {
  test('should return MissingParamError is title not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('title'))
    expect(response).toEqual(new MissingParamError('title'))
  })

  test('should return MissingParamError is description not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('description'))
    expect(response).toEqual(new MissingParamError('description'))
  })

  test('should return MissingParamError is authors not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('authors'))
    expect(response).toEqual(new MissingParamError('authors'))
  })

  test('should return MissingParamError is price not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('price'))
    expect(response).toEqual(new MissingParamError('price'))
  })

  test('should return MissingParamError is language not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('language'))
    expect(response).toEqual(new MissingParamError('language'))
  })

  test('should return MissingParamError is publisher not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('publisher'))
    expect(response).toEqual(new MissingParamError('publisher'))
  })

  test('should return MissingParamError is publisherDate not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('publisherDate'))
    expect(response).toEqual(new MissingParamError('publisherDate'))
  })

  test('should return MissingParamError is imgUrl not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('imgUrl'))
    expect(response).toEqual(new MissingParamError('imgUrl'))
  })

  test('should return MissingParamError is accessToken not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('accessToken'))
    expect(response).toEqual(new MissingParamError('accessToken'))
  })

  test('should return MissingParamError is bookId not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('bookId'))
    expect(response).toEqual(new MissingParamError('bookId'))
  })

  test('should return MissingParamError is pageCount not provided ', async () => {
    const { sut } = makeSut()
    const response = sut.validation(makeFakeRequest('pageCount'))
    expect(response).toEqual(new MissingParamError('pageCount'))
  })
})

export {}
