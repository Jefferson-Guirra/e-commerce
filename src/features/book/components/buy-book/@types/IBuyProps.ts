import { IBookIdApi } from '../../../../../services/api/@types/IBookIdApi'
export interface IBuyProps {
  query: string
  token: string
  book: IBookIdApi
}
