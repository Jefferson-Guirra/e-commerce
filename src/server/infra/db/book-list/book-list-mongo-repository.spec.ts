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
  userId: 'any_id',
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
    bookCollection.deleteMany({})
  })
  test('should add book in BookLIstMongoRepository', async () => {
    const sut = makeSut()
    await sut.addBook(makeFakeRequest())
    const count = await bookCollection.countDocuments()
    expect(count).toBe(1)
  })
})
