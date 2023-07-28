import { AddBookModel } from '../../../../@types/book/add-book-model'

export interface IContainerBooks {
  books: AddBookModel[]
  handleExcludeBookDatabase: (id: string) => Promise<void>
}
