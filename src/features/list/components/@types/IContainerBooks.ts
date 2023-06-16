import { AddBookModel } from '../../../../server/domain/usecases/book-list/add-book-list'

export interface IContainerBooks {
  books: AddBookModel[]
  handleExcludeBookDatabase: (id: string) => Promise<void>
}
