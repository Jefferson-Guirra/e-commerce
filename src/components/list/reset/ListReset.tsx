import { useState } from 'react'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5'
import { List } from '../../list'
import { AddBuyBookModel } from '../../../@types/buy-book/add-buy-book-model'
import { AddBookModel } from '../../../@types/book/add-book-model'
export interface ResetProps {
  books: AddBookModel[] | AddBuyBookModel[]
  handleReset: (state: boolean) => void
  resetDatabase: (books: Array<AddBookModel | AddBuyBookModel>) => Promise<void>
}

export const ListResetComponent = ({
  handleReset,
  resetDatabase,
  books,
}: ResetProps) => {
  const [bookList, setBookList] = useState<any[]>([])
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    book: AddBuyBookModel | AddBookModel
  ) => {
    if (e.target.checked) {
      setBookList((state) => [...state, book])
    } else {
      setBookList((state) =>
        state.filter(({ bookId }) => bookId !== book.bookId)
      )
    }
  }

  return (
    <article className={styles.container}>
      <List.Button className="close" onClick={() => handleReset(false)}>
        <List.Icon icon={IoClose} size={30} color="#fff" />
      </List.Button>
      <div className={styles.content}>
        {books.map((book) => (
          <div className={styles['card']} key={book.id}>
            <List.Link href={`/Book/${book.id}`}>
              <List.Img
                src={`${book.imgUrl}`}
                alt={`imagem do livro ${book.title}`}
              />
            </List.Link>
            <div className={styles['info-book']}>
              <List.Data
                title={book.title}
                language={book.language}
                page={book.pageCount}
                price={book.price}
              />
              <List.Input
                className="reset-checkbox"
                type="checkbox"
                onChange={(e) => handleChange(e, book)}
              />
            </div>
          </div>
        ))}
      </div>
      <List.Button
        className="reset-all"
        onClick={() => resetDatabase(bookList)}
      >
        {!!bookList.length ? 'desfazer' : 'desfazer todos'}
      </List.Button>
    </article>
  )
}
