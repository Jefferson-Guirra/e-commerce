import { BOOKS_API } from '../../../services/api/Api'

export interface ISearchProps {
  books: BOOKS_API
  q: string
  handlePagination: (value: number) => void
  page: number
}
