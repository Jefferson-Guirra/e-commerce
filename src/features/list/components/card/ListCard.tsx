import styles from './styles.module.css'
import { Props } from './@types/Props'
import { parseCookies } from 'nookies'
import { List } from '../../../../components'
import { useListContext } from '../../../../context/books-list/BookList'
import { Actions } from '../actions/Actions'

export const ListCard = ({
  publisher,
  title,
  price,
  language,
  pageCount,
  bookId,
  imgUrl,
}: Props) => {
  const { dispatch } = useListContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const accessToken: string = JSON.parse(parseCookies().literando_accessToken)
    if (e.target.checked) {
      dispatch({
        type: 'ADD_SELECTED_BOOK',
        payload: { accessToken, bookId },
      })
    } else {
      dispatch({ type: 'REMOVE_SELECTED_BOOK', payload: { bookId } })
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
          <Actions bookId={bookId} />
          <List.Data
            title={title}
            price={price}
            language={language}
            page={pageCount}
          />
        </article>
      </article>
      <List.Shipping />
    </List.Root>
  )
}
