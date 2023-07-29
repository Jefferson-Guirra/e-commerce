import { HttpResponse } from '../../@types/request/http'
import { GoogleBookFormat } from '../../services/api/google-book/@types/google-book-format'
export interface AddBookDatabase {
  addBook: (
    accessToken: string,
    book: GoogleBookFormat
  ) => Promise<HttpResponse>
}
