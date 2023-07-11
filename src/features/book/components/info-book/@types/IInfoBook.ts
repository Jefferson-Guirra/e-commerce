import { GoogleBookFormat } from '../../../../../services/api/google-book/@types/google-book-format'

export interface IInfoBook {
  book: GoogleBookFormat
  query: string
  favoriteBook: boolean | null
}
