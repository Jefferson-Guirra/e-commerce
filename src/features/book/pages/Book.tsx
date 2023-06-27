import { useState, useEffect, useCallback } from 'react'
import { SEARCH_BOOKS_GENRES } from '../../../services/api/usecases'
import { IBooksApi } from '../../../services/api/@types'
import styles from './styles.module.css'
import Head from 'next/head'
import { SliderBooks } from '../../../components'
import { Info, Buy } from '../components'
import { IBookProps } from '../@types/IBookProps'
import { Api } from '../../../utils/api'
import { BookModel } from '../../../server/domain/models/book/book'

const apiBook = new Api()
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

  const handleAddBuyBookDatabase = async () => {
    const { id, ...booksFields } = book
    const addBuyBook: BookModel = {
      accessToken,
      bookId: id,
      imgUrl: `https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h400&source=gbs_api`,
      ...booksFields,
    }
    const response = await apiBook.post(addBuyBook, 'buybooklist/add')
    return response
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
            accessToken={accessToken}
            book={book}
            favoriteBook={validateFavoriteBooks}
            query={query}
          />
          <Buy
            book={book}
            handleAddBuyBookDatabase={handleAddBuyBookDatabase}
          />
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
