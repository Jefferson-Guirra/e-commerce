import { useState, useEffect, useCallback } from 'react'
import { SEARCH_BOOKS_GENRES } from '../../../services/api/usecases'
import { IBooksApi } from '../../../services/api/@types'
import styles from './styles.module.css'
import Head from 'next/head'
import { SliderBooks } from '../../../components'
import { Info, Buy } from '../components'
import { IBookProps } from '../@types/IBookProps'

export const Book = ({
  book,
  query,
  accessToken,
  validateFavoriteBooks,
}: IBookProps) => {
  const [similarBooks, setSimilarBooks] = useState<IBooksApi | undefined>(
    undefined
  )

  const getSimillarBooks = useCallback(async () => {
    const books = await SEARCH_BOOKS_GENRES(book.categories, book.title).getData
    setSimilarBooks(books)
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
            accessToken={accessToken}
            book={book}
            favoriteBook={validateFavoriteBooks}
            query={query}
          />
          <Buy book={book} accessToken={accessToken} />
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
