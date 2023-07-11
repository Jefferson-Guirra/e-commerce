import { GoogleBooksFormat } from '../@types/google-books-format'
export interface SearchBooksByGenres {
  searchByGenres: (genres: string[]) => Promise<GoogleBooksFormat | undefined>
}
