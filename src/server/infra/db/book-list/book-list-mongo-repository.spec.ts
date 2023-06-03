import { Collection } from 'mongodb'
import { BookListMongoRepository } from './book-list-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { AddBookRepositoryModel } from '../../../data/protocols/db/book-list/add-book-list-repository'

const makeFakeRequest = (): AddBookRepositoryModel => ({
  title: 'any_title',
  description: 'any_description',
  authors: ['any_author'],
  price: 0.0,
  language: 'any_language',
  publisher: 'any_publisher',
  publisherDate: 'any_date',
  date: 123456,
  imgUrl: 'any_url',
  id: 'any_id',
  userId: 'any_user_id',
})
const makeSut = () => new BookListMongoRepository()
let bookCollection: Collection

describe('BookListMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    bookCollection = await MongoHelper.getCollection('bookList')
    await bookCollection.deleteMany({})
  })
  test('should add book in BookLIstMongoRepository if addBook success', async () => {
    const sut = makeSut()
    await sut.addBook(makeFakeRequest())
    const count = await bookCollection.countDocuments()
    expect(count).toBe(1)
  })

  test('should return book if addBook success', async () => {
    const sut = makeSut()
    const book = await sut.addBook(makeFakeRequest())
    expect(book).toBeTruthy()
    expect(book?.title).toBe('any_title'),
      expect(book?.description).toBe('any_description'),
      expect(book?.authors).toEqual(['any_author']),
      expect(book?.price).toBe(0.0),
      expect(book?.language).toBe('any_language'),
      expect(book?.publisher).toBe('any_publisher'),
      expect(book?.publisherDate).toBe('any_date'),
      expect(book?.date).toBe(123456),
      expect(book?.imgUrl).toBe('any_url'),
      expect(book?.id).toBeTruthy()
    expect(book?.queryDoc).toBe('any_user_idany_id')
  })
})
