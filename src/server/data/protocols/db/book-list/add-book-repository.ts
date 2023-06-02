import { BookModel } from '../../../../domain/models/book'

export interface AddBookListRepository {
  addBook: (book: BookModel) => Promise<AddBookModel>
}
