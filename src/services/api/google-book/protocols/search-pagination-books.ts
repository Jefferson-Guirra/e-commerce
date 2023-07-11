import { GoogleBooksFormat } from '../@types/google-books-format'

export interface SearchPaginationBooks {
  searchPage: (
    params: string,
    index: number,
    maxResults: number
  ) => Promise<GoogleBooksFormat | undefined>
}
