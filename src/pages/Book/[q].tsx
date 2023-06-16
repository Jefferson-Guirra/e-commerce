import React from 'react'
import { GetServerSideProps } from 'next'
import { BookContainer } from '../../features'
import { IBookIdApi } from '../../services/api/@types/IBookIdApi'
import { SEARCH_BOOKS_ID } from '../../services/api/usecases'
import { parseCookies } from 'nookies'
import { GetBook } from '../../services/db/usecases'
import { ApiBook } from '../../utils/book-api'

interface Props {
  book: string
  query: string
  user: string
  validateFavoriteBooks: boolean
  accessToken: string
}
type Params = {
  q: string
}
const apiBook = new ApiBook()
const Book = ({ book, query, accessToken, validateFavoriteBooks }: Props) => {
  const formatBook: IBookIdApi = JSON.parse(book)

  return (
    <BookContainer
      book={formatBook}
      query={query}
      accessToken={accessToken}
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
  const accessToken: string | null = GET_COOKIE_USER()
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
    const cookies = parseCookies(ctx)
    if (cookies.accessToken) {
      const response = await apiBook.get(
        {
          accessToken: JSON.parse(cookies.accessToken),
          bookId: q,
        },
        'booklist/getbook'
      )
      return !!response.body
    } else {
      return false
    }
  }

  function GET_COOKIE_USER() {
    const cookies = parseCookies(ctx)
    if (cookies.accessToken) {
      return JSON.parse(cookies.accessToken) as string
    } else {
      return null
    }
  }

  return {
    props: {
      book: JSON.stringify(bookInfo),
      query: q,
      accessToken,
      validateFavoriteBooks: await validateFavoriteBooks(),
    },
  }
}
