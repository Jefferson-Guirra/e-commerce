import { GoogleBooksFormat } from '../@types/google-books-format'

export interface SearchRelevanceBooks {
  searchByRelevance: () => Promise<GoogleBooksFormat | undefined>
}
