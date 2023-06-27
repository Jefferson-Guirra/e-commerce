import styles from './styles.module.css'
import { BsFillHeartFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { useState } from 'react'
import { IInfoBook } from './@types/IInfoBook'
import { useEffect } from 'react'
import Image from 'next/image'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { HandleBookDatabase } from '../../../../utils/handle-book-database'

const handleBookDatabase = new HandleBookDatabase()
export const Info = ({ favoriteBook, book, accessToken, query }: IInfoBook) => {
  const [showDescription, setShowDescription] = useState<boolean>(false)
  const [favorite, setFavorite] = useState<null | boolean>(null)
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    setLoading(true)
    await handleBookDatabase.addBook(accessToken, book)
    setFavorite(true)
    setLoading(false)
  }

  const handleExclude = async () => {
    setLoading(true)
    await handleBookDatabase.removeBook(accessToken, book.id)
    setFavorite(false)
    setLoading(false)
  }

  useEffect(() => {
    setFavorite(favoriteBook)
    setShowDescription(false)
  }, [query])

  return (
    <div className={styles.infoBook}>
      <div className={styles.img}>
        <Image
          width={400}
          height={0}
          style={{ width: '100%', height: '100%' }}
          priority
          quality={100}
          src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h400&source=gbs_api`}
          alt={`Imagem do livro ${book.title}`}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
        />
      </div>
      <div className={styles.textBook}>
        <h2>{book.title}</h2>
        <p className={styles.subTitle}>{book.subtitle}</p>
        {!favorite ? (
          <button
            disabled={loading}
            onClick={() => handleAdd()}
            className={`${styles.itemText} ${styles.list}`}
          >
            <BsFillHeartFill size={15} color="#999999" /> Minha lista
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={() => handleExclude()}
            className={`${styles.itemText} ${styles.list}`}
          >
            <BsFillHeartFill size={15} color="#f31" /> Minha lista
          </button>
        )}
        <div>
          <span>{'Autor(a): '}</span>
          {book.authors ? (
            book.authors.map((item, index) => (
              <span
                style={{ color: '#001f3f', fontWeight: 'bold' }}
                key={index}
              >
                {item + '.  '}
              </span>
            ))
          ) : (
            <span style={{ color: '#001f3f', fontWeight: 'bold' }}>
              Desconhecido
            </span>
          )}
        </div>

        <p className={styles.itemText}>
          {book.avarege ? book.avarege.toFixed(1) : '0.0'}
          <AiFillStar size={18} color="#ffa500" />
        </p>
        <p className={styles.itemText}>Descrição:</p>
        <div
          className={
            showDescription
              ? `${styles.showDescription}`
              : `${styles.description}`
          }
          dangerouslySetInnerHTML={{
            __html: book.description,
          }}
        ></div>
        <button
          onClick={() => setShowDescription((state) => !state)}
          className={styles.buttonShowDescription}
        >
          <MdKeyboardArrowDown
            className={
              showDescription
                ? `${styles.rotate} ${styles.arrow}`
                : styles.arrow
            }
            size={22}
          />
        </button>
      </div>
    </div>
  )
}
