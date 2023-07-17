import { GoogleBooksFormat } from '../@types/google-books-format'

export interface SearchBooksByTitle {
  searchByTitle: (title: string) => Promise<GoogleBooksFormat | undefined>
}
