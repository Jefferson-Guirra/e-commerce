import { IContainerBooks } from './@types/IContainerBooks'
import Link from 'next/link'
import styles from './styles.module.css'
import { useState } from 'react'

const handleTime = (time: number) => {
  const timeStamp = new Date(time)
  const timeFormat = timeStamp.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
  return timeFormat
}

export const ContainerBooks = ({
  books,
  handleExcludeBookDatabase,
}: IContainerBooks) => {
  const [loading, setLoading] = useState(false)
  const handleExclude = async (bookId: string) => {
    setLoading(true)
    await handleExcludeBookDatabase(bookId)
    setLoading(false)
  }
  return (
    <>
      {books.map((book) => (
        <article key={book.id} className={styles.cardBooks}>
          <Link href={`/Book/${book.bookId}`}>
            <img src={book.imgUrl} alt={`Imagem do Livro ${book.title}`} />
          </Link>
          <div className={styles.info}>
            <div className={styles.titleBook}>
              <p>{book.title}</p>
            </div>
            <p id="author">{book.authors[0]}</p>
            <p>Adicionado: {handleTime(book.date)} </p>
            <button
              disabled={loading}
              className={styles.remove}
              onClick={() => handleExclude(book.bookId)}
            >
              remover
            </button>
          </div>
        </article>
      ))}
    </>
  )
}
