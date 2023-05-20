import { GetServerSideProps } from 'next'
import { useEffect, useState, useRef } from 'react'
import { BOOKS_API, GET_BOOKS_PARAMS } from '../../Api'
import { BiBookOpen } from 'react-icons/bi'
import * as C from '../../styles/search'
import Head from 'next/head'
import Link from 'next/link'

type Params = {
  q: string
}

interface Props {
  books: string
  q: string
}
const Search = ({ books, q }: Props) => {
  const bookFormat: BOOKS_API = JSON.parse(books)
  const [bookResults, setBookResults] = useState(bookFormat)
  const title = q.replace(/\w+:/g, '')
  const filter = useRef(0)
  const maxPagination = Math.floor(bookFormat.totalItems / 15)
  const pagination = Array.from(
    { length: Number(maxPagination) },
    (_, i = 1) => i + 1
  )

  const handlePagination = async (value: number) => {
    const newBooks = await GET_BOOKS_PARAMS(q, value * 15, 15)
    filter.current = value
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
      <C.container>
        <div className="title">
          <BiBookOpen size={40} />
          <h1>{title}</h1>
        </div>
        <section className="containerBook">
          {bookResults.books.map((item, index) => (
            <article key={index} className="contentBook">
              <Link href={`/Book/${item.id}`} className="cardBook">
                <img
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h600&source=gbs_api`}
                  alt={`Imagem do Livro ${item.title}`}
                />
                <div className="text">
                  <p>{item.title}</p>
                </div>
                <button>{`A partir de R$ ${item.price}`}</button>
              </Link>
            </article>
          ))}
        </section>

        <C.Pagination>
          <div className="containerPagination">
            {pagination
              .filter(
                (item) => item + 1 > filter.current && item < filter.current + 6
              )
              .map((item) => (
                <button onClick={() => handlePagination(item - 1)} key={item}>
                  {item}
                </button>
              ))}
          </div>
        </C.Pagination>
      </C.container>
    </>
  )
}

export default Search

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q } = query as Params
  const books = (await GET_BOOKS_PARAMS(q, 0, 15)) as BOOKS_API

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
