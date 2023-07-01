import { IBookIdApi } from '../../../../../services/api/@types'

export interface IInfoBook {
  book: IBookIdApi
  query: string
  favoriteBook: boolean | null
}
