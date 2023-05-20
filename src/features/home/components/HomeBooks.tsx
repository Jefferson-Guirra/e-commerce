import SliderBooks from '../../../components/SliderBooks'
import styles from './styles.module.css'
import { BOOKS_API } from '../../../Api'
export interface IHomeBooksProps {
  title: string
  bookList: BOOKS_API
}
export const HomeBooks = ({ title, bookList }: IHomeBooksProps) => {
  return (
    <section className={styles['books-container']}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <SliderBooks bookList={bookList} />
    </section>
  )
}
