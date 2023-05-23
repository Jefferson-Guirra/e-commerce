import { DataBook } from '../../../../services/db/usecases/FirebaseFunctions'

export interface IContainerBooks {
  books: DataBook[]
  handleExclude: (id: string) => void
}
