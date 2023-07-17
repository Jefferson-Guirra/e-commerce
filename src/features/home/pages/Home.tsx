import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import { IHomeProps } from '../../@types/IHomeProps'
import { HomeBooks, BooksProps } from '../components/HomeBooks'
import { GoogleBooksFormat } from '../../../services/api/google-book/@types/google-books-format'

const handleFormatBook = (items: string) => {
  return JSON.parse(items) as GoogleBooksFormat
}

export function Home({ fictionBooks, dramaBooks, fantasyBooks }: IHomeProps) {
  const BooksFormat: BooksProps[] = [
    { title: 'Ficção', items: handleFormatBook(fictionBooks) },
    { title: 'Drama', items: handleFormatBook(dramaBooks) },
    { title: 'Fantasia', items: handleFormatBook(fantasyBooks) },
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
              width={150}
              height={0}
              style={{ width: '100%', height: '100%' }}
              alt="img book"
              src={`https://books.google.com/books/publisher/content/images/frontcover/${BooksFormat[0].items.items[15].id}?fife=w340-h300&source=gbs_api`}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
            />
          </div>
          <div className={styles.book}>
            <Image
              width={150}
              height={0}
              style={{ width: '100%', height: '100%' }}
              alt="img book"
              src={`https://books.google.com/books/publisher/content/images/frontcover/${BooksFormat[1].items.items[13].id}?fife=w340-h300&source=gbs_api`}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
            />
          </div>
          <div className={styles.book}>
            <Image
              width={150}
              height={0}
              style={{ width: '100%', height: '100%' }}
              alt="img book"
              src={`https://books.google.com/books/publisher/content/images/frontcover/${BooksFormat[2].items.items[9].id}?fife=w340-h300&source=gbs_api`}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
            />
          </div>
        </article>
      </section>
      {BooksFormat.map((book) => (
        <HomeBooks key={book.title} {...book} />
      ))}
    </>
  )
}
