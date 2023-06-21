import styles from './styles.module.css'
import Link from 'next/link'
import { IBuyBookCardProps } from './@types/IBuyBookCardProps'
import { DataBook } from '../data-book/DataBook'
import Image from 'next/image'
import { useBuyBooksContext } from '../../../../context/books-buy-list/BooksBuyListContext'
import { parseCookies } from 'nookies'

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
  const { handleAddGroupBookId, handleRemoveGroupBookId } = useBuyBooksContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const accessToken = JSON.parse(parseCookies().literando_accessToken)
    if (e.target.checked) {
      handleAddGroupBookId({ accessToken, bookId })
    } else {
      handleRemoveGroupBookId({ accessToken, bookId })
    }
  }
  return (
    <article className={styles.cardContent}>
      <article className={styles['header-card']}>
        <h2>{publisher}</h2>
        <input type="checkbox" onChange={handleChange} />
      </article>
      <article className={styles.infoBook}>
        <Link href={`/Book/${bookId}`} className={styles.img}>
          <Image
            quality={100}
            src={imgUrl}
            height={0}
            priority
            style={{ width: '100%', height: 'auto' }}
            width={100}
            alt={`Imagem do livro ${title}`}
          />
        </Link>
        <DataBook
          amount={amount}
          bookId={bookId}
          language={language}
          pageCount={pageCount}
          price={price}
          title={title}
          publisherDate={publisherDate}
          handleExcludeBuyBookDatabase={handleExcludeBuyBookDatabase}
          handleUpdateAmountBookBuyList={handleUpdateAmountBookBuyList}
        />
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
