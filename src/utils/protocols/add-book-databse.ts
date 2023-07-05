import { IBookIdApi } from '../../services/api/@types'
import { HttpResponse } from '../../server/presentation/protocols/http'
export interface AddBookDatabase {
  addBook: (accessToken: string, book: IBookIdApi) => Promise<HttpResponse>
}
