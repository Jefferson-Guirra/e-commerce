import styles from './styles.module.css'
import { IBooksApi } from '../../../services/api/@types'
import { SliderBooks } from '../../../components'

export interface IHomeBooksProps {
  title: string
  bookList: IBooksApi
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
