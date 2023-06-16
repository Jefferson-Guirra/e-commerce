import { IBookIdApi } from '../../../services/api/@types/IBookIdApi'

export interface IBookProps {
  book: IBookIdApi
  query: string
  validateFavoriteBooks: boolean
  accessToken: string
}
