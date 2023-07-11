import { BiBookOpen } from 'react-icons/bi'
import styles from './styles.module.css'
import Link from 'next/link'
import { ISearchProps } from '../@types/ISearchProps'
import Image from 'next/image'

export const Search = ({ books, q, handlePagination, page }: ISearchProps) => {
  const title = q.replace(/\w+:/g, '')
  const maxPagination = Math.floor(books.totalItems / 15)
  const pagination = Array.from(
    { length: Number(maxPagination) },
    (_, i = 1) => i + 1
  )

  return (
    <>
      <div className="title">
        <BiBookOpen size={40} />
        <h1>{title}</h1>
      </div>
      <section className={styles.containerBook}>
        {books.items.map((item, index) => (
          <article key={index} className={styles.contentBook}>
            <Link href={`/Book/${item.id}`} className={styles.cardBook}>
              <div className={styles.img}>
                <Image
                  fill
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h600&source=gbs_api`}
                  alt={`Imagem do Livro ${item.title}`}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
                />
              </div>
              <div className={styles.text}>
                <p>{item.title}</p>
              </div>
              <button>{`A partir de R$ ${item.price}`}</button>
            </Link>
          </article>
        ))}
      </section>

      <section className={styles.pagination}>
        <div className={styles.containerPagination}>
          {pagination
            .filter((item) => item + 1 > page && item < page + 6)
            .map((item) => (
              <button onClick={() => handlePagination(item - 1)} key={item}>
                {item}
              </button>
            ))}
        </div>
      </section>
    </>
  )
}
