import {
  AddBookListRepository,
  AddBookRepositoryModel,
} from '../../../data/protocols/db/book-list/add-book-list-repository'
import { AddBookModel } from '../../../domain/usecases/book-list/add-book-list'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadBookByQueryDocRepository } from '../../../data/protocols/db/book-list/load-book-list-by-query-doc'

export class BookListMongoRepository
  implements AddBookListRepository, LoadBookByQueryDocRepository
{
  async addBook(book: AddBookRepositoryModel): Promise<AddBookModel | null> {
    const { id, userId, ...bookfields } = book
    console.error(/^[A-F0-9]+$/i.test(userId + id))
    const bookListCollection = await MongoHelper.getCollection('bookList')
    const result = await bookListCollection.insertOne({
      _id: new ObjectId(),
      queryDoc: userId + id,
      userId,
      ...bookfields,
    })

    const addBook = await bookListCollection.findOne({ _id: result.insertedId })
    return addBook && MongoHelper.Map(addBook)
  }
  async loadBookByQuery(idDoc: string): Promise<AddBookModel | null> {
    const bookCollection = await MongoHelper.getCollection('bookList')
    const book = await bookCollection.findOne({ queryDoc: idDoc })
    return book && MongoHelper.Map(book)
  }
}
