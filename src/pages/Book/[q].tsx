import { GetServerSideProps } from 'next'
import { BookContainer } from '../../features'
import { parseCookies } from 'nookies'
import { Api } from '../../utils/api'
import { GoogleBookApi } from '../../services/api/google-book/handle-google-book-apit'
import { GoogleBookFormat } from '../../services/api/google-book/@types/google-book-format'

const googleBookApi = new GoogleBookApi()

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
  const formatBook: GoogleBookFormat = JSON.parse(book)

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

  const book = await googleBookApi.searchById(q)

  if (!book) {
    return {
      redirect: {
        destination: '/NotFound',
        permanent: false,
      },
    }
  }

  const validateFavoriteBooks = async (): Promise<boolean> => {
    if (accessToken) {
      const response = await apiBook.send('get-book', 'POST', {
        accessToken: JSON.parse(accessToken),
        bookId: q,
      })
      return !!response.body
    } else {
      return false
    }
  }

  return {
    props: {
      book: JSON.stringify(book),
      query: q,
      validateFavoriteBooks: await validateFavoriteBooks(),
    },
  }
}
