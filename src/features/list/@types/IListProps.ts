import { AddBookModel } from '../../../@types/book/add-book-model'

export interface IListProps {
  books: AddBookModel[]
  accessToken: string
}
