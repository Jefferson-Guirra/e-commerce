import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { BuyBooksListMongoRepository } from './book-buy-list-mongo-repository'
import { BookModel } from '../../../domain/models/book/book'
import { AddBuyBookModel } from '../../../domain/usecases/book-buy-list/add-book-buy-list'

const makeFakeAddBuyBook = () => ({
  authors: ['any_author'],
  description: 'any_description',
  title: 'any_title',
  imgUrl: 'any_url',
  language: 'any_language',
  price: 0,
  amount: 1,
  bookId: 'any_id',
  date: new Date().getTime(),
  userId: 'any_user_id',
  queryDoc: 'any_user_id' + 'any_id',
  publisher: 'any_publisher',
  publisherDate: 'any_date',
})
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
const makeSut = (): BuyBooksListMongoRepository =>
  new BuyBooksListMongoRepository()
let bookBuyListCollection: Collection
describe('BookBuyLIstMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    bookBuyListCollection = await MongoHelper.getCollection('buyBooksList')
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

  test('should return a book if LoadBookByQueryDoc success ', async () => {
    const sut = makeSut()
    const result = await bookBuyListCollection.insertOne(makeFakeAddBuyBook())
    const addBook = await bookBuyListCollection.findOne({
      _id: result.insertedId,
    })
    const book = await sut.loadBookByQueryDoc(addBook?.userId, addBook?.bookId)
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

  test('should return null if LoadBookByQueryDoc return null', async () => {
    const sut = makeSut()
    const book = await sut.loadBookByQueryDoc('any_user_id', 'any_id')
    expect(book).toBeFalsy()
  })

  test('should return book if UpdateAmountBook success', async () => {
    const sut = makeSut()
    const result = await bookBuyListCollection.insertOne(makeFakeAddBuyBook())
    const addBook = (await bookBuyListCollection.findOne({
      _id: result.insertedId,
    })) as any
    expect(addBook?.amount).toBe(1)
    const book = await sut.updateAmount(addBook)
    expect(book?.amount).toEqual(2)
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
  })

  test('should return book if removeAmountBook success', async () => {
    const sut = makeSut()
    const result = await bookBuyListCollection.insertOne(makeFakeAddBuyBook())
    const book: any = await bookBuyListCollection.findOne({
      _id: result.insertedId,
    })
    const removeBookAmount = await sut.removeAmountBook(book)
    expect(removeBookAmount).toBeTruthy()
    expect(removeBookAmount?.amount).toEqual(0)
    expect(removeBookAmount).toBeTruthy()
    expect(removeBookAmount?.title).toBe('any_title')
    expect(removeBookAmount?.description).toBe('any_description')
    expect(removeBookAmount?.date).toBeTruthy()
    expect(removeBookAmount?.authors).toEqual(['any_author'])
    expect(removeBookAmount?.id).toBeTruthy()
    expect(removeBookAmount?.imgUrl).toBe('any_url')
    expect(removeBookAmount?.language).toBe('any_language')
    expect(removeBookAmount?.price).toBe(0)
    expect(removeBookAmount?.publisher).toBe('any_publisher')
    expect(removeBookAmount?.publisherDate).toBe('any_date')
    expect(removeBookAmount?.queryDoc).toBe('any_user_id' + 'any_id')
  })
})
