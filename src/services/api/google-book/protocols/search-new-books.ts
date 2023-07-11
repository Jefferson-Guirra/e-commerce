import { GoogleBooksFormat } from '../@types/google-books-format'

export interface SearchNewBooks {
  searchNewBooks: () => Promise<GoogleBooksFormat | undefined>
}
