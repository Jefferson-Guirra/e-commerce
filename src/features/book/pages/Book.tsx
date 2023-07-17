import { useState, useEffect, useCallback } from 'react'
import styles from './styles.module.css'
import Head from 'next/head'
import { SliderBooks } from '../../../components'
import { Info, Buy } from '../components'
import { IBookProps } from '../@types/IBookProps'
import { GoogleBookApi } from '../../../services/api/google-book/handle-google-book-apit'
import { GoogleBooksFormat } from '../../../services/api/google-book/@types/google-books-format'

const googleBookApi = new GoogleBookApi()

export const Book = ({ book, query, validateFavoriteBooks }: IBookProps) => {
  const [similarBooks, setSimilarBooks] = useState<
    GoogleBooksFormat | undefined
  >(undefined)

  const getSimillarBooks = useCallback(async () => {
    const getBooksByGenres = await googleBookApi.searchByGenres(book.categories)
    if (!getBooksByGenres?.totalItems) {
      const getBooksByTitle = await googleBookApi.searchByTitle(book.title)
      setSimilarBooks(getBooksByTitle)
    } else {
      setSimilarBooks(getBooksByGenres)
    }
  }, [])

  useEffect(() => {
    getSimillarBooks()
  }, [query])
  return (
    <>
      <Head>
        <title>{book.title}</title>
      </Head>
      <section className={styles.aboutBook}>
        <article className={styles.contentBook}>
          <Info
            book={book}
            favoriteBook={validateFavoriteBooks}
            query={query}
          />
          <Buy book={book} />
        </article>
      </section>
      {similarBooks?.totalItems !== 0 && similarBooks && (
        <section className={styles.resultBooks}>
          <h1 className={styles.title}>Títulos Similares</h1>
          <SliderBooks bookList={similarBooks} />
        </section>
      )}
    </>
  )
}
