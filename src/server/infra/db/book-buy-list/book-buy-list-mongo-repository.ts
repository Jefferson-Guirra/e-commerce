import { AddBuyBookRepository } from '../../../data/protocols/db/book-buy-list/add-book-buy-list-repository'
import { BookModel } from '../../../domain/models/book/book'
import { AddBuyBookModel } from '../../../domain/usecases/book-buy-list/add-book-buy-list'
import { MongoHelper } from '../helpers/mongo-helper'

export class BookBuyListMongoRepository implements AddBuyBookRepository {
  async addBook(
    book: BookModel,
    userId: string
  ): Promise<AddBuyBookModel | null> {
    const { accessToken, bookId, ...bookFields } = book
    const buyBookCollection = await MongoHelper.getCollection('buyBookList')
    const result = await buyBookCollection.insertOne({
      queryDoc: userId + bookId,
      bookId,
      date: new Date().getTime(),
      amount: 1,
      ...bookFields,
    })
    const addBook = await buyBookCollection.findOne({ _id: result.insertedId })
    return addBook && MongoHelper.Map(addBook)
  }
}
