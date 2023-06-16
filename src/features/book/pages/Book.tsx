import { useState, useEffect, useCallback } from 'react'
import { SEARCH_BOOKS_GENRES } from '../../../services/api/usecases'
import { IBooksApi } from '../../../services/api/@types'
import styles from './styles.module.css'
import Head from 'next/head'
import SliderBooks from '../../../components/SliderBooks'
import { Info, Buy } from '../components'
import { IBookProps } from '../@types/IBookProps'
import { ApiBook } from '../../../utils/book-api'
import { BookModel } from '../../../server/domain/models/book/book'

const apiBook = new ApiBook()
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

  const handleAddBookDatabase = async () => {
    if (!accessToken) {
      alert('É necessário efetuar o Login')
    } else {
      const addBook: BookModel = {
        accessToken,
        authors: book.authors,
        title: book.title,
        bookId: book.id,
        language: book.language,
        publisher: book.publisher,
        publisherDate: book.publisherDate,
        price: book.price,
        description: book.description,
        imgUrl: `https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h400&source=gbs_api`,
      }

      await apiBook.post(addBook, 'booklist/add')
    }
  }

  const handleExcludeBookDatabase = async () => {
    const response = await apiBook.delete(
      { accessToken, idBook: book.id },
      'booklist/remove'
    )
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
            handleExcludeBookDatabase={handleExcludeBookDatabase}
            title={book.title}
            query={query}
          />
          <Buy book={book} query={query} token={accessToken} />
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
