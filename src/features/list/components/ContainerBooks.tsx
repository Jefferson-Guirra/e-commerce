import { IContainerBooks } from './@types/IContainerBooks'
import Link from 'next/link'
import styles from './styles.module.css'
import { ITime } from './@types/ITime'
import { Timestamp } from 'firebase/firestore'

const handleTime = (time: ITime) => {
  const timeStamp = new Timestamp(time.seconds, time.nanoseconds)
  const timeFormat = timeStamp.toDate().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
  return timeFormat
}

export const ContainerBooks = ({ books, handleExclude }: IContainerBooks) => {
  return (
    <>
      {books.map((book) => (
        <article key={book.id} className={styles.cardBooks}>
          <Link href={`/Book/${book.id}`}>
            <img
              src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h600&source=gbs_api`}
              alt={`Imagem do Livro ${book.title}`}
            />
          </Link>
          <div className={styles.info}>
            <div className={styles.titleBook}>
              <p>{book.title}</p>
            </div>
            <p id="author">{book.authors[0]}</p>
            <p>Adicionado: {handleTime(book.created)} </p>
            <button
              className={styles.remove}
              onClick={() => handleExclude(book.idDoc)}
            >
              remover
            </button>
          </div>
        </article>
      ))}
    </>
  )
}
