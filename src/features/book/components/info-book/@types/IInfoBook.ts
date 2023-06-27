import { IBookIdApi } from '../../../../../services/api/@types'

export interface IInfoBook {
  book: IBookIdApi
  accessToken: string
  query: string
  favoriteBook: boolean | null
}
