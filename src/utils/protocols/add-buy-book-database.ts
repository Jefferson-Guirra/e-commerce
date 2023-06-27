import { HttpResponse } from '../../server/presentation/protocols/http'
import { IBookIdApi } from '../../services/api/@types'

export interface AddBuyBookDatabase {
  addBook: (accessToken: string, book: IBookIdApi) => Promise<HttpResponse>
}
