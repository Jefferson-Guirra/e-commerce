import { useState, useEffect, useCallback } from 'react'
import { SEARCH_BOOKS_GENRES } from '../../../services/api/usecases'
import { IBooksApi } from '../../../services/api/@types'
import styles from './styles.module.css'
import Head from 'next/head'
import SliderBooks from '../../../components/SliderBooks'
import { Info, Buy } from '../components'
import {
  ADD_BOOK_DATABASE,
  REMOVE_BOOK_DATABASE,
} from '../../../services/db/usecases/FirebaseFunctions'
import { IBookProps } from '../@types/IBookProps'

export const Book = ({
  book,
  query,
  token,
  validateFavoriteBooks,
}: IBookProps) => {
  const [similarBooks, setSimilarBooks] = useState<IBooksApi | undefined>(
    undefined
  )

  const getSimillarBooks = useCallback(async () => {
    const books = await SEARCH_BOOKS_GENRES(book.categories, book.title).getData
    setSimilarBooks(books)
  }, [])

  const handleAddBookDatabase = async (collection: string) => {
    if (!token) {
      alert('É necessário efetuar o Login')
    } else {
      await ADD_BOOK_DATABASE({
        book: book,
        idBook: query,
        tokenUser: token,
        collection: collection,
      })
    }
  }

  const handleExcludeBookFavoriteList = async (idCollection: string) => {
    REMOVE_BOOK_DATABASE({ id: query + token, idCollection: idCollection })
  }

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
            authors={book.authors}
            avarege={book.avarege}
            description={book.description}
            favoriteBook={validateFavoriteBooks}
            handleAddBookDatabase={handleAddBookDatabase}
            id={book.id}
            subtitle={book.subtitle}
            handleExcludeBookFavoriteList={handleExcludeBookFavoriteList}
            title={book.title}
            query={query}
          />
          <Buy book={book} query={query} token={token} />
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
