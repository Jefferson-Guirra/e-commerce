import React from 'react'
import { GetServerSideProps } from 'next'
import { BookContainer } from '../../features'
import { SEARCH_BOOKS_ID, BOOK_ID_SEARCH } from '../../Api'
import { parseCookies } from 'nookies'
import { GET_BOOK_DATABASE } from '../../services/helper/FirebaseFunctions'

interface Props {
  book: string
  query: string
  user: string
  validateFavoriteBooks: boolean
  token: string
}
type Params = {
  q: string
}

const Book = ({ book, query, token, validateFavoriteBooks }: Props) => {
  const formatBook: BOOK_ID_SEARCH = JSON.parse(book)

  return (
    <BookContainer
      book={formatBook}
      query={query}
      token={token}
      validateFavoriteBooks={validateFavoriteBooks}
    />
  )
}

export default Book

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { q } = ctx.params as Params
  if (!q) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const token: string | null = GET_COOKIE_USER()
  const bookInfo = await SEARCH_BOOKS_ID(q)

  if (!bookInfo) {
    return {
      redirect: {
        destination: '/NotFound',
        permanent: false,
      },
    }
  }

  function GET_COOKIE_USER() {
    const cookies = parseCookies(ctx)
    if (cookies.user) {
      return JSON.parse(cookies.user).token as string
    }
    return null
  }

  const validateFavoriteBooks = token
    ? await GET_BOOK_DATABASE({
        idBook: q,
        collection: 'books',
        tokenUser: token,
      })
    : false

  return {
    props: {
      book: JSON.stringify(bookInfo),
      query: q,
      token: token,
      validateFavoriteBooks,
    },
  }
}
