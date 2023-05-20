import { DataBook } from '../../../../services/helper/FirebaseFunctions'

export interface IContainerBooks {
  books: DataBook[]
  handleExclude: (id: string) => void
}
