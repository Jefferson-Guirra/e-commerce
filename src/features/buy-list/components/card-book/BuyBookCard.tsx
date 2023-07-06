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
    <List.Root>
      <List.HeaderCard title={publisher}>
        <List.Input
          className="checkbox"
          type="checkbox"
          onChange={handleChange}
        />
      </List.HeaderCard>
      <List.Info>
        <List.Link href={`/Book/${bookId}`}>
          <List.Img src={imgUrl} alt={`Imagem do livro ${title}`} />
        </List.Link>
        <List.Container>
          <DataBook
            amount={amount}
            bookId={bookId}
            language={language}
            pageCount={pageCount}
            price={price}
            title={title}
            publisherDate={publisherDate}
          />
          <List.Data
            title={title}
            price={amount * price}
            language={language}
            page={pageCount}
          />
        </List.Container>
      </List.Info>
      <List.Shipping />
    </List.Root>
  )
}
