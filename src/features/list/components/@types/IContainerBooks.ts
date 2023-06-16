import { AddBookModel } from '../../../../server/domain/usecases/book-list/add-book-list'

export interface IContainerBooks {
  books: AddBookModel[]
  handleExclude: (id: string) => void
}
