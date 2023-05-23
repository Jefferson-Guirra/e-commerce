import { IBooksApi } from '../../../services/api/@types'

export interface ISearchProps {
  books: IBooksApi
  q: string
  handlePagination: (value: number) => void
  page: number
}
