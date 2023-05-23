import React from 'react'
import styles from './styles.module.css'
import { IBooksApi } from '../../../services/api/@types'
import Image from 'next/image'
import { IHomeProps } from '../../@types/IHomeProps'
import { HomeBooks, IHomeBooksProps } from '../components/HomeBooks'

const handleFormatBook = (bookList: string) => {
  return JSON.parse(bookList) as IBooksApi
}

export function Home({ fictionBooks, dramaBooks, fantasyBooks }: IHomeProps) {
  const BooksFormat: IHomeBooksProps[] = [
    { title: 'Ficção', bookList: handleFormatBook(fictionBooks) },
    { title: 'Drama', bookList: handleFormatBook(dramaBooks) },
    { title: 'Fantasia', bookList: handleFormatBook(fantasyBooks) },
  ]
  return (
    <>
      <section className={styles.presentation}>
        <article className={styles.content}>
          <div className={styles.title}>
            <h2>Literando só aqui você</h2>
            <h2>encontra os melhores Livros</h2>
          </div>
        </article>
        <article className={styles.books}>
          <div className={styles.book}>
            <Image
              fill
              alt="img book"
              src={`https://books.google.com/books/publisher/content/images/frontcover/${BooksFormat[0].bookList.books[15].id}?fife=w340-h300&source=gbs_api`}
            />
          </div>
          <div className={styles.book}>
            <Image
              fill
              alt="img book"
              src={`https://books.google.com/books/publisher/content/images/frontcover/${BooksFormat[1].bookList.books[13].id}?fife=w340-h300&source=gbs_api`}
            />
          </div>
          <div className={styles.book}>
            <Image
              fill
              alt="img book"
              src={`https://books.google.com/books/publisher/content/images/frontcover/${BooksFormat[2].bookList.books[9].id}?fife=w340-h300&source=gbs_api`}
            />
          </div>
        </article>
      </section>
      {BooksFormat.map((book) => (
        <HomeBooks
          key={book.title}
          title={book.title}
          bookList={book.bookList}
        />
      ))}
    </>
  )
}
