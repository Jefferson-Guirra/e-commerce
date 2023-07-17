import { AddBookModel } from '../../../server/domain/usecases/book-list/add-book-list'

export interface IListProps {
  books: AddBookModel[]
  accessToken: string
}
