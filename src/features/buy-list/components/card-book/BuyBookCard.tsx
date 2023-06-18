import React, { useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { MdRemove, MdAdd } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { IBuyBookCardProps } from './@types/IBuyBookCardProps'
import { MouseEventHandler } from 'react'

export const BuyBookCard = ({
  publisher,
  id,
  title,
  amount,
  price,
  publisherDate,
  language,
  pageCount,
  shipping,
  bookId,
  imgUrl,
  handleDefaultRemoveAmountBuyBookListDatabase,
  handleDefaultAddAmountBuyBookListDatabase,
  handleExcludeBuyBookDatabase,
}: IBuyBookCardProps) => {
  const [loading, setLoading] = useState(false)

  const excludeBuyBook = async (bookId: string) => {
    try {
      setLoading(true)
      const deleteBook = await handleExcludeBuyBookDatabase(bookId)
    } finally {
      setLoading(false)
    }
  }
  const handleDefaultAddAmountBook = async (bookId: string) => {
    try {
      setLoading(true)
      await handleDefaultAddAmountBuyBookListDatabase(bookId)
    } finally {
      setLoading(false)
    }
  }

  const handleDefaultRemoveAmountBook = async (bookId: string) => {
    try {
      setLoading(true)
      await handleDefaultRemoveAmountBuyBookListDatabase(bookId)
    } finally {
      setLoading(false)
    }
  }
  return (
    <article className={styles.cardContent}>
      <h2>{publisher}</h2>
      <article className={styles.infoBook}>
        <Link href={`/Book/${id}`} className={styles.img}>
          <img src={imgUrl} height="150px" alt={`Imagem do livro ${title}`} />
        </Link>
        <div className={styles.dataBook}>
          <div className={styles.header}>
            <div className={styles.bookTitle}>
              <p>{title}</p>
            </div>
            <div className={styles.actions}>
              <button disabled={loading} className={styles.amount}>
                <MdRemove
                  onClick={() => handleDefaultRemoveAmountBook(bookId)}
                  size={20}
                  color="#363636"
                />
                <p>{amount}</p>
                <MdAdd
                  onClick={() => handleDefaultAddAmountBook(bookId)}
                  size={20}
                  color="#363636"
                />
              </button>
              <p>
                R$: {(price * amount).toFixed(2).toString().replace('.', ',')}
              </p>
              <button
                disabled={loading}
                className={styles.btnExclude}
                onClick={() => excludeBuyBook(bookId)}
              >
                <IoClose size={20} color="#363636" />
              </button>
            </div>
          </div>
          <div className={styles.textInfo}>
            <p>Ano: </p>
            <span>{publisherDate.replace(/\-\d+/g, '')}</span>
          </div>
          <div className={styles.textInfo}>
            <p className={styles.textInfo}>Páginas: </p>
            <span>{pageCount}</span>
          </div>
          <div className={styles.textInfo}>
            <p>Idioma: </p>
            <span>{language}</span>
          </div>
        </div>
      </article>

      <article className={styles.buyInfoCard}>
        <h2>Entrega Básica</h2>
        <div className={styles.infoBuy}>
          <span id="free">Frete grátis </span>
          <p>neste vendedor nas compras a partir de</p>
          <span> R$ {shipping.toFixed(2).toString().replace('.', ',')}</span>
        </div>
      </article>
    </article>
  )
}
