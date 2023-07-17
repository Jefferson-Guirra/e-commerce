import { IContainerBooks } from './@types/IContainerBooks'
import Link from 'next/link'
import styles from './styles.module.css'
import { useState } from 'react'
import { handleTime } from '../../../utils/handle-time'
import Image from 'next/image'
import { ButtonComposite } from '../../../components'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

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
            <Image
              src={book.imgUrl}
              alt={`Imagem do Livro ${book.title}`}
              width={250}
              height={0}
              style={{ width: '100%', height: '100%' }}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
            />
          </Link>
          <div className={styles.info}>
            <div className={styles.titleBook}>
              <p>{book.title}</p>
            </div>
            <p id="author">{book.authors[0]}</p>
            <p>Adicionado: {handleTime(book.date)} </p>
            <ButtonComposite.Action
              disabled={loading}
              className={styles.btn}
              text="Remover"
              onClick={() => handleExclude(book.bookId)}
            >
              <ButtonComposite.Icon
                icon={AiOutlineLoading3Quarters}
                size={21}
                color="#ffa500"
              />
            </ButtonComposite.Action>
          </div>
        </article>
      ))}
    </>
  )
}
