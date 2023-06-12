import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { BookBuyListMongoRepository } from './book-buy-list-mongo-repository'
import { BookModel } from '../../../domain/models/book/book'

const makeFakeRequest = (): BookModel => ({
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
})
const makeSut = (): BookBuyListMongoRepository =>
  new BookBuyListMongoRepository()
let bookBuyListCollection: Collection
describe('BookBuyLIstMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    bookBuyListCollection = await MongoHelper.getCollection('buyBookList')
    await bookBuyListCollection.deleteMany({})
  })
  test('should add book on success', async () => {
    const sut = makeSut()
    let count = await bookBuyListCollection.countDocuments()
    expect(count).toBe(0)
    const book = await sut.addBook(makeFakeRequest(), 'any_user_id')
    count = await bookBuyListCollection.countDocuments()
    expect(count).toBe(1)
    expect(book).toBeTruthy()
    expect(book?.title).toBe('any_title')
    expect(book?.description).toBe('any_description')
    expect(book?.date).toBeTruthy()
    expect(book?.authors).toEqual(['any_author'])
    expect(book?.id).toBeTruthy()
    expect(book?.imgUrl).toBe('any_url')
    expect(book?.language).toBe('any_language')
    expect(book?.price).toBe(0)
    expect(book?.publisher).toBe('any_publisher')
    expect(book?.publisherDate).toBe('any_date')
    expect(book?.queryDoc).toBe('any_user_id' + 'any_id')
    expect(book?.amount).toBe(1)
  })
})
