import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { MdRemove, MdAdd } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { IBuyBookCardProps } from './@types/IBuyBookCardProps'

export const BuyBookCard = ({
  publisher,
  id,
  title,
  qtd,
  price,
  publisherDate,
  language,
  pageCount,
  shipping,
  idDoc,
  handleNext,
  handlePrev,
  handleExclude,
}: IBuyBookCardProps) => {
  return (
    <article className={styles.cardContent}>
      <h2>{publisher}</h2>
      <article className={styles.infoBook}>
        <Link href={`/Book/${id}`} className={styles.img}>
          <img
            src={`https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w340-h600&source=gbs_api`}
            height="150px"
            alt={`Imagem do livro ${title}`}
          />
        </Link>
        <div className={styles.dataBook}>
          <div className={styles.header}>
            <div className={styles.bookTitle}>
              <p>{title}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.qtd}>
                <MdRemove
                  onClick={() => handlePrev(idDoc)}
                  size={20}
                  color="#363636"
                />
                <p>{qtd}</p>
                <MdAdd
                  onClick={() => handleNext(idDoc)}
                  size={20}
                  color="#363636"
                />
              </button>
              <p>R$: {(price * qtd).toFixed(2).toString().replace('.', ',')}</p>
              <button
                className={styles.btnExclude}
                onClick={() => handleExclude(idDoc)}
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
