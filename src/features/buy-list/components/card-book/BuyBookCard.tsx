import styles from './styles.module.css'
import Link from 'next/link'
import { IBuyBookCardProps } from './@types/IBuyBookCardProps'
import { DataBook } from '../data-book/DataBook'
import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'
import { List } from '../../../../components'

const generateRandomNumberInterval = (min: number, max: number) => {
  const number = Math.floor(Math.random() * (max - min + 1) + min)
  return number.toFixed(2).toString().replace('.', ',')
}
export const BuyBookCard = ({
  publisher,
  id,
  title,
  amount,
  price,
  publisherDate,
  language,
  pageCount,
  bookId,
  imgUrl,
}: IBuyBookCardProps) => {
  const { dispatch } = useBuyContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const accessToken = JSON.parse(parseCookies().literando_accessToken)
    if (e.target.checked) {
      dispatch({
        type: 'ADD_SELECT_BOOK',
        payload: { accessToken, bookId, amount, price },
      })
    } else {
      dispatch({ type: 'REMOVE_SELECT_BOOK', payload: { bookId } })
    }
  }
  return (
    <article className={styles.cardContent}>
      <List.HeaderCard title={publisher}>
        <List.Input
          className="checkbox"
          type="checkbox"
          onChange={handleChange}
        />
      </List.HeaderCard>
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
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
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
        />
      </article>

      <article className={styles.buyInfoCard}>
        <h3>Entrega Básica</h3>
        <div className={styles.infoBuy}>
          <span id="free">Frete grátis </span>
          <p>neste vendedor nas compras a partir de</p>
          <span> R$ {generateRandomNumberInterval(60, 150)}</span>
        </div>
      </article>
    </article>
  )
}
