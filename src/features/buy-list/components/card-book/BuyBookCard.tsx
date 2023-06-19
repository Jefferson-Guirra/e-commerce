import { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { MdRemove, MdAdd } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { IBuyBookCardProps } from './@types/IBuyBookCardProps'

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
  handleUpdateAmountBookBuyList,
  handleExcludeBuyBookDatabase,
}: IBuyBookCardProps) => {
  const [loading, setLoading] = useState(false)
  const [amountBook, setAmountBook] = useState(amount)

  const handleExcludeBuyBook = async (bookId: string) => {
    try {
      setLoading(true)
      const deleteBook = await handleExcludeBuyBookDatabase(bookId)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateAmountBook = async (bookId: string, value: number) => {
    const validate = value > 0 && value !== amount
    if (validate) {
      try {
        setLoading(true)
        await handleUpdateAmountBookBuyList(bookId, value)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleUpdateAmountBook(bookId, amountBook)
  }

  useEffect(() => {
    setAmountBook(amount)
  }, [amount])

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
              <form
                onSubmit={(e) => handleSubmit(e)}
                onBlur={() => handleUpdateAmountBook(bookId, amountBook)}
                className={styles['amount-form']}
              >
                <button disabled={loading}>
                  <MdRemove
                    onClick={() =>
                      handleUpdateAmountBook(bookId, (amountBook - 1) as number)
                    }
                    size={20}
                    color="#363636"
                  />
                </button>
                <input
                  type="number"
                  min="1"
                  value={amountBook}
                  onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                    setAmountBook(Number(target.value))
                  }
                />
                <button disabled={loading}>
                  <MdAdd
                    onClick={() =>
                      handleUpdateAmountBook(bookId, (amountBook + 1) as number)
                    }
                    size={20}
                    color="#363636"
                  />
                </button>
              </form>
              <p>
                R$: {(price * amount).toFixed(2).toString().replace('.', ',')}
              </p>
              <button
                disabled={loading}
                className={styles.btnExclude}
                onClick={() => handleExcludeBuyBook(bookId)}
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
