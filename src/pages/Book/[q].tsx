import { GetServerSideProps } from 'next'
import { BookContainer } from '../../features'
import { IBookIdApi } from '../../services/api/@types/IBookIdApi'
import { SEARCH_BOOKS_ID } from '../../services/api/usecases'
import { parseCookies } from 'nookies'
import { Api } from '../../utils/api'

interface Props {
  book: string
  query: string
  user: string
  validateFavoriteBooks: boolean
}
type Params = {
  q: string
}
const apiBook = new Api()
const Book = ({ book, query, validateFavoriteBooks }: Props) => {
  const formatBook: IBookIdApi = JSON.parse(book)

  return (
    <BookContainer
      book={formatBook}
      query={query}
      validateFavoriteBooks={validateFavoriteBooks}
    />
  )
}

export default Book

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { q } = ctx.params as Params
  const { literando_accessToken: accessToken } = parseCookies(ctx)

  if (!q) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const bookInfo = await SEARCH_BOOKS_ID(q)

  if (!bookInfo) {
    return {
      redirect: {
        destination: '/NotFound',
        permanent: false,
      },
    }
  }

  const validateFavoriteBooks = async (): Promise<boolean> => {
    if (accessToken) {
      const response = await apiBook.get(
        {
          accessToken: JSON.parse(accessToken),
          bookId: q,
        },
        'booklist/getbook'
      )
      return !!response.body
    } else {
      return false
    }
  }

  return {
    props: {
      book: JSON.stringify(bookInfo),
      query: q,
      validateFavoriteBooks: await validateFavoriteBooks(),
    },
  }
}
