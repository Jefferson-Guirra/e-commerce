import { GetServerSideProps } from 'next'
import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import { SearchContainer } from '../../features'
import { GoogleBookApi } from '../../services/api/google-book/handle-google-book-apit'
import { GoogleBooksFormat } from '../../services/api/google-book/@types/google-books-format'

type Params = {
  q: string
}

interface Props {
  books: string
  q: string
}

const googleBookApi = new GoogleBookApi()
const Search = ({ books, q }: Props) => {
  const bookFormat: GoogleBooksFormat = JSON.parse(books)
  const [bookResults, setBookResults] = useState(bookFormat)
  const title = q.replace(/\w+:/g, '')
  const page = useRef(0)

  const handlePagination = async (value: number) => {
    const getBooks = await googleBookApi.searchPage(q, value * 15, 15)
    getBooks && setBookResults(getBooks)
    page.current = value
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
  const books = await googleBookApi.searchPage(q, 0, 15)

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
