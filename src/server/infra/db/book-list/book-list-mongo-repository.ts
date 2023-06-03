import {
  AddBookListRepository,
  AddBookRepositoryModel,
} from '../../../data/protocols/db/book-list/add-book-list-repository'
import { AddBookModel } from '../../../domain/usecases/add-book-list'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class BookListMongoRepository implements AddBookListRepository {
  async addBook(book: AddBookRepositoryModel): Promise<AddBookModel | null> {
    const { id, userId, ...bookfields } = book
    const bookListCollection = await MongoHelper.getCollection('bookList')
    const result = await bookListCollection.insertOne({
      _id: new ObjectId(userId + id),
      ...bookfields,
    })

    const addBook = await bookListCollection.findOne({ _id: result.insertedId })
    return addBook && MongoHelper.Map(addBook)
  }
}
