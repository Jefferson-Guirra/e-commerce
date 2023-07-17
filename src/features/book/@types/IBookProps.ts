import { GoogleBookFormat } from '../../../services/api/google-book/@types/google-book-format'

export interface IBookProps {
  book: GoogleBookFormat
  query: string
  validateFavoriteBooks: boolean
}
