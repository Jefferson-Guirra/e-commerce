import { BOOK_ID_SEARCH } from '../../../Api'

export interface IBookProps {
  book: BOOK_ID_SEARCH
  query: string
  validateFavoriteBooks: boolean
  token: string
}
