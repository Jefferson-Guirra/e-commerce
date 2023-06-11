import { BookModel } from '../../models/book/book'
export interface AddBookModel {
  title: string
  description: string
  authors: string[]
  price: number
  language: string
  publisher: string
  publisherDate: string
  imgUrl: string
  date: number
  id: string
  userId: string
  queryDoc: string
}

export interface AddBookList {
  add: (book: BookModel) => Promise<AddBookModel | undefined>
}
