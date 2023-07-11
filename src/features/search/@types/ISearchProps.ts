import { GoogleBooksFormat } from '../../../services/api/google-book/@types/google-books-format'

export interface ISearchProps {
  books: GoogleBooksFormat
  q: string
  handlePagination: (value: number) => void
  page: number
}
