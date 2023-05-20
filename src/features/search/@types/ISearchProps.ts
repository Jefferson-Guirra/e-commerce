import { BOOKS_API } from '../../../Api'

export interface ISearchProps {
  books: BOOKS_API
  q: string
  handlePagination: (value: number) => void
  page: number
}
