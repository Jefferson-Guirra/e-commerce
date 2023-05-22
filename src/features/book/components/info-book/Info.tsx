import styles from './styles.module.css'
import { BsFillHeartFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { useState } from 'react'
import { IInfoBook } from '../@types/IInfoBook'
import { useEffect } from 'react'
import Image from 'next/image'
import { MdKeyboardArrowDown } from 'react-icons/md'

export const Info = ({
  title,
  subtitle,
  authors,
  avarege,
  description,
  id,
  handleAddBookDatabase,
  handleExcludeBookFavoriteList,
  favoriteBook,
  query,
}: IInfoBook) => {
  const [showDescription, setShowDescription] = useState<boolean>(false)
  const [favorite, setFavorite] = useState<null | boolean>(null)

  const handleAdd = (collection: string) => {
    handleAddBookDatabase(collection)
    setFavorite(true)
  }
  const handleExclude = (collection: string) => {
    handleExcludeBookFavoriteList(collection)
    setFavorite(false)
  }
  useEffect(() => {
    setFavorite(favoriteBook)
    setShowDescription(false)
  }, [query])

  return (
    <div className={styles.infoBook}>
      <div className={styles.img}>
        <Image
          fill
          priority
          quality={100}
          src={`https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w340-h400&source=gbs_api`}
          alt={`Imagem do livro ${title}`}
        />
      </div>
      <div className={styles.textBook}>
        <h2>{title}</h2>
        <p className={styles.subTitle}>{subtitle}</p>
        {!favorite ? (
          <button
            onClick={() => handleAdd('books')}
            className={`${styles.itemText} ${styles.list}`}
          >
            <BsFillHeartFill size={15} color="#999999" /> Minha lista
          </button>
        ) : (
          <button
            onClick={() => handleExclude('books')}
            className={`${styles.itemText} ${styles.list}`}
          >
            <BsFillHeartFill size={15} color="#f31" /> Minha lista
          </button>
        )}
        <div>
          <span>{'Autor(a): '}</span>
          {authors ? (
            authors.map((item, index) => (
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
          {avarege ? avarege.toFixed(1) : '0.0'}
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
            __html: description,
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
