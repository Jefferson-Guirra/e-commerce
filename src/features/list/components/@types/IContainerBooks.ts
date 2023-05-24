import { IDataBook } from '../../../../services/db/@types'

export interface IContainerBooks {
  books: IDataBook[]
  handleExclude: (id: string) => void
}
