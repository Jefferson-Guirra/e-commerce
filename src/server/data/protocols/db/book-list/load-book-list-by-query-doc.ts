import { AddBookModel } from '../../../../domain/usecases/book-list/add-book-list'

export interface LoadBookByQueryDocRepository {
  loadBookByQuery: (idDoc: string) => Promise<AddBookModel | null>
}
