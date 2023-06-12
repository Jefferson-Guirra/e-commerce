import {
  AddBookListRepository,
  AddBookRepositoryModel,
} from '../../../data/protocols/db/book-list/add-book-list-repository'
import { AddBookModel } from '../../../domain/usecases/book-list/add-book-list'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadBookByQueryDocRepository } from '../../../data/protocols/db/book-list/load-book-list-by-query-doc'
import { RemoveBookListRepository } from '../../../data/protocols/db/book-list/remove-book-list'
import { GetBooksListRepository } from '../../../data/protocols/db/book-list/get-books-list-repository'

export class BookListMongoRepository
  implements
    AddBookListRepository,
    LoadBookByQueryDocRepository,
    RemoveBookListRepository,
    GetBooksListRepository
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
  async loadBookByQuery(
    userId: string,
    bookId: string
  ): Promise<AddBookModel | null> {
    const bookCollection = await MongoHelper.getCollection('bookList')
    const book = await bookCollection.findOne({ queryDoc: userId + bookId })
    return book && MongoHelper.Map(book)
  }
  async remove(userId: string, bookId: string): Promise<AddBookModel | null> {
    const bookCollection = await MongoHelper.getCollection('bookList')
    const book = await bookCollection.findOne({ queryDoc: userId + bookId })
    await bookCollection.deleteOne({ queryDoc: userId + bookId })
    return book && MongoHelper.Map(book)
  }

  async getBooks(userId: string): Promise<AddBookModel[] | null> {
    const bookListCollection = await MongoHelper.getCollection('bookList')
    const books = bookListCollection.find({ userId }, { sort: { date: -1 } })
    const booksFormat = await books.toArray()
    return booksFormat.map((item) => MongoHelper.Map(item))
  }
}
