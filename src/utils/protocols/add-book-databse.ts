import { IBookIdApi } from '../../services/api/@types'
export interface AddBookDatabase {
  addBook: (accessToken: string, book: IBookIdApi) => Promise<void>
}
