import { GetServerSideProps } from 'next'
import { useEffect, useState, useRef } from 'react'
import { GET_BOOKS_PARAMS } from '../../services/api/usecases'
import { IBooksApi } from '../../services/api/@types'
import Head from 'next/head'
import { SearchContainer } from '../../features'

type Params = {
  q: string
}

interface Props {
  books: string
  q: string
}
const Search = ({ books, q }: Props) => {
  const bookFormat: IBooksApi = JSON.parse(books)
  const [bookResults, setBookResults] = useState(bookFormat)
  const title = q.replace(/\w+:/g, '')
  const page = useRef(0)

  const handlePagination = async (value: number) => {
    const newBooks = await GET_BOOKS_PARAMS(q, value * 15, 15)
    page.current = value
    setBookResults(newBooks)
  }

  useEffect(() => {
    setBookResults(bookFormat)
  }, [q])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SearchContainer
        q={q}
        books={bookResults}
        page={page.current}
        handlePagination={handlePagination}
      />
    </>
  )
}

export default Search

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q } = query as Params
  const books = (await GET_BOOKS_PARAMS(q, 0, 15)) as IBooksApi

  if (books?.totalItems === 0) {
    return {
      redirect: {
        destination: '/NotFound',
        permanent: false,
      },
    }
  }
  return {
    props: {
      books: JSON.stringify(books),
      q,
    },
  }
}
