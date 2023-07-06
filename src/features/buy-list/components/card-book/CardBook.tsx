import styles from './styles.module.css'
import { IBuyBookCardProps } from './@types/IBuyBookCardProps'
import { Actions } from '../actions-book/Actions'
import { parseCookies } from 'nookies'
import { useBuyContext } from '../../../../context/books-buy-list/BuyBookContext'
import { List } from '../../../../components'

export const CardBook = ({
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
      <article className={styles.container}>
        <List.Link href={`/Book/${bookId}`}>
          <List.Img src={imgUrl} alt={`Imagem do livro ${title}`} />
        </List.Link>
        <article className={styles.content}>
          <Actions amount={amount} bookId={bookId} />
          <List.Data
            title={title}
            price={amount * price}
            language={language}
            page={pageCount}
          />
        </article>
      </article>
      <List.Shipping />
    </List.Root>
  )
}
