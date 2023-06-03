import { AddBookListValidator } from './add-book-list-validator'
import { MissingParamError } from '../errors/missing-params-error'
import { BookModel } from '../../domain/models/book'
import { HttpRequest } from '../protocols/http'
interface SutTypes {
  sut: AddBookListValidator
}
const makeSut = (): SutTypes => {
  const sut = new AddBookListValidator()
  return {
    sut,
  }
}
describe('Signup Controller', () => {
  test('should return MissingParamError is title not provided ', async () => {
    const fakeRequest: HttpRequest = {
      body: {
        description: 'any_description',
        authors: ['any_author'],
        price: 0.0,
        language: 'any_language',
        publisher: 'any_publisher',
        publisherDate: 'any_date',
        imgUrl: 'any_url',
        accessToken: 'any_token',
        bookId: 'any_id',
      },
    }
    const { sut } = makeSut()
    const response = sut.validation(fakeRequest)
    expect(response).toEqual(new MissingParamError('title'))
  })

  test('should return MissingParamError is description not provided ', async () => {
    const fakeRequest: HttpRequest = {
      body: {
        title: 'any_title',
        authors: ['any_author'],
        price: 0.0,
        language: 'any_language',
        publisher: 'any_publisher',
        publisherDate: 'any_date',
        imgUrl: 'any_url',
        accessToken: 'any_token',
        bookId: 'any_id',
      },
    }
    const { sut } = makeSut()
    const response = sut.validation(fakeRequest)
    expect(response).toEqual(new MissingParamError('description'))
  })
})
