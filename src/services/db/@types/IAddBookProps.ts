import { IBookApi } from '../../api/@types'
export interface IAddBookProps {
  idBook: string
  tokenUser: string
  book: IBookApi
  collection: string
}
