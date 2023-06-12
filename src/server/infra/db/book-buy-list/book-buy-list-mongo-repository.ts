import { AddBuyBookRepository } from '../../../data/protocols/db/book-buy-list/add-book-buy-list-repository'
import { LoadBuyBookByQueryDocRepository } from '../../../data/protocols/db/book-buy-list/load-book-buy-list-by-query-doc-repository'
import { UpdateBuyBookRepository } from '../../../data/protocols/db/book-buy-list/update-book-buy-list-repository'
import { BookModel } from '../../../domain/models/book/book'
import { AddBuyBookModel } from '../../../domain/usecases/book-buy-list/add-book-buy-list'
import { MongoHelper } from '../helpers/mongo-helper'

export class BuyBooksListMongoRepository
  implements
    AddBuyBookRepository,
    LoadBuyBookByQueryDocRepository,
    UpdateBuyBookRepository
{
  async addBook(
    book: BookModel,
    userId: string
  ): Promise<AddBuyBookModel | null> {
    const { accessToken, bookId, ...bookFields } = book
    const buyBookCollection = await MongoHelper.getCollection('buyBooksList')
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

  async loadBookByQueryDoc(
    userId: string,
    bookId: string
  ): Promise<AddBuyBookModel | null> {
    const buyBooksCollection = await MongoHelper.getCollection('buyBooksList')
    const book = await buyBooksCollection.findOne({ queryDoc: userId + bookId })
    return book && MongoHelper.Map(book)
  }

  async updateAmount(book: AddBuyBookModel): Promise<AddBuyBookModel | null> {
    const buyBookCollection = await MongoHelper.getCollection('buyBooksList')
    const updateBook = await buyBookCollection.updateOne(
      { queryDoc: book.queryDoc },
      {
        $set: {
          amount: book.amount + 1,
        },
      }
    )
    return await this.loadBookByQueryDoc(book.userId, book.bookId)
  }
}
