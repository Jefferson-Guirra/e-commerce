import { IBookApi } from './IBookApi'
export interface IBooksApi {
  totalItems: number
  books: IBookApi[]
}
