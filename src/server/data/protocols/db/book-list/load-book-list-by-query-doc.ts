import { AddBookModel } from '../../../../domain/usecases/add-book-list'

export interface LoadBookByQueryDocRepository {
  loadBookByQuery: (idDoc: string) => Promise<AddBookModel | null>
}
