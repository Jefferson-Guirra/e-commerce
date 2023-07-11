import { GoogleBook } from '../@types/google-book'
export interface SearchBookById {
  searchById: (bookId: string) => Promise<GoogleBook | any>
}
