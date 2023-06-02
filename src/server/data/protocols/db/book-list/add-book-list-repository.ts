import { AddBookModel } from '../../../../domain/usecases/add-book-list'

export interface AddBookRepositoryModel {
  title: string
  description: string
  authors: string[]
  price: number
  language: string
  publisher: string
  publisherDate: string
  imgUrl: string
  date: number
  userId: string
  id: string
}
export interface AddBookListRepository {
  addBook: (book: AddBookRepositoryModel) => Promise<AddBookModel>
}
