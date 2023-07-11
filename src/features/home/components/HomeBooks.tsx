import styles from './styles.module.css'
import { SliderBooks } from '../../../components'
import { GoogleBooksFormat } from '../../../services/api/google-book/@types/google-books-format'

export interface BooksProps {
  title: string
  items: GoogleBooksFormat
}
export const HomeBooks = ({ title, items }: BooksProps) => {
  return (
    <section className={styles['books-container']}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <SliderBooks bookList={items} />
    </section>
  )
}
